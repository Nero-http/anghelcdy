import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function initializePage() {
  const html = document.documentElement;
  const header = document.querySelector("[data-site-header]");
  const themeButton = document.querySelector("#toggledark");
  const replayButton = document.querySelector("#refresh");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const contactForm = document.querySelector("#contactForm");
  const formStatus = document.querySelector("#formStatus");
  const year = document.querySelector("#year");
  const progressBar = document.querySelector("#progressBar");

  const contactResult = new URLSearchParams(window.location.search).get("contact");

  if (formStatus && contactResult === "sent") {
    formStatus.textContent = "Thanks for reaching out. Your message has been sent.";
  } else if (formStatus && contactResult === "error") {
    formStatus.textContent =
      "We couldn't send your message. Please check the form and try again.";
  }

  function updateThemeColor() {
    const isDark = html.classList.contains("dark");

    if (themeColor) {
      themeColor.content = isDark ? "#101010" : "#f4f0e8";
    }

    themeButton?.setAttribute("aria-pressed", String(isDark));
  }

  try {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
      html.classList.remove("dark");
    } else if (savedTheme === "dark") {
      html.classList.add("dark");
    }
  } catch (error) {
    // Theme switching remains available when storage is disabled.
  }

  updateThemeColor();

  let introTimeline;
  const motion = gsap.matchMedia();
  const animationContext = gsap.context(() => {
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const heroItems = document.querySelectorAll("[data-hero-item]");
      const heroAside = document.querySelector("[data-hero-aside]");

      introTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (heroItems.length) {
        introTimeline.from(heroItems, {
          y: 30,
          autoAlpha: 0,
          filter: "blur(7px)",
          duration: 0.8,
          stagger: 0.13,
          clearProps: "transform,filter",
        });
      }

      if (heroAside) {
        introTimeline.from(
          heroAside,
          {
            x: 28,
            y: 12,
            autoAlpha: 0,
            filter: "blur(6px)",
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform,filter",
          },
          "-=0.45",
        );
      }

      document.querySelectorAll("[data-reveal-group]").forEach((group) => {
        const headings = group.querySelectorAll("[data-reveal-heading]");
        const items = group.querySelectorAll("[data-reveal-item]");
        const visuals = group.querySelectorAll("[data-project-visual]");

        if (!headings.length && !items.length) {
          return;
        }

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: group,
            start: "top 82%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });

        if (headings.length) {
          reveal.from(headings, {
            y: 22,
            autoAlpha: 0,
            filter: "blur(5px)",
            duration: 0.7,
            stagger: 0.1,
            ease: "power4.out",
            clearProps: "transform,filter",
          });
        }

        if (items.length) {
          reveal.from(
            items,
            {
              x: (index, item) => {
                if (item.dataset.revealFrom === "left") return -30;
                if (item.dataset.revealFrom === "right") return 30;
                return 0;
              },
              y: (index, item) => (item.dataset.revealFrom === "up" ? 30 : 12),
              scale: (index, item) => (item.matches(".project-card") ? 0.97 : 1),
              autoAlpha: 0,
              filter: "blur(5px)",
              duration: 0.75,
              stagger: 0.12,
              ease: "power3.out",
              clearProps: "transform,filter",
            },
            headings.length ? "-=0.22" : 0,
          );
        }

        if (visuals.length) {
          reveal.from(
            visuals,
            {
              scale: 0.9,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
              clearProps: "transform",
            },
            "<0.18",
          );
        }
      });

      if (progressBar) {
        gsap.fromTo(
          progressBar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.35,
            },
          },
        );
      }

      return () => {
        introTimeline = undefined;
      };
    });
  });

  function updateHeader() {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  function toggleTheme() {
    html.classList.toggle("dark");

    try {
      localStorage.setItem(
        "portfolio-theme",
        html.classList.contains("dark") ? "dark" : "light",
      );
    } catch (error) {
      // The current theme still applies when storage is disabled.
    }

    updateThemeColor();
  }

  function replayIntro() {
    introTimeline?.restart();
  }

  themeButton?.addEventListener("click", toggleTheme);
  replayButton?.addEventListener("click", replayIntro);

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  async function submitContactForm(event) {
    event.preventDefault();

    if (!(contactForm instanceof HTMLFormElement)) {
      return;
    }

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const submitButton = contactForm.querySelector("#submitButton");
    const originalButtonText = submitButton?.textContent ?? "";

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    contactForm.setAttribute("aria-busy", "true");

    if (formStatus) {
      formStatus.textContent = "Sending your message...";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm),
      });

      if (response.redirected) {
        window.location.assign(response.url);
        return;
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (formStatus) {
          formStatus.textContent =
            result.message || "We couldn't send your message. Please try again.";
        }
        return;
      }

      if (formStatus) {
        formStatus.textContent = result.message;
      }

      contactForm.reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);

      if (formStatus) {
        formStatus.textContent =
          "We couldn't send your message. Check your connection and try again.";
      }
    } finally {
      contactForm.removeAttribute("aria-busy");

      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  }

  contactForm?.addEventListener("submit", submitContactForm);

  return () => {
    animationContext.revert();
    motion.revert();
    window.removeEventListener("scroll", updateHeader);
    themeButton?.removeEventListener("click", toggleTheme);
    replayButton?.removeEventListener("click", replayIntro);
    contactForm?.removeEventListener("submit", submitContactForm);
  };
}

let pageCleanup;

function handlePageLoad() {
  if (!pageCleanup) {
    pageCleanup = initializePage();
  }
}

function handleBeforeSwap() {
  pageCleanup?.();
  pageCleanup = undefined;
}

document.addEventListener("astro:page-load", handlePageLoad);
document.addEventListener("astro:before-swap", handleBeforeSwap);
pageCleanup = initializePage();
