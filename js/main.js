const productos = [
  { id: 1, title: "Booster Bundle 151 [INGLES]",imagen: "img/BB151.jpg", idioma: "Ingles", precio: "$ 50.00", empresa: "The Pokemon Company" },
  { id: 2, title: "Booster Box Paradox Rift [INGLES]",imagen: "img/BBPR.jpg", idioma: "Ingles", precio: "$ 160.00", empresa: "The Pokemon Company" },
  { id: 3, title: "Ultra-Premium Collection 151 [INGLES]",imagen: "img/UP151.jpg", idioma: "Ingles", precio: "$ 120.00", empresa: "The Pokemon Company" },
  { id: 4, title: "Booster Box Temporal Forces [INGLES]",imagen: "img/bbtp.png", idioma: "Ingles", precio: "$ 160.00", empresa: "The Pokemon Company" },
  { id: 5, title: "Booster Box OP01 [INGLES]",imagen: "img/BBOP01.jpg", idioma: "Ingles", precio: "$ 300.00", empresa: "Bandai Namco Entertainment" },
  { id: 6, title: "Booster Box OP02 [INGLES]",imagen: "img/BBOP02.jpg", idioma: "Ingles", precio: "$ 180.00", empresa: "Bandai Namco Entertainment" },
  { id: 7, title: "Booster Box OP05 [INGLES]",imagen: "img/BBOP05.jpg", idioma: "Ingles", precio: "$ 125.00", empresa: "Bandai Namco Entertainment" },
  { id: 8, title: "The Three Captains Ultra Deck ST-10 [INGLES]",imagen: "img/OPST10.jpg", idioma: "Ingles", precio: "$ 39.00", empresa: "Bandai Namco Entertainment" }
]

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSearchFormSubmit);

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchTerm = document.querySelector('#search-input').value.trim().toLowerCase();

  document.querySelector('#search-input').value = '';

  const productCards = document.querySelectorAll('.card');
  productCards.forEach(card => card.style.display = 'none');

  const filteredProducts =  productos.filter(product => product.title.toLowerCase().includes(searchTerm));
 
 
  displayFilteredProducts(productos, filteredProducts);
}

function displayFilteredProducts(productos, filteredProducts) {
  const productContainer = document.querySelector('.row');
  const productCards = document.querySelectorAll('.card');

  productContainer.innerHTML = '';

  productos.forEach(product => {
      if (filteredProducts.some(filteredProduct => filteredProduct.title.toLowerCase().trim() === product.title.toLowerCase().trim())) {
          const newCard = createProductCard(product);
          productContainer.appendChild(newCard);
      }
  });
}
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => button.addEventListener('click', handleAddToCart));


function createProductCard(product) {
  const column = document.createElement('div');
  column.classList.add('col-md-3', 'product-column');
  const card = document.createElement('div');
  card.classList.add('col-md-3');

  card.innerHTML = `
    <div class="card">
      <img src="${product.imagen}" class="card-img-top" alt="${product.title}">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Precio: ${product.precio}</h6>
        <button type="button" class="btn btn-primary">Mas Informacion</button>
        <button type="button" class="btn btn-primary add-to-cart-btn"
                data-product-title="Elite Trainer Box Crown Zenith [INGLES]" data-product-price="$49.00">Agregar al
                Carrito</button>
      </div>
    </div>
  `;

  return card;
}

function handleProductButtonClick(event) {
  const button = event.currentTarget;
  const card = button.closest('.card');
  const productTitle = card.querySelector('.card-title').textContent;

  displayProductDetails(productTitle);
}

function displayProductDetails(productTitle) {

  const productDetailsDiv = document.createElement('div');
  productDetailsDiv.classList.add('product-details');

  const productDetailsHeading = document.createElement('h2');
  productDetailsHeading.textContent = productTitle;

  const productDetailsParagraph = document.createElement('p');
  productDetailsParagraph.textContent = 'Detalles del producto...';

  productDetailsDiv.appendChild(productDetailsHeading);
  productDetailsDiv.appendChild(productDetailsParagraph);

  const main = document.querySelector('main');
  main.appendChild(productDetailsDiv);
}

function handleAddToCart(event) {
  const button = event.currentTarget;
  const productTitle = button.dataset.productTitle;
  const productPrice = button.dataset.productPrice;

  addProductToCart(productTitle, productPrice);
  updateCartSummary();
}

function addProductToCart(productTitle, productPrice) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ title: productTitle, price: productPrice });
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartSummaryBody = document.querySelector('#cart-summary .modal-body');

  cartSummaryBody.innerHTML = '';

  if (cart.length === 0) {
    cartSummaryBody.textContent = 'Tu carrito esta vacio.';
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement('p');
    cartItem.textContent = `${item.title} - $${item.price}`;
    cartSummaryBody.appendChild(cartItem);
  });

  const cartTotal = cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);
  const cartTotalElement = document.createElement('p');
  cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
  cartSummaryBody.appendChild(cartTotalElement);
}
const viewCartBtn = document.querySelector('#view-cart-btn');
viewCartBtn.addEventListener('click', function () {
  updateCartSummary();
  $('#cart-summary').modal('show');
});

document.addEventListener('DOMContentLoaded', function () {
  updateCartSummary();
});

function clearCart() {
  localStorage.removeItem('cart');
  Swal.fire({
    icon: 'success',
    title: 'Carrito vaciado',
    text: 'Tu carrito ha sido vaciado con éxito.',
  }).then(() => {
    updateCartSummary();
  });

  
}

const url = 'https://your-api.com/products/prices?ids=1,2,3,4,5,6,7,8';
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_api_key'
  }
};

async function updateProductPrices() {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Error al obtener los precios de los productos');
    }
    const prices = await response.json();

    const productElements = document.querySelectorAll('.card');
    productElements.forEach((productElement, index) => {
      const priceElement = productElement.querySelector('.card-subtitle');
      const price = prices[index + 1];

      if (price) {
        priceElement.textContent = `Precio: $${price.toFixed(2)}`;
      } else {
        console.warn(`No se encontró el precio para el producto con ID ${index + 1}`);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

updateProductPrices();