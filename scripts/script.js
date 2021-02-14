// // Script.js

window.addEventListener('DOMContentLoaded', async() => {
  var cartCount = document.getElementById('cart-count');
  var productList = document.getElementById('product-list');
  var cart = null;

  if (window.localStorage.getItem('products') == null) {
    await fetch('https://fakestoreapi.com/products')
     .then(response => response.json())
     .then(data => {
          window.localStorage.setItem('products', JSON.stringify(data));
      })
  }

  let items = JSON.parse(window.localStorage.getItem('products'));
  for (i in items){
    var product = new ProductItem(items[i]);
    productList.appendChild(product);
  }

  // cart update when refreshing page
  if (window.localStorage.getItem("carts")) {
    cart = JSON.parse(window.localStorage.getItem("carts"));
  } else {
    cart = [];
  }
  cartCount.textContent = cart.length;

});
