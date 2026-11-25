
/* ==========================================================================
   Chamber Membership Join Page
   ========================================================================== */

(function () {
  'use strict';

  // 1. Set the timestamp when the page loads
  var timestampField = document.getElementById('timestamp');

  if (timestampField) {
    timestampField.value = new Date().toLocaleString();
  }

  // 2. Open membership dialogs
  var openers = document.querySelectorAll('[data-open-dialog]');

  openers.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      var dialog = document.getElementById(link.dataset.openDialog);

      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    });
  });

  // 3. Close dialogs and select membership
  var closers = document.querySelectorAll('[data-close-dialog]');

  closers.forEach(function (element) {
    element.addEventListener('click', function (event) {
      var dialog = element.closest('dialog');

      if (element.tagName === 'A') {
        event.preventDefault();

        var target = document.querySelector(element.getAttribute('href'));

        if (dialog) {
          dialog.close();
        }

        if (target) {
          target.checked = true;
          target.focus();
        }

      } else if (dialog) {
        dialog.close();
      }
    });
  });

  // 4. Close dialog when clicking outside its content
  document.querySelectorAll('dialog').forEach(function (dialog) {
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });

})();
