document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('default-carousel')
  const slides = carousel.querySelectorAll('[data-carousel-item]')
  const prevButton = carousel.querySelector('[data-carousel-prev]')
  const nextButton = carousel.querySelector('[data-carousel-next]')
  const indicators = carousel.querySelectorAll('[data-carousel-slide-to]')

  let currentSlide = 0
  let intervalId // Variable to hold the interval ID for auto-sliding

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none'
    })
    updateIndicators(index)
    currentSlide = index
  }

  function updateIndicators(index) {
    indicators.forEach((indicator, i) => {
      const isActive = i === index
      indicator.setAttribute('aria-current', isActive ? 'true' : 'false')
      indicator.classList.toggle('active', isActive)
      if (isActive) {
        indicator.classList.remove('bg-gray-400')
        indicator.classList.add(
          'bg-blue-500',
          'border-2',
          'border-orange-500',
          'w-5',
          'h-5',
          'rounded-full',
        )
      } else {
        indicator.classList.remove(
          'bg-blue-500',
          'border-2',
          'border-orange-500',
          'w-5',
          'h-5',
          'rounded-full',
        )
        indicator.classList.add('bg-gray-400', 'w-4', 'h-4', 'rounded-full')
      }
    })
  }

  function goToSlide(index) {
    if (index < 0) {
      currentSlide = slides.length - 1
    } else if (index >= slides.length) {
      currentSlide = 0
    } else {
      currentSlide = index
    }
    showSlide(currentSlide)
    resetTimer() // Reset the timer after each manual slide change
  }

  function startAutoSlide() {
    intervalId = setInterval(() => {
      goToSlide(currentSlide + 1)
    }, 5000) // Adjust the interval duration as needed (currently set to 5 seconds)
  }

  function stopAutoSlide() {
    clearInterval(intervalId)
  }

  function resetTimer() {
    stopAutoSlide()
    startAutoSlide()
  }

  prevButton.addEventListener('click', () => {
    goToSlide(currentSlide - 1)
  })

  nextButton.addEventListener('click', () => {
    goToSlide(currentSlide + 1)
  })

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index)
    })
  })

  // Start auto-slide when the page loads
  startAutoSlide()

  // Show the initial slide
  showSlide(currentSlide)
})
