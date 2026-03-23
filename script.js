// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => obs.observe(r));

// FAQ toggle
function toggleFaq(btn) {
  const item = btn.parentElement;
  const answer = item.querySelector('.faq-a');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-a').style.maxHeight = null;
  });
  if (!isOpen) {
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// Waitlist — Formspree
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('wl-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('wl-email').value;
    const input = document.getElementById('wl-email');

    if (!email || !email.includes('@')) {
      input.style.borderColor = '#ef4444';
      return;
    }

    const btn = form.querySelector('.waitlist-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch('https://formspree.io/f/mnjgkvyl', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        form.style.display = 'none';
        document.getElementById('waitlist-success').style.display = 'block';
      } else {
        input.style.borderColor = '#ef4444';
        btn.textContent = 'Try again';
        btn.disabled = false;
      }
    } catch (err) {
      input.style.borderColor = '#ef4444';
      btn.textContent = 'Try again';
      btn.disabled = false;
    }
  });
});