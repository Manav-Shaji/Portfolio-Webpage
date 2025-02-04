document.addEventListener("DOMContentLoaded", function () {
 // 🏠 Hamburger Menu Toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");

        // Ensure accessibility attributes are updated
        if (mobileMenu.classList.contains("active")) {
            mobileMenu.setAttribute("aria-expanded", "true");
            mobileMenu.setAttribute("aria-hidden", "false");
            menuBtn.setAttribute("aria-label", "Close menu");
        } else {
            mobileMenu.setAttribute("aria-expanded", "false");
            mobileMenu.setAttribute("aria-hidden", "true");
            menuBtn.setAttribute("aria-label", "Open menu");
        }
    });

    // 🖥️ Fix: Reset menu on window resize
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove("active");
            mobileMenu.setAttribute("aria-expanded", "false");
            mobileMenu.setAttribute("aria-hidden", "true");
            menuBtn.setAttribute("aria-label", "Open menu");
        }
    });
}


    // Initialize AOS (Animate on Scroll) Library
    AOS.init({
        duration: 1000, // Animation duration in ms
        once: true, // Ensures animation runs only once when scrolled into view
    });

    // 🏃‍♂️ Smooth Scrolling for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                }, 100); // 100ms delay before scrolling
            }
        });
    });

    // 🎭 Typed.js (Animated Text Effect)
    if (typeof Typed !== "undefined" && document.getElementById("typed-output")) {
        new Typed("#typed-output", {
            strings: ["Creative Developer", "Design Innovator", "Tech Enthusiast", "Web Wizard"],
            typeSpeed: 100,
            backSpeed: 50,
            loop: true,
            onStart: function () {
                document.getElementById("typed-output").style.color = "#4C9FFF"; // Change text color on start
            },
            onStringTyped: function () {
                document.getElementById("typed-output").style.color = "#E1E1E1"; // Reset color after each string is typed
            }
        });
    }

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
                highlightInvalidFields();
            } else if (!emailRegex.test(email)) {
                showMessage(formMessage, "Please enter a valid email address.", "red");
                highlightInvalidFields();
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

    // Function to highlight invalid fields
    function highlightInvalidFields() {
        if (!name) document.getElementById("name").style.borderColor = "red";
        if (!email) document.getElementById("email").style.borderColor = "red";
        if (!message) document.getElementById("message").style.borderColor = "red";
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
            if (window.scrollY > 200) {
                scrollButton.classList.add("show");
            } else {
                scrollButton.classList.remove("show");
            }
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
