document.addEventListener('DOMContentLoaded', function () {
  const sliderContainer = document.getElementById('sliderContainer')
  let currentSlideIndex = 0 

  // Sample data for images and punch lines
  const slides = [
    {
      imageUrl: '/images/New_Tree_Leaves.jpg',

      punchLine: 'Leaves of Gratitude, Branches of Happiness',
    },
    {
      imageUrl: '/images/New_Tree_No_Leaves.jpg',
      punchLine: 'Rooted in Gratitude, Branching Out to Joy',
    },
    {
      imageUrl: '/images/New_Leaves_heavy.png',
      punchLine: 'The Leaves of Gratitude',
    },
    {
      imageUrl: '/images/Treekit_Sheet.jpg',
      punchLine: '',
    },
  ]

  // Function to show current slide
  function showSlide(index) {
    const sliders = document.querySelectorAll('.slider')
    sliders.forEach((slider, idx) => {
      if (idx === index) {
        slider.style.display = 'block' 
      } else {
        slider.style.display = 'none' 
      }
    })
  }

  slides.forEach((slide, index) => {
    const slider = document.createElement('div')
    slider.className = 'slider'
    slider.id = `slider-${index + 1}`

    const backgroundImage = document.createElement('div')
    backgroundImage.className = 'slider-bg'
    backgroundImage.style.backgroundImage = `url('${slide.imageUrl}')`

    const content = document.createElement('div')
    content.className = 'slider-content'

    const punchLineText = document.createElement('span')
    punchLineText.textContent = slide.punchLine
    punchLineText.className =
      'text-font-bold animate__animated animate__backInLeft'

    content.appendChild(punchLineText)

    slider.appendChild(backgroundImage)
    slider.appendChild(content)

    sliderContainer.appendChild(slider)
  })

  // Show the initial slide
  showSlide(currentSlideIndex)
})
