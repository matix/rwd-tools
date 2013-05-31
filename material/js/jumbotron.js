(function(jumbotron){
  var slice = [].slice;
  $ = function (selector, root) {
    return slice.call((root||document).querySelectorAll(selector));
  }

  var currentSlide = 0,
      slideCount = $(".slide-container .slide", jumbotron).length,
      next = $(".arrow.next", jumbotron)[0],
      prev = $(".arrow.prev", jumbotron)[0],
      timeoutID;

  function goto (slide) {
    jumbotron.classList.remove("slide-" + currentSlide);
    jumbotron.classList.add("slide-" + slide);
    currentSlide = slide;
  }

  function nextSlide () {
    var slide = currentSlide+1;
    if(slide >= slideCount) {
      slide = 0;
    }

    goto(slide);
  }

  function prevSlide () {
    var slide = currentSlide-1;
    if(slide < 0) {
      slide = slideCount-1;
    }

    goto(slide);
  }

  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);
  
  function autoSlide () {
    if(timeoutID) {
      nextSlide();
      timeoutID = false;
      autoSlide();
    }
    else {
      timeoutID = setTimeout(autoSlide,3000);
    }
  }

  autoSlide();

})(document.querySelector(".jumbotron"));