
/*Slider functionality*/

const slides = document.querySelectorAll('.slide');
const sliderDotsContainer = document.querySelector('.slider-dots');
let currentSlide = 0;


function createDots() {
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === currentSlide) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        sliderDotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}
function goToSlide(index) {
  slides.forEach((slide, i) => {
      if (i === index) {
          slide.style.transform = "translateX(0)";
      } else {
          slide.style.transform = "translateX(-100%)";
      }
  });
  currentSlide = index;
  updateDots();
}


function nextSlide() {
    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.style.transform = "translateX(-100%)";
        }
    });
    currentSlide = (currentSlide + 1) % slides.length;
    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.style.transform = "translateX(0)";
        }
    });
    updateDots();
}



/*-------------------------------------------------------------------*/



document.addEventListener("DOMContentLoaded", function() {
    // Get all dropdown items
    var dropdowns = document.querySelectorAll('.mobile-menu .dropdown');
  
    // Loop through each dropdown item
    dropdowns.forEach(function(dropdown) {
      // Add click event listener to each dropdown item
      dropdown.addEventListener('click', function(event) {
        // Toggle the display of the submenu
        var submenu = dropdown.querySelector('.sub-menu');
        submenu.style.display = (submenu.style.display === 'block') ? 'none' : 'block';
      });
    });
  });

/*Hide and unhide hamburger menu and close icon, show and hide menu*/
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const closeIcon = document.querySelector('.close-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');

    hamburgerMenu.addEventListener('click', function () {
        mobileMenu.classList.toggle('show-menu');
        hamburgerMenu.classList.toggle('hidden');
        overlay.classList.toggle('overlay-show');
        closeIcon.classList.remove('hidden');
    });

    closeIcon.addEventListener('click', function () {
        mobileMenu.classList.remove('show-menu'); 
        hamburgerMenu.classList.remove('hidden');
        overlay.classList.remove('overlay-show');
        closeIcon.classList.toggle('hidden');
        
    });

    // Hide the mobile menu when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!hamburgerMenu.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.remove('show-menu');
            hamburgerMenu.classList.remove('hidden');
            overlay.classList.remove('overlay-show');
            closeIcon.classList.add('hidden');
        }
    });
});


 

document.addEventListener("DOMContentLoaded", function() {
    var subMenus = document.querySelectorAll(".dropdown");
  
    subMenus.forEach(function(menu) {
      var subMenu = menu.querySelector(".sub-menu");
      if (subMenu) {
        menu.addEventListener("click", function(event) {
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
    document.addEventListener("click", function(event) {
      subMenus.forEach(function(menu) {
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

  
  


  

  
  
  //Round header border on hover of language icon
   // Get the header element
   const header = document.querySelector('.header');

   // Get the language dropdown element
   const languageDropdown = document.querySelector('.language-dropdown');
 
   // Add event listener for mouseenter event on language dropdown
   languageDropdown.addEventListener('mouseenter', function() {
     // Add the 'rounded' class to header when hovering over language dropdown
     header.classList.add('rounded');
   });
 
   // Add event listener for mouseleave event on language dropdown
   languageDropdown.addEventListener('mouseleave', function() {
     // Remove the 'rounded' class from header when mouse leaves language dropdown
     header.classList.remove('rounded');
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



createDots();
goToSlide(0); // Ensure that the first slide is displayed initially
setInterval(nextSlide, 5000); // Change slide every 5 seconds
