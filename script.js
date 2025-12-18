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
// add to cart function
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(game => game.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

// display cart function
document.addEventListener("DOMContentLoaded", function () {
    const cartDiv = document.getElementById("cartItems");
    if (!cartDiv) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    cartDiv.innerHTML = "";

    cart.forEach((item, index) => {
        cartDiv.innerHTML += `
            <div style="margin:15px; border:2px solid #00ffea; padding:10px;">
                <strong>${item.name}</strong><br>
                Tokens: ${item.price}🪙<br>
                Quantity:
                <button onclick="changeQty(${index}, -1)">-</button>
                ${item.qty}
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
        `;
    });
});

// change quantity function
function changeQty(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// submit cart function
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


