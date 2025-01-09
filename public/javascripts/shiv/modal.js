document.addEventListener('DOMContentLoaded', function () {
  const modalToggleButtons = document.querySelectorAll('[data-modal-toggle]')
  const closeButtons = document.querySelectorAll('[data-modal-close]')

  // Function to toggle the modal
  const toggleModal = (modalId) => {
    const targetModal = document.getElementById(modalId)
    targetModal.classList.toggle('hidden')
  }

  // Add click event listeners to toggle buttons
  modalToggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal-toggle')
      toggleModal(modalId)
    })
  })

  // Add click event listeners to close buttons
  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal-close')
      toggleModal(modalId)
    })
  })

  // Add click event listener to modals to close when clicked outside
  const modals = document.querySelectorAll('.modal')
  modals.forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal || event.target.dataset.modalClose) {
        modal.classList.add('hidden')
      }
    })
  })
})
// Get references to the search form, search input, and content elements
const searchForm = document.getElementById('searchForm')
const searchInput = document.getElementById('searchInput')
const content = document.getElementById('content')

// Attach event listener to the search form
searchForm.addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault()
  // Call the searchKeyword function when the form is submitted
  searchKeyword()
})

// Function to perform search and highlight results
function searchKeyword() {
  // Get the search text and convert it to lowercase
  const searchText = searchInput.value.toLowerCase()
  // Get the innerHTML of the content element
  let contentHTML = content.innerHTML

  // Replace occurrences of the search text with highlighted spans
  contentHTML = contentHTML.replace(
    new RegExp(searchText, 'gi'),
    function (match) {
      return '<span class="highlight">' + match + '</span>'
    },
  )

  // Update the content with the highlighted HTML
  content.innerHTML = contentHTML
}
