document.addEventListener("DOMContentLoaded", function () {
    // 🏠 Hamburger Menu Toggle
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", function () {
            mobileMenu.classList.toggle("active");
            // Ensure focus management for accessibility
            if (mobileMenu.classList.contains("active")) {
                mobileMenu.setAttribute("aria-expanded", "true");
                menuBtn.setAttribute("aria-label", "Close menu");
            } else {
                mobileMenu.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Open menu");
            }
        });
    }

    // 🏃‍♂️ Smooth Scrolling for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });


   // ✉️ Contact Form Validation
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();
        let formMessage = document.getElementById("form-message");

        // Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;

        if (!name || !email || !message) {
            showMessage(formMessage, "Please fill in all fields.", "red");
        } else if (!emailRegex.test(email)) {
            showMessage(formMessage, "Please enter a valid email address.", "red");
        } else {
            showMessage(formMessage, "Your message has been sent!", "green");

            // Delay form reset to show success message for 2 seconds
            setTimeout(() => {
                contactForm.reset();
                document.getElementById("message").style.height = "auto"; // Reset textarea height
            }, 2000);
        }
    });
}

// Function to display messages with animation
function showMessage(element, text, color) {
    element.textContent = text;
    element.style.color = color;
    element.style.opacity = "0"; // Start invisible
    element.style.transition = "opacity 0.3s ease-in-out";

    setTimeout(() => {
        element.style.opacity = "1"; // Fade in
    }, 100);
}

// Function to auto-expand textarea
function autoExpand(element) {
    element.style.height = "auto"; // Reset height
    element.style.height = element.scrollHeight + "px"; // Adjust height
}


    // 🔼 Scroll to Top Button
    const scrollButton = document.getElementById("scroll-to-top");
    if (scrollButton) {
        window.addEventListener("scroll", function () {
            // Show the button when scrolled more than 200px
            scrollButton.style.display = window.scrollY > 200 ? "block" : "none";
        });

        scrollButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 🎨 Add transitions for mobile menu
    if (mobileMenu) {
        mobileMenu.style.transition = "transform 0.3s ease-in-out";
    }
});
