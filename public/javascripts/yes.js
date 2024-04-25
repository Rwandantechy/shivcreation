document.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('.mt-16')

  const scrollPosition = window.scrollY

  const triggerPosition = 600 // Adjust this value as needed

  sections.forEach((section, index) => {
    const sectionTrigger = triggerPosition * (index + 1) // Adjust trigger position for each section

    if (scrollPosition > sectionTrigger) {
      // Remove any existing animation classes
      section.classList.remove(
        'animate__fadeIn',
        'animate__flip',
        'animate__rotateIn',
      )

      // Apply animations based on section index
      switch (index) {
        case 0:
          section.classList.add('animate__animated', 'animate__fadeIn')
          break
        case 1:
          section.classList.add('animate__animated', 'animate__flip')
          break
        case 2:
          section.classList.add('animate__animated', 'animate__rotateIn')
          break
        default:
          break
      }
    } else {
      // Remove animation classes if scroll position is less than trigger position
      section.classList.remove(
        'animate__animated',
        'animate__fadeIn',
        'animate__flip',
        'animate__rotateIn',
      )
    }
  })
})
