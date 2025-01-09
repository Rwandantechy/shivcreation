// Testimonials carousel
$('.owl-carousel').owlCarousel({
  autoplay: true,
  dots: true,
  loop: true,
  video: true,
  center: true,
  smartSpeed: 1500,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 1,
    },
    768: {
      items: 2,
    },
    992: {
      items: 3,
    },
  },
})
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle')
  const mobileMenu = document.getElementById('mobile-menu')
  const hamburgerIcon = document.querySelector('.hamburger-icon')
  const crossIcon = document.querySelector('.cross-icon')

  mobileMenuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden')
    hamburgerIcon.classList.toggle('hidden')
    // put the cross icoon in the corner of the screen at top
    crossIcon.classList.toggle('hidden')
  })
})
