document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');

    status.textContent = 'Sending...';
    status.className = 'form-status';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        form.reset();
        status.textContent = "Thanks! I'll get back to you soon.";
        status.className = 'form-status success';
      } else {
        status.textContent = 'Something went wrong. Try again or reach out on social.';
        status.className = 'form-status error';
      }
    } catch {
      status.textContent = 'Something went wrong. Try again or reach out on social.';
      status.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
    }
  });
});
