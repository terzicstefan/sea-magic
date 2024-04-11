// Fetch the tours data from tours.json
async function fetchToursData() {
  try {
    const response = await fetch("/data/tours.json"); // Fetch JSON file
    if (!response.ok) {
      throw new Error("Failed to fetch tours data");
    }
    const toursData = await response.json(); // Parse JSON response
    updateTourHeader(toursData); // Update header with fetched data
  } catch (error) {
    console.error("Error fetching tours data:", error);
  }
}

// Update "PRIVATE TOURS" and "h2 title" dynamically
function updateTourHeader(toursData) {
  const privateToursHeader = document.querySelector(
    ".hero-section__content h5"
  );
  const tourTitle = document.querySelector(".hero-section__content h2");
  const description = document.querySelector(".description");
  const itinerary = document.querySelector(".itinerary");
  const price = document.querySelector(".reservation-form__price");
  const includedContainer = document.querySelector(".included");
  const duration = document.querySelector(".duration");
  const people = document.querySelector(".people");
  const sliderWrapper = document.querySelector(".tour-slider-wrapper"); // Get slider wrapper

  if (toursData.length > 1) {
    const secondTour = toursData[1];
    privateToursHeader.textContent =
      secondTour.category.toUpperCase() + " TOURS";
    tourTitle.textContent = secondTour.name;
    document.title = secondTour.name;
    description.innerHTML = secondTour.description;
    itinerary.innerHTML = secondTour.itinerary;
    price.textContent = secondTour.price;
    duration.textContent = secondTour.duration;
    people.textContent = secondTour.people;

    // Clear previous content of included container
    includedContainer.innerHTML = "";

    // Create a list to hold the included items
    const includedList = document.createElement("ul");

    // Iterate over included items and create list items for those with a value of true
    for (const item in secondTour.included[0]) {
      if (secondTour.included[0][item]) {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        includedList.appendChild(listItem);
      }
    }

    // Append the list to the included container
    includedContainer.appendChild(includedList);

    // Get the button element
    const backButton = document.getElementById("backButton");

    // Add click event listener to the button
    backButton.addEventListener("click", function () {
      // Go back to the previous page in the browser's history
      window.history.back();
    });

    // Display slider images
    if (secondTour.slider) {
      displaySlider(secondTour.slider, sliderWrapper);
      // Initialize slider navigation
      initSliderNavigation(secondTour.slider.length, sliderWrapper);
    }
  }
}

// Function to display slider images
function displaySlider(images, sliderWrapper) {
  sliderWrapper.innerHTML = ""; // Clear previous slider content
  images.forEach((imageData, index) => {
    const slide = document.createElement("div");
    slide.classList.add("slider-image"); // Fixed class name to match CSS
    slide.innerHTML = `<img src="${imageData.image}" alt="Tour Image">`;
    sliderWrapper.appendChild(slide);
    slide.dataset.index = index; // Store slide index as data attribute
  });
}

// Function to initialize slider navigation
function initSliderNavigation(totalSlides, sliderWrapper) {
  const prevBtn = document.querySelector(".tour-prev-btn");
  const nextBtn = document.querySelector(".tour-next-btn");
  let currentSlide = 0;

  // Function to show current slide
  function showSlide(slideIndex) {
    const slides = document.querySelectorAll(".slider-image");
    if (slides.length === 0) return; // Exit function if there are no slides

    if (slideIndex < 0) {
      currentSlide = slides.length - 1;
    } else if (slideIndex >= slides.length) {
      currentSlide = 0;
    }
    const offset = -currentSlide * 100;
    sliderWrapper.style.transform = `translateX(${offset}%)`;
  }

  // Event listener for previous button
  prevBtn.addEventListener("click", () => {
    currentSlide--;
    showSlide(currentSlide);
  });

  // Event listener for next button
  nextBtn.addEventListener("click", () => {
    currentSlide++;
    showSlide(currentSlide);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");

  dateInput.addEventListener("click", function () {
    this.removeAttribute("readonly");
  });

  timeInput.addEventListener("click", function () {
    this.removeAttribute("readonly");
  });

  // Add event listeners for incrementing and decrementing once DOM content is loaded
  const minusButtons = document.querySelectorAll(".control-button.minus");
  const plusButtons = document.querySelectorAll(".control-button.plus");

  minusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.parentElement.querySelector('input[type="number"]');
      const minValue = parseInt(input.getAttribute("min"));
      if (parseInt(input.value) > minValue) {
        input.value = parseInt(input.value) - 1;
      }
    });
  });

  plusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.parentElement.querySelector('input[type="number"]');
      input.value = parseInt(input.value) + 1;
    });
  });
});

fetchToursData(); // Call fetchToursData to initiate fetching data and updating the header
