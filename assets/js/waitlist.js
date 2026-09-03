// Waitlist signup — posts to Kit (ConvertKit) form 9342087.
// Applies to every form.waitlist-form on the page.
(function () {
  var forms = Array.prototype.slice.call(document.querySelectorAll('form.waitlist-form'));

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button');
      var input = form.querySelector('input[name="email_address"]');
      if (!input || !input.value) return;

      btn.textContent = '...';
      btn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'email_address=' + encodeURIComponent(input.value),
        mode: 'no-cors'
      }).then(function () {
        var ok = document.createElement('p');
        ok.className = 'waitlist-success';
        ok.textContent = "You're on the list. Check your email.";
        form.parentNode.insertBefore(ok, form);
        form.style.display = 'none';
      }).catch(function () {
        btn.textContent = 'Try again';
        btn.disabled = false;
      });
    });
  });
})();
