/*Slider functionality*/

const slides = document.querySelectorAll(".slide");
const sliderDotsContainer = document.querySelector(".slider-dots");
let currentSlide = 0;

function createDots() {
  slides.forEach((slide, index) => {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (index === currentSlide) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    sliderDotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = document.querySelectorAll(".slider-dot");
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}
function goToSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active"); // Add active class to target slide
    } else {
      slide.classList.remove("active"); // Remove active class from other slides
    }
  });
  currentSlide = index;
  updateDots();
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;

  // Fade out current slide
  slides[currentSlide].classList.remove("active");
  // Fade in next slide
  slides[nextIndex].classList.add("active");

  currentSlide = nextIndex;

  updateDots();
}

/*-------------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
  // Get all dropdown items
  var dropdowns = document.querySelectorAll(".mobile-menu .dropdown");

  // Loop through each dropdown item
  dropdowns.forEach(function (dropdown) {
    // Add click event listener to each dropdown item
    dropdown.addEventListener("click", function (event) {
      // Toggle the display of the submenu
      var submenu = dropdown.querySelector(".sub-menu");
      submenu.style.display =
        submenu.style.display === "block" ? "none" : "block";
    });
  });
});

/*Hide and unhide hamburger menu and close icon, show and hide menu*/
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const closeIcon = document.querySelector(".close-icon");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");

  hamburgerMenu.addEventListener("click", function () {
    mobileMenu.classList.toggle("show-menu");
    hamburgerMenu.classList.toggle("hidden");
    overlay.classList.toggle("overlay-show");
    closeIcon.classList.remove("hidden");
  });

  closeIcon.addEventListener("click", function () {
    mobileMenu.classList.remove("show-menu");
    hamburgerMenu.classList.remove("hidden");
    overlay.classList.remove("overlay-show");
    closeIcon.classList.toggle("hidden");
  });

  // Hide the mobile menu when clicking outside of it
  document.addEventListener("click", function (event) {
    if (
      !hamburgerMenu.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      mobileMenu.classList.remove("show-menu");
      hamburgerMenu.classList.remove("hidden");
      overlay.classList.remove("overlay-show");
      closeIcon.classList.add("hidden");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var subMenus = document.querySelectorAll(".dropdown");

  subMenus.forEach(function (menu) {
    var subMenu = menu.querySelector(".sub-menu");
    if (subMenu) {
      menu.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent closing when clicking on sub-menu items
        subMenu.classList.toggle("show");
        menu.classList.toggle("open"); // Toggle the 'open' class on click
        var mobileMenu = document.querySelector(".mobile-menu");
        if (mobileMenu) {
          mobileMenu.classList.toggle("show-submenu");
        }
      });
    }
  });

  // Close submenus when clicking outside
  document.addEventListener("click", function (event) {
    subMenus.forEach(function (menu) {
      var subMenu = menu.querySelector(".sub-menu");
      if (subMenu && !menu.contains(event.target)) {
        subMenu.classList.remove("show");
        menu.classList.remove("open"); // Remove the 'open' class
        var mobileMenu = document.querySelector(".mobile-menu");
        if (mobileMenu) {
          mobileMenu.classList.remove("show-submenu");
        }
      }
    });
  });
});

//Active nav menu color

function setActiveMenuItemOnLoad() {
  var currentPageUrl = window.location.href;

  // Loop through menu links and compare with current page URL
  var menuLinks = document.querySelectorAll(".desktop-menu a");
  menuLinks.forEach(function (link) {
    if (link.href === currentPageUrl) {
      link.classList.add("active-menu__color"); // Add active class to matching link
    }
  });
}

// Call the function when the page loads
window.addEventListener("DOMContentLoaded", setActiveMenuItemOnLoad);

//Round header border on hover of language icon
// Get the header element
const header = document.querySelector(".header");

// Get the language dropdown element
const languageDropdown = document.querySelector(".language-dropdown");

// Add event listener for mouseenter event on language dropdown
languageDropdown.addEventListener("mouseenter", function () {
  // Add the 'rounded' class to header when hovering over language dropdown
  header.classList.add("rounded");
});

