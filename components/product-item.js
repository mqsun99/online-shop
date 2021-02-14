// product-item.js

class ProductItem extends HTMLElement {
  constructor(i) {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    const cartCount = document.querySelector("#cart-count");
    let carts = JSON.parse(window.localStorage.getItem('carts'));
    let imglink = i['image'];
    let id = i['id'];

    let li = document.createElement("li");
    li.setAttribute('class', 'product');

    let img = document.createElement("img");
    img.setAttribute('src', imglink);
    img.setAttribute('alt', i['title']);
    img.setAttribute('width', 200);

    let p1 = document.createElement("p");
    p1.textContent = i['title'];
    p1.setAttribute('class', 'title');

    let p2 = document.createElement("p");
    p2.textContent = '$' + i['price'];
    p2.setAttribute('class', 'price');

    let style = document.createElement("style");
    style.textContent = `
      .price {
          color: green;
          font-size: 1.8em;
          font-weight: bold;
          margin: 0;
        }
        .product {
          align-items: center;
          background-color: white;
          border-radius: 5px;
          display: grid;
          grid-template-areas:
          'image'
          'title'
          'price'
          'add';
          grid-template-rows: 67% 11% 11% 11%;
          height: 450px;
          filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
          margin: 0 30px 30px 0;
          padding: 10px 20px;
          width: 200px;
        }
        .product > button {
          background-color: rgb(255, 208, 0);
          border: none;
          border-radius: 5px;
          color: black;
          justify-self: center;
          max-height: 35px;
          padding: 8px 20px;
          transition: 0.1s ease all;
        }
        .product > button:hover {
          background-color: rgb(255, 166, 0);
          cursor: pointer;
          transition: 0.1s ease all;
        }
        .product > img {
          align-self: center;
          justify-self: center;
          width: 100%;
        }
        .title {
          font-size: 1.1em;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .title:hover {
          font-size: 1.1em;
          margin: 0;
          white-space: wrap;
          overflow: auto;
          text-overflow: unset;
        } `;


    let button = document.createElement("button");
    if (!carts){
      button.textContent = "Add to Cart";
    } else if (carts.includes(id)){
      button.textContent = "Remove from Cart";
    } else {
      button.textContent = "Add to Cart";
    }

    button.onclick = function(){
      if (button.textContent == "Add to Cart"){
        alert('Added to Cart!');
        button.textContent = "Remove from Cart";
        cartCount.textContent =  Number(cartCount.innerText) + 1;
        carts = JSON.parse(window.localStorage.getItem("carts"));
        if(!carts){
          carts = [];
        }
        carts.push(id);
        window.localStorage.setItem("carts", JSON.stringify(carts));

      } else {
        button.textContent = "Add to Cart";
        cartCount.textContent =  Number(cartCount.innerText) - 1;;
        carts = JSON.parse(window.localStorage.getItem("carts"));
        carts.splice(carts.indexOf(id), 1);
        window.localStorage.setItem("carts", JSON.stringify(carts));
      }
    }

    li.appendChild(img);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(style);
    li.appendChild(button);
    shadow.append(li);
  }
}

customElements.define('product-item', ProductItem);
