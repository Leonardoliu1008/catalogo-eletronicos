
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const cards = document.querySelectorAll(".card-item");

// Função de filtro aprimorada
function filtrarProdutos() {
  const termo = searchInput.value.toLowerCase().trim();
  let encontrou = false;

  cards.forEach((card) => {
    const nome = card.getAttribute("data-name");
    const titulo = card.querySelector("h3");
    const descricao = card.querySelector("p");

    // Verifica se o termo aparece no nome ou descrição
    const corresponde =
      nome.includes(termo) ||
      titulo.textContent.toLowerCase().includes(termo) ||
      descricao.textContent.toLowerCase().includes(termo);

    // Mostra ou esconde o card
    if (corresponde || termo === "") {
      card.style.display = "block";
      encontrou = true;
      // Destaca o termo encontrado no título
      if (termo !== "") {
        const regex = new RegExp(`(${termo})`, "gi");
        titulo.innerHTML = titulo.textContent.replace(
          regex,
          `<span class="highlight">$1</span>`
        );
      } else {
        titulo.innerHTML = titulo.textContent; // remove destaque
      }
    } else {
      card.style.display = "none";
    }
  });

  // Caso não encontre nada
  const noResults = document.getElementById("no-results");
  if (!encontrou && termo !== "") {
    if (!noResults) {
      const msg = document.createElement("p");
      msg.id = "no-results";
      msg.textContent = "Nenhum produto encontrado ";
      msg.style.color = "#ff1515ff";
      msg.style.textAlign = "center";
      msg.style.marginTop = "20px";
      document.querySelector(".card-wrapper").appendChild(msg);
    }
  } else if (noResults) {
    noResults.remove();
  }
}

searchButton.addEventListener("click", filtrarProdutos);
searchInput.addEventListener("keyup", filtrarProdutos);

// ====== CARRINHO DE COMPRAS ======
const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const clearCart = document.getElementById("clearCart");
const closeCart = document.getElementById("closeCart");

let carrinho = [];

// Abrir e fechar modal
cartButton.addEventListener("click", () => {
  cartModal.style.display = "flex";
});
closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Esvaziar carrinho
clearCart.addEventListener("click", () => {
  carrinho = [];
  atualizarCarrinho();
});

// Adicionar produtos ao clicar em "Comprar"
document.querySelectorAll(".card-content button").forEach((botao) => {
  botao.addEventListener("click", (e) => {
    const card = e.target.closest(".card-item");
    const nome = card.querySelector("h3").textContent;
    const preco =  parseFloat(
      card.querySelector("p").textContent.replace(/[^\d,]/g, "").replace(",", ".")
    ) || 1999.00; // preço padrão se não tiver valor no texto

    carrinho.push({ nome, preco });
    atualizarCarrinho();
  });
});

// Atualizar exibição do carrinho
function atualizarCarrinho() {
  cartItems.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} — R$ ${item.preco.toFixed(2).replace(".", ",")}`;
    const remover = document.createElement("button");
    remover.textContent = "❌";
    remover.style.marginLeft = "10px";
    remover.style.background = "transparent";
    remover.style.border = "none";
    remover.style.color = "#ff6666";
    remover.style.cursor = "pointer";
    remover.addEventListener("click", () => {
      carrinho.splice(index, 1);
      atualizarCarrinho();
    });
    li.appendChild(remover);
    cartItems.appendChild(li);
    total += item.preco;
  });

  cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
  cartCount.textContent = carrinho.length;
}
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
