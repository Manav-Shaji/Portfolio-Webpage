document.addEventListener("DOMContentLoaded", function () {
    // Typed.js Initialization
    if (typeof Typed !== "undefined" && document.getElementById("typed-output")) {
        new Typed("#typed-output", {
            strings: ["Creative Developer", "Design Innovator", "Tech Enthusiast", "Web Wizard"],
            typeSpeed: 100,
            backSpeed: 50,
            loop: true,
            onStart: () => document.getElementById("typed-output").style.color = "#4C9FFF",
            onStringTyped: () => document.getElementById("typed-output").style.color = "#E1E1E1"
        });
    }

    // AOS Initialization
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Mobile Menu Handling (Fixed Nested Event)
    const menuBtn = document.querySelector(".navbar-toggler");
    const mobileMenu = document.querySelector(".navbar-collapse");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuBtn && mobileMenu) {
        const bsCollapse = new bootstrap.Collapse(mobileMenu, { toggle: false });

        // Toggle menu when clicking the navbar toggler
        menuBtn.addEventListener("click", () => {
            if (mobileMenu.classList.contains("show")) {
                bsCollapse.hide();
            } else {
                bsCollapse.show();
            }
        });

        // Close menu when clicking a nav link (only in mobile view)
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 992) {
                    bsCollapse.hide();
                }
            });
        });

        // Close menu when clicking outside (excluding navbar & menu)
        document.addEventListener("click", (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                bsCollapse.hide();
            }
        });
    }
    // Smooth Scrolling with Dynamic Speed
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const distance = Math.abs(window.scrollY - target.offsetTop);
                const duration = Math.min(1000, Math.max(300, distance / 2));

                window.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");
    const submitButton = document.querySelector("#contact-form button[type='submit']");
    const textarea = document.getElementById("message");

    // Function to show messages with fade effect
    function showFormMessage(text, color) {
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.style.color = color;
            formMessage.style.opacity = "1";

            setTimeout(() => {
                formMessage.style.opacity = "0";
            }, 3000);
        }
    }

    // Function to auto-expand textarea
    function autoExpand(element) {
        requestAnimationFrame(() => {
            element.style.height = "auto"; // Reset height
            element.style.height = element.scrollHeight + "px"; // Adjust height
        });
    }

    // Apply auto-expand to textarea
    if (textarea) {
        textarea.addEventListener("input", function () {
            autoExpand(this);
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = textarea.value.trim();
            const emailRegex = /^\S+@\S+\.\S+$/;

            if (!name || !email || !message) {
                showFormMessage("Please fill in all fields.", "red");
                return;
            }

            if (!emailRegex.test(email)) {
                showFormMessage("Please enter a valid email address.", "red");
                return;
            }

            // Disable submit button to prevent multiple submissions
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            setTimeout(() => {
                showFormMessage("Message sent successfully!", "green");
                contactForm.reset();
                autoExpand(textarea); // Reset textarea height
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            }, 1500); // Simulating message processing time
        });
    }

    // Scroll to Top Button with Fade Effect
    const scrollButton = document.getElementById("scroll-to-top");

    if (scrollButton) {
        window.addEventListener("scroll", () => {
            scrollButton.classList.toggle("show", window.scrollY > 200);
        });

        scrollButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
