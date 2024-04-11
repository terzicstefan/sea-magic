const postsPerPage = 6;
let currentPage = 1;
let blogPosts = []; // Initialize blog posts data as an empty array

async function fetchBlogPostsData() {
  try {
    const response = await fetch('/data/blogData.json'); // Fetch JSON file
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts data');
    }
    blogPosts = await response.json(); // Parse JSON response
    displayBlogPosts();
    displayPagination();
  } catch (error) {
    console.error('Error fetching blog posts data:', error);
  }
}

function displayBlogPosts() {
  const container = document.getElementById("blog-posts");
  container.innerHTML = "";

  // Calculate the start and end indices of the current page's posts
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, blogPosts.length);

  // Loop through the subset of blog posts for the current page
  for (let i = startIndex; i < endIndex; i++) {
    const post = blogPosts[i];
    const postElement = document.createElement("div");
    postElement.classList.add("blog-post");
    postElement.innerHTML = `
      <a href="/news/${post.slug}"> <!-- Link to individual blog post page -->
        <img src="${post.photo}" alt="${post.name}">
        <h2>${post.name}</h2>
        <h5>${post.date}</h5>
        <p>${post.excerpt}</p>
      </a>
    `;
    container.appendChild(postElement);
  }
}

function displayPagination() {
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const maxButtons = 5; // Maximum number of buttons before "..."
  const visiblePages = Math.min(totalPages, maxButtons);

  // Add "Prev" button with arrow "<"
  if (currentPage > 1) {
    const prevButton = createPaginationButton(currentPage - 1, "<");
    paginationContainer.appendChild(prevButton);
  }

  // Display pagination buttons
  for (let i = 1; i <= totalPages; i++) {
    if (i <= visiblePages) {
      const button = createPaginationButton(i);
      paginationContainer.appendChild(button);
    } else if (i === visiblePages + 1) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      paginationContainer.appendChild(dots);
    }
  }
  // Display "Next" button with arrow ">"
  if (totalPages > 5) {
    const lastButton = createPaginationButton(totalPages);
    paginationContainer.appendChild(lastButton);
  }
  if (currentPage < totalPages) {
    const nextButton = createPaginationButton(currentPage + 1, ">");
    paginationContainer.appendChild(nextButton);
  }

  highlightCurrentPageButton();
}

function highlightCurrentPageButton() {
  const buttons = document.querySelectorAll(".pagination button");
  buttons.forEach((button, index) => {
    if (index === currentPage) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function createPaginationButton(pageNumber, text = null) {
  const button = document.createElement("button");
  button.textContent = text ? text : pageNumber;
  if (pageNumber === currentPage) {
    button.classList.add("active");
  }
  button.addEventListener("click", () => {
    currentPage = pageNumber;
    displayBlogPosts();
    displayPagination(); // Re-render pagination after changing page
    highlightCurrentPageButton();
  });
  return button;
}

fetchBlogPostsData(); // Call fetchBlogPostsData to initiate fetching data and updating the page
