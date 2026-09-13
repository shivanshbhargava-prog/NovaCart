const step1 = document.querySelector(".step-1");
const step2 = document.querySelector(".step-2");
const step3 = document.querySelector(".step-3");

const nextButton = document.querySelector(".step-1 .next-button");
const backButton = document.querySelector(".step-2 .back-button");
const nextButton2 = document.querySelector(".step-2 .next-button");
const backButton2 = document.querySelector(".step-3 .back-button");
const placeOrderButton = document.querySelector(".place-order-button");
const orderSuccess = document.querySelector(".order-success");

const progressSteps = document.querySelectorAll(".progress-step");

const paymentOptionsContainer = document.querySelector(".payment-options");

const inputs = document.querySelectorAll(".step-1 input, .step-1 textarea");
const paymentOptions = document.querySelectorAll('input[name="payment"]');

const fullName = document.querySelector("#full-name");
const phone = document.querySelector("#phone");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const state = document.querySelector("#state");
const pincode = document.querySelector("#pincode");

const reviewItems = document.querySelector(".review-items");
const reviewAddress = document.querySelector(".review-address");
const reviewPayment = document.querySelector(".review-payment");
const reviewSubtotal = document.querySelector(".review-subtotal");
const reviewDelivery = document.querySelector(".review-delivery");
const reviewTotal = document.querySelector(".review-total");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

let selectedPayment = "";


function calculateReviewTotal(){

    let subtotal = 0;

    cart.forEach(function(item){

        subtotal += item.price * item.quantity;

    });

    reviewSubtotal.textContent = `₹${subtotal}`;

    let delivery = 0;

    if(subtotal >= 499){
        delivery = 0
    }
    else {
        delivery = 49;
    }

    if(delivery === 0){

        reviewDelivery.innerHTML = `
            <span class="free-delivery">
                <del>₹49</del> Free Delivery
            </span>
        `;

    }
    else{
        reviewDelivery.textContent = `₹${delivery}`;
    }

    const total = subtotal + delivery;

    reviewTotal.textContent = `₹${total}`;

}


cart.forEach(function(item){

    reviewItems.innerHTML += `

        <div class="review-item">

            <div class="review-item-info">

                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p>₹${item.price * item.quantity}</p>

            </div>

        </div>

    `;

});


nextButton.addEventListener("click", function(){

    let isValid = true;

    inputs.forEach(function(input){

        if(input.value.trim() === ""){

            isValid = false;

            input.style.borderColor = "red";

            if(!input.parentElement.querySelector(".error-message")){

                const error = document.createElement("p");

                error.textContent = "Please fill out this field!";
                error.classList.add("error-message");

                input.parentElement.appendChild(error);

            }

        }

    });

    if(!isValid){
        return;
    }


    reviewAddress.innerHTML = `
        <p><strong>${fullName.value}</strong></p>
        <p>${phone.value}</p>
        <p>${address.value}</p>
        <p>${city.value}, ${state.value} - ${pincode.value}</p>
    `;


    step1.style.display = "none";
    step2.style.display = "block";


    progressSteps[0].classList.remove("active");
    progressSteps[0].classList.add("completed");

    progressSteps[0].querySelector("span").textContent = "✓";

    progressSteps[1].classList.add("active");

});


inputs.forEach(function(input){

    input.addEventListener("input", function(){

        if(input.value.trim() !== ""){

            input.style.borderColor = "";

            const error = input.parentElement.querySelector(".error-message");

            if(error){
                error.remove();
            }

        }

    });

});


backButton.addEventListener("click", function(){

    step2.style.display = "none";
    step1.style.display = "block";

    progressSteps[1].classList.remove("active");
    progressSteps[0].classList.add("active");

});


nextButton2.addEventListener("click", function(){

    let isPaymentSelected = false;


    paymentOptions.forEach(function(payment){

        if(payment.checked){

            selectedPayment = payment.value;

            isPaymentSelected = true;

        }

    });


    if(!isPaymentSelected){

        if(!paymentOptionsContainer.querySelector(".error-message")){

            const error = document.createElement("p");

            error.textContent = "Please select a payment method";
            error.classList.add("error-message");

            paymentOptionsContainer.appendChild(error);

        }

        return;

    }

    calculateReviewTotal();


    let paymentText = "";

    if(selectedPayment === "card"){
        paymentText = "Credit / Debit Card";
    }

    if(selectedPayment === "upi"){
        paymentText = "UPI";
    }

    if(selectedPayment === "net-banking"){
        paymentText = "Net Banking";
    }

    if(selectedPayment === "cod"){
        paymentText = "Cash on Delivery";
    }


    reviewPayment.innerHTML = `
        <p>${paymentText}</p>
    `;


    step2.style.display = "none";
    step3.style.display = "block";


    progressSteps[1].classList.remove("active");
    progressSteps[1].classList.add("completed");

    progressSteps[1].querySelector("span").textContent = "✓";

    progressSteps[2].classList.add("active");

});


paymentOptions.forEach(function(payment){

    payment.addEventListener("change", function(){

        const error = paymentOptionsContainer.querySelector(".error-message");

        if(error){
            error.remove();
        }

    });

});


backButton2.addEventListener("click", function(){

    step3.style.display = "none";
    step2.style.display = "block";

    progressSteps[2].classList.remove("active");
    progressSteps[1].classList.remove("completed");
    progressSteps[1].classList.add("active");
    progressSteps[1].querySelector("span").textContent = "2";

});


placeOrderButton.addEventListener("click", function(){

    localStorage.removeItem("cart");

    step3.style.display = "none";
    orderSuccess.style.display = "block";
});