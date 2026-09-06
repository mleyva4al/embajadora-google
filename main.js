(function () {
  var singles = document.querySelectorAll(".reveal");
  var groups = document.querySelectorAll(".reveal-stagger");
  if (!singles.length && !groups.length) return;

  function revealSingle(el) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.classList.add("in-view");
      });
    });
  }

  function revealGroup(group) {
    var children = Array.prototype.slice.call(group.children);
    children.forEach(function (child, i) {
      setTimeout(function () {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            child.classList.add("in-view");
          });
        });
      }, i * 100);
    });
  }

  if (!("IntersectionObserver" in window)) {
    singles.forEach(function (el) {
      el.classList.add("in-view");
    });
    groups.forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child) {
        child.classList.add("in-view");
      });
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);
        if (el.classList.contains("reveal-stagger")) {
          revealGroup(el);
        } else {
          revealSingle(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  singles.forEach(function (el) {
    observer.observe(el);
  });
  groups.forEach(function (el) {
    observer.observe(el);
  });
})();

(function () {
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  var icon = toggle.querySelector(".icon");

  function setOpen(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (icon) icon.textContent = open ? "close" : "menu";
  }

  toggle.addEventListener("click", function () {
    setOpen(!menu.classList.contains("open"));
  });

  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      setOpen(false);
    });
  });
})();
