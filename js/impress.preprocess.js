(function (impress) {
    var $ = function (selector, root) {
        return Array.prototype.slice.call((root || document).querySelectorAll(selector));
    }

    var attrs = ["x", "y", "z", "rotateX", "rotateY", "rotateZ", "scale"];

    var resolveExpression = function(exp, prev_val) {
        return (new Function("prev", "return " + exp))(prev_val);
    }

    function preprocess (root) {
        $(".step", root).forEach(function (step, i, steps) {
            var prev = (i-1>0)? steps[i-1] : null;
            attrs.forEach(function (attr) {
               var exp = step.dataset[attr];
               if(exp && isNaN(+exp)){
                 var prev_val = prev? (prev.dataset[attr] || 0) : 0;
                 try {
                    step.dataset[attr] = resolveExpression(exp, +prev_val);
                 }
                 catch(e) {
                    step.dataset[attr] = "";
                 }
               }
            });
        });   
    }

    impress.preprocess = function (root) {
        root = root || document.getElementById("impress");
        return preprocess(root);
    }

})(impress);