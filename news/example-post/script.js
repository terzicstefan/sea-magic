fetch('../blogData.json')
  .then(response => response.json())
  .then(blogData => {
    displayBlogPosts(blogData);
  })
  .catch(error => {
    console.error('Error fetching blog data:', error);
  });

function displayBlogPosts(blogData) {
  const container = document.getElementById("blog-posts");
  container.innerHTML = "";

  // Extract the slug from the URL
  const urlParts = window.location.href.split('/');
  const slug = urlParts[urlParts.length - 2]; // Assuming the slug is the second-to-last part of the URL

  // Find the post with the matching slug
  const selectedPost = blogData.find(post => post.slug === slug);

  if (selectedPost) {
    // Filter blogData to find posts with matching tags
    const matchingPosts = blogData.filter(post => {
      return post.tags && selectedPost.tags && post.slug !== selectedPost.slug && selectedPost.tags.some(tag => post.tags.includes(tag));
    });

    // Display only the first two matching posts
    matchingPosts.slice(0, 2).forEach((post) => {
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
    });
  }
}