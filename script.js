// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Pop-out booking actions (phone + email)
(function(){
  var BUSINESS_PHONE_E164 = '+17246127966';
  var BUSINESS_PHONE_DISPLAY = '(724) 612-7966';
  var BUSINESS_EMAIL = 'support@johnnyasmobilecarwashdetail.com';

  function buildMailto(serviceName){
    var subject = encodeURIComponent('Booking Request - ' + serviceName);
    var bodyLines = [
      'Service: ' + serviceName,
      'Name:',
      'Phone:',
      'Vehicle:',
      'Preferred date/time:',
      'Location:',
    ];
    var body = encodeURIComponent(bodyLines.join('\n'));
    return 'mailto:' + BUSINESS_EMAIL + '?subject=' + subject + '&body=' + body;
  }

  function closeAllPopouts(){
    document.querySelectorAll('.book-pop').forEach(function(pop){
      var parent = pop.parentElement;
      if(parent){ parent.removeChild(pop); }
    });
  }

  function createPopout(serviceName){
    var wrapper = document.createElement('span');
    wrapper.className = 'book-pop';

    var phone = document.createElement('a');
    phone.className = 'btn-mini btn-phone';
    phone.href = 'tel:' + BUSINESS_PHONE_E164;
    phone.setAttribute('aria-label', 'Call ' + BUSINESS_PHONE_DISPLAY + ' to book ' + serviceName);
    phone.textContent = 'Call';

    var email = document.createElement('a');
    email.className = 'btn-mini btn-email';
    email.href = buildMailto(serviceName);
    email.setAttribute('aria-label', 'Email about ' + serviceName);
    email.textContent = 'Email';

    wrapper.appendChild(phone);
    wrapper.appendChild(email);
    return wrapper;
  }

  function handleTriggerClick(event){
    event.preventDefault();
    var trigger = event.currentTarget;
    var service = trigger.getAttribute('data-service') || 'Service';

    // If already open next to this trigger, close it
    var existing = trigger.nextElementSibling;
    if(existing && existing.classList.contains('book-pop')){
      existing.remove();
      return;
    }

    // Close others and open here
    closeAllPopouts();
    var pop = createPopout(service);
    trigger.insertAdjacentElement('afterend', pop);
  }

  // Delegate clicks outside to close
  document.addEventListener('click', function(e){
    var isTrigger = e.target.closest && e.target.closest('.book-trigger');
    var isPop = e.target.closest && e.target.closest('.book-pop');
    if(!isTrigger && !isPop){ closeAllPopouts(); }
  });

  // Wire up all triggers
  document.querySelectorAll('.book-trigger').forEach(function(btn){
    btn.addEventListener('click', handleTriggerClick);
  });
})();
