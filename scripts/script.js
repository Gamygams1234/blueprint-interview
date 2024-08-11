document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  let d = new Date();
  let currentDonation = "25";

  const donationButtons = document.querySelectorAll(".donation-btn");
  const form = document.getElementById("signupForm");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const zipInput = document.getElementById("zip");
  const warningDiv = document.getElementById("warning");
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const ctaButtons = document.getElementById("cta-buttons");
  const currentDonationDiv = document.getElementById("current-donation");
  const heroForm = document.getElementById("hero-form");

  const volunteerForm = document.getElementById("volunteerForm");

  hamburgerMenu.addEventListener("click", () => {
    ctaButtons.classList.toggle("active");
  });

  year.innerHTML += d.getFullYear();

  donationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      donationButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to the clicked button
      button.classList.add("active");

      // Update current donation amount
      const amount = button.getAttribute("data-amount");
      if (amount === "other") {
        currentDonation = "Other";
      } else {
        currentDonation = parseInt(amount, 10);
      }

      // Update the display
      currentDonationDiv.innerHTML = `Current Donation: $${currentDonation}`;
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Regular expressions for validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^\d{10}$/; // Adjust this pattern to your requirements
    const zipPattern = /^\d{5}$/; // Adjust this pattern to your requirements

    let isValid = true;
    let messages = [];

    // Validate email
    if (!emailPattern.test(emailInput.value)) {
      isValid = false;
      messages.push("Please enter a valid email address.");
    }

    // Validate phone
    if (!phonePattern.test(phoneInput.value)) {
      isValid = false;
      messages.push("Please enter a valid phone number (10 digits).");
    }

    // Validate ZIP
    if (!zipPattern.test(zipInput.value)) {
      isValid = false;
      messages.push("Please enter a valid ZIP code (5 digits).");
    }

    // Display warning messages
    if (!isValid) {
      warningDiv.innerHTML = messages.join("<br>");
    } else {
      warningDiv.innerHTML = ""; // Clear warning messages
      // Proceed with form submission
      submitForm(emailInput.value, phoneInput.value, zipInput.value, currentDonation);
    }
  });

  function submitForm(email, phone, zip, donation) {
    // Replace with your Google Apps Script URL
    const scriptURL = "https://script.google.com/macros/s/AKfycbwzd9VW5U-66o8drLppIVO2mv1Z_4JBaFp79GsQ0Nw9_IQH02LFggZxvOi26YB-yXgw/exec";

    fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        email: email,
        phone: phone,
        zip: zip,
        donation: donation,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          heroForm.classList.add("submitted");
        } else {
          alert("Form submission failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error!", error.message);
        alert("Form submission failed. Please try again.");
      });
  }

  volunteerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting
    alert("Thank you for volunteering!");
  });

  // slide show

  let slideIndex = 0;
  showSlides();

  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
  }
});
