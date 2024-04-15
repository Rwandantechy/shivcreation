var swiper = new Swiper('.mySwiper', {
  spaceBetween: 30,
  centeredSlides: true,
  slidesPerView: 3,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  effect: 'cube',
  grabCursor: true,
  cubeEffect: {
    shadow: false,
    slideShadows: false,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      const currentSlide = s.slides[s.activeIndex]
      const progressBar = currentSlide.querySelector('.progressBar')
      if (progressBar) {
        const widthPercentage = parseFloat(progress) * 100
        progressBar.style.width = widthPercentage + '%'
      }
    },
  },
})
