const xhr = new XMLHttpRequest()

// Configure the request
xhr.open('GET', 'http://localhost:4000/blogs')

// Set up event listeners to handle the response
xhr.onload = function () {
  // Check if the request was successful
  if (xhr.status === 200) {
    // Parse the JSON response
    const jsonResponse = JSON.parse(xhr.responseText)
    const data = jsonResponse.data

    // Select the table body where blog posts will be populated
    const tbody = document.querySelector('table#blogs tbody')

    // Clear any existing content in the table body
    tbody.innerHTML = ''

    // Iterate over the blog posts and populate the table rows dynamically
    data.forEach((blog) => {
      // Create a table row
      const row = document.createElement('tr')

      // Populate the row with data from the blog object
      row.innerHTML = `
        <td class="px-1 bg-white text-sm">
          <div class="flex items-center">
            <div class="w-16 h-16">
              <img class="w-full h-full rounded-sm" src="/images/${blog.image}" alt="${blog.title} image">
            </div>
            <div class="ml-2">
              <p class="text-gray-900 whitespace-no-wrap">${blog.title}</p>
            </div>
          </div>
        </td>
        <td class="px-5 py-5 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">${blog.category}</p>
        </td>
        <td class="px-5 py-5 bg-white text-sm">
          <p class="text-gray-900 italic whitespace-no-wrap">${new Date(blog.createdAt).toLocaleDateString()}</p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
            <span class="relative">${blog.publishOption === 'now' ? 'Published' : 'Scheduled'}</span>
          </span>
        </td>
        <td class="bg-white">
          <div class="px-5 flex bg-white justify-center py-5 border-gray-200 text-sm">
            <a href="/blogs/edit/${blog._id}" class="text-large bg-blue-500 rounded p-2 px-5 text-white hover:underline">Edit</a>
            <a href="/blogs/delete/${blog._id}" class="text-large bg-red-500 ml-4 text-white-600 rounded p-2 px-5 hover:underline">Delete</a>
          </div>
        </td>
      `

      // Append the row to the table body
      tbody.appendChild(row)
    })
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
