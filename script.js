
function validateForm() {
    const name = document.getElementById("name").value;
    const msg  = document.getElementById("message").value;
    if (name === "" || msg === "") {
        alert("Please fill out all fields!");
        return false;
    }
    alert("Form submitted!");
    return true;
}
// for the booking form, emailvalidation and booking pop up
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("bookingForm");

    if (!form) return; // Prevent errors on other pages

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // stop refresh

        const email = form.querySelector('input[type="email"]').value.trim();

        // Simple email validation regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("❌ Please enter a valid email address");
            return;
        }

        alert("✅ Your event has been successfully booked!");

        form.reset(); // clear form
    });

});
//for contact page to make a file.txt
function saveFeedback() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const rating = document.getElementById("rating").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !rating || !message) {
        alert("❌ Please fill all fields");
        return;
    }

    const feedbackText =
`Name: ${name}
Email: ${email}
Rating: ${rating}
Feedback: ${message}
Date: ${new Date().toLocaleString()}
-------------------------`;

    const blob = new Blob([feedbackText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "feedback.txt";
    link.click();

    alert("✅ Feedback saved successfully!");
}
const TOKEN_PRICE = 10; // ₹10 per token
function addToCart(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(game => game.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({ name: name, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Token added for " + name);
}

// Load Cart
document.addEventListener("DOMContentLoaded", function () {
    const cartDiv = document.getElementById("cartItems");
    const summaryDiv = document.getElementById("orderSummary");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty</p>";
        summaryDiv.innerHTML = "";
        return;
    }

    cartDiv.innerHTML = "";
    let grandTotal = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.qty * TOKEN_PRICE;
        grandTotal += itemTotal;
        totalItems += item.qty;

        cartDiv.innerHTML += `
            <div class="cart-item">
                <div class="item-name">
                    <strong>${item.name}</strong>
                </div>

                <div class="qty-controls">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>

                <div class="item-total">
                    ₹${itemTotal}
                </div>
            </div>
        `;
    });

    summaryDiv.innerHTML = `
        <p>Total Items: ${totalItems}</p>
        <p><strong>Grand Total: ₹${grandTotal}</strong></p>
    `;
});


// Change Quantity
function changeQty(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}


// Submit Cart
function submitCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("❌ Your cart is empty!");
        return;
    }

    alert("✅ Thank you for your purchase!");
    localStorage.removeItem("cart");
    location.reload();
}
