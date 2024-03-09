const productos = [
  { id: 1, nombre: "Booster Bundle 151", idioma: "Ingles", precio: 50, empresa: "The Pokemon Company" },
  { id: 2, nombre: "Booster Box Paradox Rift", idioma: "Ingles", precio: 160, empresa: "The Pokemon Company" },
  { id: 3, nombre: "Ultra-Premium Collection 151", idioma: "Ingles", precio: 120, empresa: "The Pokemon Company" },
  { id: 4, nombre: "Elite Trainer Box Crown Zenith", idioma: "Ingles", precio: 49, empresa: "The Pokemon Company" },
  { id: 5, nombre: "Booster Box OP01", idioma: "Ingles", precio: 300, empresa: "Bandai Namco Entertainment" },
  { id: 6, nombre: "Booster Box OP02", idioma: "Ingles", precio: 180, empresa: "Bandai Namco Entertainment" },
  { id: 7, nombre: "Booster Box OP05", idioma: "Ingles", precio: 125, empresa: "Bandai Namco Entertainment" },
  { id: 8, nombre: "The Three Captains Ultra Deck ST-10", idioma: "Ingles", precio: 39, empresa: "Bandai Namco Entertainment" }
]
/*
class Carrito {
  constructor() {
    this.productos = [];
  }
  agregarProducto(producto) {
    this.productos.push(producto);
  }

  calcularTotal() {
    let total = 0;
    this.productos.forEach(producto => {
      total += producto.precio;
    });
    return total;
  }

  aplicarDescuentoIVA(descuento) {
    let totalDescontado = this.calcularTotal();
    totalDescontado -= totalDescontado * (descuento / 100);
    return totalDescontado;
  }
}

let carrito = new Carrito();

for (let i = 0; i < productos.length; i++) {
  let respuesta = prompt(`Quieres agregar al carrito ${productos[i].nombre}? (Sí/No)`);
  if (respuesta.toLowerCase() === 'sí' || respuesta.toLowerCase() === 'si') {
    carrito.agregarProducto(productos[i]);
  }
}

let descuentoIVA = parseInt(prompt("Marca 0 si quieres finalizar la compra, de lo contrario marca el porcentaje de descuento IVA (10-22%)"));

while (descuentoIVA < 10 || descuentoIVA > 22) {
  alert("El descuento IVA debe estar entre 10 y 22%");
  descuentoIVA = parseInt(prompt("Marca 0 si quieres finalizar la compra, de lo contrario marca el porcentaje de descuento IVA (10-22%)"));
}

if (descuentoIVA === 0) {
  console.log("Total a pagar: $" + carrito.calcularTotal());
} else {
  console.log("Total a pagar con descuento IVA: $" + carrito.aplicarDescuentoIVA(descuentoIVA));
}
if (descuentoIVA === 0) {
  alert("Total a pagar: $" + carrito.calcularTotal());
} else {
  alert("Total a pagar con descuento IVA: $" + carrito.aplicarDescuentoIVA(descuentoIVA));
} */

// Tercera pre entrega

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSearchFormSubmit);

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchTerm = document.querySelector('#search-input').value.trim().toLowerCase();

  document.querySelector('#search-input').value = '';

  const productCards = document.querySelectorAll('.card');
  productCards.forEach(card => card.style.display = 'none');

  const filteredProducts = filterProducts(searchTerm);

  displayFilteredProducts(filteredProducts);
}

function filterProducts(searchTerm) {
  const products = [
    { title: 'Booster Bundle 151 [INGLES]' },
    { title: 'Booster Box Paradox Rift [INGLES]' },
    { title: 'Ultra-Premium Collection 151 [INGLES]' },
    { title: 'Elite Trainer Box Crown Zenith [INGLES]' },
    { title: 'Booster Box OP01 [INGLES]' },
    { title: 'Booster Box OP02 [INGLES]' },
    { title: 'Booster Box OP05 [INGLES]' },
    { title: 'The Three Captains Ultra Deck ST-10 [INGLES]' },
  ];

  return products.filter(product => product.title.toLowerCase().includes(searchTerm));
}

function displayFilteredProducts(filteredProducts) {
  const productCards = document.querySelectorAll('.card');

  filteredProducts.forEach((product, index) => {
    if (index < productCards.length) {
      productCards[index].style.display = 'block';
    } else {

      const newCard = createProductCard(product.title);
      document.querySelector('.row').appendChild(newCard);
    }
  });

  productCards.forEach(card => {
    if (!filteredProducts.some(product => product.title === card.querySelector('.card-title').textContent.trim())) {
      card.style.display = 'none';
    }
  });
}

function createProductCard(productTitle) {
  const card = document.createElement('div');
  card.classList.add('col-md-3');

  card.innerHTML = `
    <div class="card">
      <img src="img/BB151.jpg" class="card-img-top" alt="${productTitle}">
      <div class="card-body">
        <h5 class="card-title">${productTitle}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Precio: $50.00</h6>
        <button type="button" class="btn btn-primary">Mas Informacion</button>
      </div>
    </div>
  `;

  return card;
}

const productButtons = document.querySelectorAll('.btn-primary');
productButtons.forEach(button => {
  button.addEventListener('click', handleProductButtonClick);
});

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

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => button.addEventListener('click', handleAddToCart));

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