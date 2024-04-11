// Example data for tours
const toursPerPage = 2;
let currentPage = 1;
let currentFilter = "all";
let toursData = []; // Initialize tours data as an empty array

async function fetchToursData() {
  try {
    const response = await fetch('/data/tours.json'); // Fetch JSON file
    if (!response.ok) {
      throw new Error('Failed to fetch tours data');
    }
    toursData = await response.json(); // Parse JSON response
    displayTours();
    displayPagination();
  } catch (error) {
    console.error('Error fetching tours data:', error);
  }
}

function filterTours(filter) {
  currentFilter = filter.toLowerCase(); // Convert filter to lowercase for case-insensitive comparison
  currentPage = 1;
  displayTours();
  displayPagination();

  // Remove "active" class from all buttons
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  // Add "active" class to the clicked button
  const activeButton = document.getElementById(
    `${filter.toLowerCase()}ToursBtn`
  );
  activeButton.classList.add("active");
}

// Displaying tour listings
function displayTours() {
  const filteredTours =
    currentFilter === "all"
      ? toursData
      : toursData.filter((tour) => tour.category.toLowerCase() === currentFilter);

  const startIndex = (currentPage - 1) * toursPerPage;
  const endIndex = startIndex + toursPerPage;
  const paginatedTours = filteredTours.slice(startIndex, endIndex);

  const container = document.getElementById("tour-listings");
  container.innerHTML = "";

  paginatedTours.forEach((tour) => {
    const tourElement = document.createElement("div");
    tourElement.classList.add("tour");
    tourElement.innerHTML = `
    <div class="price"><h3><span>from</span> ${tour.price}</h3></div> 
    <div class="tour-bg"> 
    <img src="${tour.image}" alt="${tour.name}">
      <h4>${tour.category}</h4>
      <a href="/tours/${tour.slug}"> <h2>${tour.name}</h2></a>
        <p>${tour.excerpt}</p>
        <div class="tour-duration">
        <h5>Duration:<span> ${tour.duration}</span> </h5>
        <h5>People:<span> ${tour.people}</span> </h5>
        </div>
      </div>`;

    container.appendChild(tourElement);
  });
}

function displayPagination() {
  const filteredToursCount =
    currentFilter === "all"
      ? toursData.length
      : toursData.filter((tour) => tour.category === currentFilter).length;
  const totalPages = Math.ceil(filteredToursCount / toursPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const maxButtons = 5; // Maximum number of buttons before "..."
  const visiblePages = Math.min(totalPages, maxButtons);

  // Add "Prev" button with arrow "<"
  if (currentPage > 1) {
    const prevButton = createPaginationButton(currentPage - 1, "<");
    paginationContainer.appendChild(prevButton);
  }

  // Display first 5 pages or all pages if total pages are less than or equal to 5
  for (let i = 1; i <= visiblePages; i++) {
    const button = createPaginationButton(i);
    paginationContainer.appendChild(button);
  }

  // Add "..." if there are more pages
  if (totalPages > maxButtons) {
    const dots = document.createElement("span");
    dots.textContent = "...";
    paginationContainer.appendChild(dots);
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
}

function createPaginationButton(pageNumber, text = null) {
  const button = document.createElement("button");
  button.textContent = text ? text : pageNumber;
  if (pageNumber === currentPage) {
    button.classList.add("active");
  }
  button.addEventListener("click", () => {
    currentPage = pageNumber;
    displayTours();
    displayPagination(); // Re-render pagination after changing page
    highlightCurrentPageButton();
  });
  return button;
}

fetchToursData(); // Call fetchToursData to initiate fetching data and displaying tours
