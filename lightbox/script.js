function openModal() {
  document.getElementById("myModal").style.display = "block";
  document.addEventListener("click", checkClickOutside);
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  document.removeEventListener("click", checkClickOutside);
}

function checkClickOutside(event) {
  if (event.target == document.getElementById("myModal")) {
    closeModal();
  }
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlideG(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}
