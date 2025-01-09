const xhr = new XMLHttpRequest()

// Configure the request
xhr.open('GET', 'http://localhost:4000/messages')

// Set up event listeners to handle the response
xhr.onload = function () {
  // Check if the request was successful
  if (xhr.status === 200) {
    try {
      // Parse the JSON response
      const jsonResponse = JSON.parse(xhr.responseText)

      // Store the entire JSON response in the 'data' variable
      const data = jsonResponse

      // Select the table body where messages will be populated
      const tbody = document.querySelector('table#messages tbody')

      // Clear any existing content in the table body
      tbody.innerHTML = ''

      // Check if 'data' is an array
      if (Array.isArray(data)) {
        // Iterate over the messages and populate the table rows dynamically
        data.forEach((retrieved) => {
          // Create a table row
          const row = document.createElement('tr')

          // Add classes to the table row
          row.classList.add('table-row')

          // Populate the row with data from the message object
          row.innerHTML = `
            <td class="px-6 py-4 border-r-2 border-b-2 border-gray-200 text-justify">
              <div class="text-sm text-gray-900">${retrieved.name}</div>
              <span class="text-sm font-bold">${retrieved.email}</span>
            </td>
            <td class="px-6 py-4 border-r-2 border-b-2 border-gray-200">
              <div class="text-sm text-black">${new Date(retrieved.createdAt).toLocaleString()}</div>
              <span>
                <span class="px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-full">New</span>
              </span>
            </td>
            <td class="px-6 py-4 border-r-2 border-b-2 border-gray-200 message-cell">
              <div class="text-sm text-gray-900">${retrieved.message}</div>
            </td>
            <td class="px-6 py-4 border-r-2 border-b-2 border-gray-200">
              <button class="delete-button bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded opacity-1 transition duration-200 ease-in-out" data-message-id="${retrieved._id}">
                Delete
              </button>
            </td>
          `

          // Append the row to the table body
          tbody.appendChild(row)
        })
      } else {
        console.error('Data is not an array:', data)
      }
    } catch (error) {
      console.error('Error parsing JSON:', error)
    }
  } else {
    // Handle errors
    console.error('Request failed. Status:', xhr.status)
  }
}

// Handle network errors
xhr.onerror = function () {
  console.error('Network error occurred')
}

// Send the request
xhr.send()
