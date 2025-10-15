// script.js - filtro de busca simples

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const cards = document.querySelectorAll(".card-item");

function filtrarProdutos() {
  const termo = searchInput.value.toLowerCase().trim();
  cards.forEach((card) => {
    const nome = card.getAttribute("data-name");
    card.style.display = nome.includes(termo) || termo === "" ? "block" : "none";
  });
}
// --- Carrossel Automático do Header ---
let totalSlides = document.querySelectorAll(".carousel-item").length;
let currentSlide = 0;

document.querySelector(".slider--width").style.width = `calc(100vw * ${totalSlides})`;
document.querySelector(".slider--controls").style.height = `${document.querySelector(".slider").clientHeight}px`;

function goPrev() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }
  updateMargin();
}

function goNext() {
  currentSlide++;
  if (currentSlide > totalSlides - 1) {
    currentSlide = 0;
  }
  updateMargin();
}

function updateMargin() {
  let sliderWidth = document.querySelector(".slider").clientWidth;
  let newMargin = currentSlide * sliderWidth;
  document.querySelector(".slider--width").style.marginLeft = `-${newMargin}px`;
}

// Troca automática a cada 3 segundos
setInterval(goNext, 3000);
