const subtotalValue = document.querySelector(".subtotal-value");

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
const cartSummary = document.querySelector(".cart-summary");
const deliveryValue = document.querySelector(".delivery-value");
const totalValue = document.querySelector(".total-value");

const cartItemsContainer = document.querySelector(".cart-items-container");

let cart = savedCart;


console.log(savedCart);


function calculateSubtotal(){

    let subtotal = 0;

    cart.forEach(function(item){

        subtotal = subtotal + item.price * item.quantity;

    });

    subtotalValue.textContent = `₹${subtotal}`;

    let delivery = 0;

    if(subtotal >= 499){
        delivery = 0;
    }else{
        delivery = 49;
    }


    if(delivery === 0){
        deliveryValue.textContent = "Free";
    }else {
        deliveryValue.textContent = `₹${delivery}`;
    }

    totalValue.textContent = `₹${subtotal + delivery}`;
}


function showEmptyCart() {

    cartItemsContainer.innerHTML = `
        <div class="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>Add some products to your cart and they will appear here.</p>
            <a href="index.html" class="continue-shopping">Continue Shopping</a>
        </div>
    `;

    cartSummary.style.display = "none";
}


if(cart.length === 0){

    showEmptyCart();

}


savedCart.forEach(function(item) {

    cartItemsContainer.innerHTML += `
        <div class="cart-item">

            <div class="cart-item-image">
                <img src="images/${item.image}" alt="${item.name}">
            </div>

            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p class="item-price">₹${item.price * item.quantity}</p>
            </div>

            <div class="quantity">
                <button class="decrease-button">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="increase-button">+</button>
            </div>

            <button class="delete-button">🗑️</button>

        </div>
    `;

});


calculateSubtotal();


cartItemsContainer.addEventListener("click", function(event) {

    if(event.target.classList.contains("delete-button")){

        const cartItem = event.target.parentElement;

        const productName = cartItem.querySelector("h3").textContent;

        const updatedCart = cart.filter(function(item) {

            return item.name !== productName;

        });

        cart = updatedCart;

        localStorage.setItem("cart", JSON.stringify(cart));

        cartItem.remove();

        calculateSubtotal();

        if(cart.length === 0){

            showEmptyCart();

        }

    }


    if(event.target.classList.contains("increase-button")){

        const cartItem = event.target.closest(".cart-item");

        const productName = cartItem.querySelector("h3").textContent;

        const product = cart.find(function(item){

            return item.name === productName;

        });

        product.quantity++;

        const quantityValue = cartItem.querySelector(".quantity-value");
        quantityValue.textContent = product.quantity;

        const itemPrice = cartItem.querySelector(".item-price");
        itemPrice.textContent = `₹${product.price * product.quantity}`;

        localStorage.setItem("cart", JSON.stringify(cart));

        calculateSubtotal();

    }


    if(event.target.classList.contains("decrease-button")){

        const cartItem = event.target.closest(".cart-item");

        const productName = cartItem.querySelector("h3").textContent;

        const product = cart.find(function(item){

            return item.name === productName;

        });

        if(product.quantity > 1){

            product.quantity--;

        }

        const quantityValue = cartItem.querySelector(".quantity-value");
        quantityValue.textContent = product.quantity;

        const itemPrice = cartItem.querySelector(".item-price");
        itemPrice.textContent = `₹${product.price * product.quantity}`;

        localStorage.setItem("cart", JSON.stringify(cart));

        calculateSubtotal();

    }

});