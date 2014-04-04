document.querySelector && (function (container) {
  var icons = Array.prototype.slice.call(container.querySelectorAll(".icons i[class*=icon-]")),
      colors = Array.prototype.slice.call(container.querySelectorAll(".colors .color")),
      sample = container.querySelector(".sample"),
      code;

  getCMEditor(container.querySelector(".code"), function(editor){
    code = editor;
  });

  var currentIcon = "",
      currentColor = "";

  function updateSample() {
    [1,2,4].forEach(function (size) {
      var i = sample.querySelector(".icon-"+size+"x");
      i.className = currentIcon + " " +"icon-"+size+"x";
      i.style.color = currentColor;
    });

    if(currentColor == "white") {
      sample.style.backgroundColor = "black";
    }
    else {
      sample.style.backgroundColor = "white";
    }
  }

  icons.forEach(function(icon) {
    icon.addEventListener("mouseover", function(){
      code && code.setValue(icon.outerHTML);
      currentIcon = icon.className;
      updateSample();
    });
  });

  colors.forEach(function(color) {
    color.addEventListener("mouseover", function(e) {
      currentColor = color.dataset.color;
      updateSample();
    });
  });

})(document.querySelector("#ri-icon-fonts"));
