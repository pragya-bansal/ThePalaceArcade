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


