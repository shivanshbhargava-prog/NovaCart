const splashScreen = document.querySelector(".splash-screen");
const navbar = document.querySelector(".navbar");
const container = document.querySelector(".products-container");
const cartCount = document.querySelector(".cart-link span");
const cartLink = document.querySelector(".cart-link");
const subtotalValue = document.querySelector(".subtotal-value");

const savedCart = JSON.parse(localStorage.getItem("cart"));

const productCards = document.querySelectorAll(".product-card");

const products = [
    { name: "Wireless Headphones", price: 1999, image: "headphones.png" },
    { name: "Smart Watch", price: 2999, image: "smartwatch.png" },
    { name: "Running Shoes", price: 1499, image: "shoes.png" },
    { name: "Action Camera", price: 3999, image: "camera.png" },
    { name: "Laptop", price: 54999, image: "laptop.png" },
    { name: "Smartphone", price: 24999, image: "smartphone.png" },
    { name: "Backpack", price: 1299, image: "backpack.png" },
    { name: "Mechanical Keyboard", price: 2499, image: "keyboard.png" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
cartCount.textContent = cart.length;


setTimeout(function() {

    splashScreen.classList.add("hide");

}, 2000);


splashScreen.addEventListener("animationend", function(event) {

    if(event.animationName === "splashExit") {
        navbar.classList.add("show");
    }

});


productCards.forEach(function(product) {

    const clone = product.cloneNode(true);

    container.appendChild(clone);

});

cart.forEach(function(item) {

    productCards.forEach(function(card) {

        const productName = card.querySelector("h3").textContent;

        if (productName === item.name) {

            const button = card.querySelector("button");

            button.textContent = "✓ Added to Cart";
            button.disabled = true;

        }

    });

});


function autoSlide() {

    container.scrollLeft += 1;

    if(container.scrollLeft >= container.scrollWidth / 2) {

        container.scrollLeft = 0;

    }

};

setInterval(autoSlide, 10);


container.addEventListener("click", function(event) {

    if (event.target.tagName === "BUTTON") {

        const button = event.target;

        const card = button.parentElement;
        const productName = card.querySelector("h3").textContent;

        const product = products.find(function(item) {

            return item.name === productName;

        });


        cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });


        localStorage.setItem("cart", JSON.stringify(cart));


        let subtotal = 0;

        cart.forEach(function(item) {

            subtotal = subtotal + item.price * item.quantity;

        });


        if (subtotalValue) {

            subtotalValue.textContent = `₹${subtotal}`;

        }


        cartCount.textContent = cart.length;


        cartLink.classList.add("cart-effect");

        setTimeout(function() {

            cartLink.classList.remove("cart-effect");

        }, 1000);


        button.textContent = "✓ Added to Cart";
        button.disabled = true;

    }

});