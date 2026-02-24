// Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // Nav shrink on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
      nav.style.padding = window.scrollY > 80 ? '1rem 4rem' : '1.5rem 4rem';
    });


    // Active nav highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(sec => sectionObserver.observe(sec));

    // Visitor Counter using persistent storage
    async function updateVisitorCount() {
      const countEl = document.getElementById('visitor-count');
      try {
        let current = 0;
        try {
          const result = await window.storage.get('visitor_count', true);
          current = parseInt(result.value) || 0;
        } catch (e) {
          current = 0;
        }
        const updated = current + 1;
        await window.storage.set('visitor_count', String(updated), true);
        animateCount(countEl, 0, updated, 900);
      } catch (err) {
        countEl.textContent = '—';
      }
    }

    function animateCount(el, from, to, duration) {
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(from + (to - from) * eased).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    updateVisitorCount();