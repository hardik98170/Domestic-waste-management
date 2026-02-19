// Smooth scrolling for buttons and nav links
document.addEventListener("DOMContentLoaded", function () {
  // Handle hero buttons with data-scroll-target
  const scrollButtons = document.querySelectorAll("[data-scroll-target]");
  scrollButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetSelector = btn.getAttribute("data-scroll-target");
      const target = document.querySelector(targetSelector);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Ensure nav links also use smooth scrolling (for older browsers without CSS smooth behavior)
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Pickup schedule logic
  const scheduleForm = document.getElementById("scheduleForm");
  const areaInput = document.getElementById("areaInput");
  const scheduleResult = document.getElementById("scheduleResult");

  if (scheduleForm && areaInput && scheduleResult) {
    scheduleForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const areaName = areaInput.value.trim();
      if (!areaName) {
        return;
      }

      // Simple dynamic message (could be customized per area)
      scheduleResult.textContent = `Next Pickup Date for "${areaName}": Monday, 10 AM`;
      scheduleResult.classList.add("visible");
    });
  }

  // Complaint form submission handling
  const complaintForm = document.getElementById("complaintForm");
  if (complaintForm) {
    complaintForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Here you could send data to a backend using fetch.
      // For now, just show the success alert as requested.
      alert("Complaint Registered Successfully!");

      // Optionally reset form after submission
      complaintForm.reset();
    });
  }

  // Dashboard animated counters
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (el, target) => {
    const duration = 1600;
    const start = 0;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + (target - start) * progress);
      el.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  // Initialize counters (random total complaints)
  const initCounters = () => {
    counters.forEach((counter) => {
      const dataTarget = counter.getAttribute("data-target");
      let targetValue = 0;

      if (dataTarget === "random-complaints") {
        // Generate a pseudo-random total complaints count
        targetValue = Math.floor(120 + Math.random() * 280);
      } else {
        targetValue = parseInt(dataTarget || "0", 10);
      }

      animateCounter(counter, targetValue);
    });
  };

  initCounters();

  // Scroll reveal animation using IntersectionObserver
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: reveal all elements immediately
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  // Dark mode toggle
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  const THEME_KEY = "ecosmart-theme";

  const applyThemeFromStorage = () => {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "dark") {
      body.classList.add("dark-mode");
      if (themeToggle) {
        themeToggle.textContent = "☀️";
      }
    } else {
      body.classList.remove("dark-mode");
      if (themeToggle) {
        themeToggle.textContent = "🌙";
      }
    }
  };

  applyThemeFromStorage();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      window.localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
    });
  }

  // Footer year display
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});