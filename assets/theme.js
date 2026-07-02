// I WIN MY WAY — theme.js
// Ported from the static site.js: sticky nav, reveal-on-scroll, mobile menu.
// The cosmetic EN/SR toggle from the static build is replaced by the real
// Shopify `localization` form rendered server-side in sections/header.liquid.
(function () {
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('stuck', window.scrollY > 40);
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.rv').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.rv').forEach(function (el) {
      el.classList.add('in');
    });
  }

  var burger = document.querySelector('.burger');
  var mm = document.querySelector('.mmenu');
  if (burger && mm) {
    burger.addEventListener('click', function () {
      mm.classList.add('open');
    });
    mm.querySelectorAll('.x,a').forEach(function (a) {
      a.addEventListener('click', function () {
        mm.classList.remove('open');
      });
    });
  }
})();
