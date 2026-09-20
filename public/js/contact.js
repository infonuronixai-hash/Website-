document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  if (!form || !alertBox) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        form.hidden = true;
        alertBox.innerHTML =
          '<div class="alert alert-success">Thank you, ' +
          escapeHtml(result.name) +
          '! Your enquiry has been received. Our team will get back to you shortly.</div>';
      } else {
        alertBox.innerHTML =
          '<div class="alert alert-error">' +
          (result.errors || ['Something went wrong. Please try again.'])
            .map(escapeHtml)
            .join('<br />') +
          '</div>';
        submitBtn.disabled = false;
      }
    } catch (err) {
      alertBox.innerHTML =
        '<div class="alert alert-error">Something went wrong. Please try again later.</div>';
      submitBtn.disabled = false;
    }
  });
});

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
