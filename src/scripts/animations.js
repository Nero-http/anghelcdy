
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerEffect({ name: "spin", defaults: { duration: 1 },
  effect: (targets, config) => { return gsap.to(targets, { rotation: "+=360", duration: config.duration, 
    ease: "power2.inOut", overwrite: "auto" }); }
});

  gsap.registerEffect({ name: "right", defaults: { duration: 0.3 },
  effect: (targets, config) => { return gsap.to(targets, { scale: 1.02, duration: config.duration, 
    ease: "power2.inOut", overwrite: "auto" }); }
});

  gsap.registerEffect({ name: "left", defaults: { duration: 0.3 },
  effect: (targets, config) => { return gsap.to(targets, { scale: 1, duration: config.duration, 
    ease: "power2.inOut", overwrite: "auto" }); }
});

document.querySelectorAll("#work").forEach((work) => {
  work.addEventListener("mouseenter", () => { gsap.effects.spin(work);}); 
});

document.querySelectorAll("h1").forEach((h1) => {
  h1.addEventListener("mouseenter", () => { gsap.effects.right(h1);});

  h1.addEventListener("mouseleave", () => { gsap.effects.left(h1);});
});

document.querySelectorAll("#one").forEach((one) => {
  one.addEventListener("mouseenter", () => { gsap.effects.right(one);});

  one.addEventListener("mouseleave", () => { gsap.effects.left(one);});
});

document.querySelectorAll("#two").forEach((two) => {
  two.addEventListener("mouseenter", () => { gsap.effects.right(two);});

  two.addEventListener("mouseleave", () => { gsap.effects.left(two);});
});

  //Tween 
    // console.log("Gsap ver", gsap.version); 
    // gsap.to("h1", {rotation: 360, duration: 3}); 
    // gsap.from("h1", {x: -160, opacity:0, duration: 1}); 
    // gsap.fromTo("h1", {opacity: 0},{opacity: 1, duration: 3});

  //Easing
    // gsap.from("h1", {x: -160, opacity:0, duration: 1, ease: "back.out(2.5)"});
    // gsap.from("#work", {y: -160, opacity:0, duration: 1, ease: "back.out(2.5)"});
    // gsap.from("nav a", {y: -160, opacity:0, duration: 1, ease: "powe2.out", stagger: 0.3});
    // gsap.from("button", {x: 160, opacity:0, duration: 1, ease: "back.out", stagger: 0.3});
    // gsap.from("#box", {x: 160, opacity:0, duration: 1, ease: "back.out", stagger: 0.3});

    // gsap.from("#work", {y: -160, opacity:0, duration: 0.3, ease: "back.out(2.5)"});

    const tl = gsap.timeline ({defaults: {ease: "power2.out"}});
      tl.from("h1", {x: -160, opacity:0, duration: 0.5, ease: "back.out(2.5)"})
      tl.from("nav a", {y: -160, opacity:0, duration: 0.3, ease: "power2.out", stagger: 0.1})
      tl.from("#toggledark", {rotation: 360, opacity:0, duration: 0.3, ease: "back.out", stagger: 0.1})
      tl.from("#refresh", {x: 160, opacity:0, duration: 0.3, ease: "back.out", stagger: 0.1})
      tl.from("#box", {x: 160, opacity:0, duration: 0.3, ease: "back.out", stagger: 0.1})
      // tl.from("#work", {y: -160, opacity:0, duration: 0.3, ease: "back.out(2.5)"});

    gsap.registerPlugin(ScrollTrigger);

    gsap.from ("#projects", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out",
        scrollTrigger: {
            trigger: "#projects",
            toggleActions: "play none none reverse",
        },
    });

    gsap.fromTo("#progressBar",
    { scaleX: 0 },
    {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            scrub: true,
        },
    });

        ScrollTrigger.create({
            trigger: "#projects",
            pin: true,
            pinSpacing: true
    });

    (() => {
      "use strict";

      const html = document.documentElement;
      const themeButton = document.querySelector("#toggledark");
      const refreshButton = document.querySelector("#refresh");
      const themeColor = document.querySelector('meta[name="theme-color"]');
      const contactForm = document.querySelector("#contactForm");
      const formStatus = document.querySelector("#formStatus");

      function updateThemeColor() {
        const isDark = html.classList.contains("dark");
        themeColor.content = isDark ? "#101010" : "#f4f0e8";
        themeButton.setAttribute("aria-pressed", String(isDark));
      }

      try {
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "light") {
          html.classList.remove("dark");
        } else if (savedTheme === "dark") {
          html.classList.add("dark");
        }
      } catch (error) {
        // Storage may be unavailable.
      }

      updateThemeColor();

      themeButton.addEventListener("click", () => {
        html.classList.toggle("dark");
        gsap.from("#toggledark", {rotation: 360, opacity:0, duration: 0.3, ease: "back.out", stagger: 0.1})

        try {
          localStorage.setItem(
            "portfolio-theme",
            html.classList.contains("dark") ? "dark" : "light"
          );
        } catch (error) {
          // Theme switching still works without storage.
        }

        updateThemeColor();
      });

      refreshButton.addEventListener("click", () => {
      const tl = gsap.timeline ({default: {ease: "power2.out"}});
        tl.from("h1", {x: -160, opacity:0, duration: 0.5, ease: "back.out(2.5)"})
        tl.from("nav a", {y: -160, opacity:0, duration: 0.3, ease: "powe2.out", stagger: 0.1})
        tl.from("#toggledark", {rotation: 360, opacity:0, duration: 0.5, ease: "back.out", stagger: 0.1})
        tl.from("#box", {x: 160, opacity:0, duration: 0.3, ease: "back.out", stagger: 0.1})
        tl.from("#work", {y: -160, opacity:0, duration: 0.3, ease: "back.out(2.5)"});
      });

      document.querySelector("#year").textContent =
        new Date().getFullYear();

      contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
          contactForm.reportValidity();
          return;
        }

        formStatus.textContent =
          "Your information is valid. Connect a backend or email service to deliver your message.";
      });
    })();