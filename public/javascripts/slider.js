var cont = 0
var xx

function loopSlider() {
  xx = setInterval(function () {
    const totalSlides = $('.slider').length
    const nextSlideIndex = (cont + 1) % totalSlides

    $(`.slider:eq(${cont})`).fadeOut(400)
    $(`.slider:eq(${nextSlideIndex})`).delay(400).fadeIn(400)

    cont = nextSlideIndex
  }, 8000)
}

function reinitLoop(time) {
  clearInterval(xx)
  setTimeout(loopSlider, time)
}

$(window).ready(function () {
  $('.slider:gt(0)').hide()

  loopSlider()
})
