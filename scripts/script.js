const year = document.getElementById("year")
let d = new Date()

const donationButtons = document.querySelectorAll('.donation-btn');

const form = document.getElementById('signupForm');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const zipInput = document.getElementById('zip');
const warningDiv = document.getElementById('warning');

const hamburgerMenu = document.getElementById('hamburger-menu');
const ctaButtons = document.getElementById('cta-buttons');

donationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        donationButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to the clicked button
        button.classList.add('active');
    });
});

year.innerHTML += d.getFullYear()



form.addEventListener('submit', (event) => {
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
      messages.push('Please enter a valid email address.');
    }

    // Validate phone
    if (!phonePattern.test(phoneInput.value)) {
      isValid = false;
      messages.push('Please enter a valid phone number (10 digits).');
    }

    // Validate ZIP
    if (!zipPattern.test(zipInput.value)) {
      isValid = false;
      messages.push('Please enter a valid ZIP code (5 digits).');
    }

    // Display warning messages
    if (!isValid) {
      warningDiv.innerHTML = messages.join('<br>');
    } else {
      warningDiv.innerHTML = ''; // Clear warning messages
      // Here you can proceed with form submission or other actions
      alert('Form submitted successfully!');
    }
  });


  
  
  hamburgerMenu.addEventListener('click', () => {
    ctaButtons.classList.toggle('active');
});