// Add event listener for mouseleave event on language dropdown
languageDropdown.addEventListener("mouseleave", function () {
  // Remove the 'rounded' class from header when mouse leaves language dropdown
  header.classList.remove("rounded");
});

//Dynamic language switch
/* document.addEventListener("DOMContentLoaded", function() {
    const languageMenu = document.querySelector('.language-menu');
    const languageItems = languageMenu.querySelectorAll('li');
  
    languageItems.forEach(function(item) {
      item.addEventListener('click', function() {
        const langCode = this.getAttribute('data-lang');
        // Change the page URL to index.html/{langCode}
        window.location.href = `index.html/${langCode}`;
  
        // Remove 'active' class from all language items
        languageItems.forEach(function(item) {
          item.classList.remove('active');
        });
  
        // Add 'active' class to the clicked language item
        this.classList.add('active');
      });
    });
  }); */

//language switching

function modifyLinksIfNotEnglish(lang) {
  if (lang === "it" || lang === "ru") {
    var links = document.querySelectorAll('a[href^="/"]');
    links.forEach(function (link) {
      var href = link.getAttribute("href");
      // Add language prefix for non-English languages
      link.setAttribute("href", "/" + lang + href);
    });
  }
}

// Function to switch language
function switchLanguage(lang) {
  console.log("Switching language to: " + lang);
  var currentPageUrl = window.location.pathname;
  if (lang === "en") {
    var newUrl = currentPageUrl.replace(/^\/[a-z]{2}\//, "/");
    window.location.href = newUrl;
  } else {
    var newUrl = "/" + lang + currentPageUrl.replace(/^\/[a-z]{2}\//, "/");
    window.location.href = newUrl;
  }
}
window.addEventListener("DOMContentLoaded", function () {
  setActiveLanguage();
  // Intercept all link clicks and modify their href attribute if the language is 'it' or 'ru'
  document.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function (event) {
      var lang = getLanguageFromURL();
      modifyLinksIfNotEnglish(lang);
    });
  });
});
// Function to highlight the selected language
function highlightLanguage(lang) {
  var activeLanguageLi = document.querySelector("." + lang + "-li");
  var activeLanguageA = document.querySelector("." + lang + "-a");
  if (activeLanguageLi && activeLanguageA) {
    // Remove active class from all language li elements
    document.querySelectorAll(".language-menu li").forEach(function (langLi) {
      langLi.classList.remove("active-language__li");
    });
    // Remove active class from all language a elements
    document.querySelectorAll(".language-menu li a").forEach(function (langA) {
      langA.classList.remove("active-language__a");
    });
    // Add active class to the current language li
    activeLanguageLi.classList.add("active-language__li");
    // Add active class to the current language a
    activeLanguageA.classList.add("active-language__a");
    // Add checkmark to the current language
    var checkmark = activeLanguageA.querySelector(".check-mark");
    checkmark.innerHTML = "&#10004;";
    // Change the language icon based on the selected language
    var languageIcon = document.getElementById("language-icon");
    switch (lang) {
      case "it":
        languageIcon.src = "/images/ita-icon.png";
        break;
      case "ru":
        languageIcon.src = "/images/rus-icon.png";
        break;
      default:
        languageIcon.src = "/images/eng-icon.png";
    }
  }
}

// Function to get the language from the URL
function getLanguageFromURL() {
  var url = new URL(window.location.href);
  var lang = url.pathname.split("/")[1];
  return lang ? lang : "en"; // Default language is English if no language code is present
}

// Function to set the active language
function setActiveLanguage() {
  var lang = getLanguageFromURL();
  var activeLanguageLi = document.querySelector("." + lang + "-li");
  var activeLanguageA = document.querySelector("." + lang + "-a");
  if (!activeLanguageLi || !activeLanguageA) {
    // If the active language is not found, default to English
    lang = "en";
    activeLanguageLi = document.querySelector(".en-li");
    activeLanguageA = document.querySelector(".en-a");
  }
  // Highlight the active language
  highlightLanguage(lang);
}

// Call setActiveLanguage function when the page loads to set the active language
window.addEventListener("DOMContentLoaded", setActiveLanguage);

createDots();
goToSlide(0); // Ensure that the first slide is displayed initially
setInterval(nextSlide, 5000); // Change slide every 5 seconds
