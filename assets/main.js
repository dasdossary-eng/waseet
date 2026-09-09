document.addEventListener('DOMContentLoaded', function(){

  var toggle = document.querySelector('.navtoggle');
  if(toggle){
    toggle.addEventListener('click', function(){
      document.querySelector('.navlinks').classList.toggle('open');
    });
  }

  document.querySelectorAll('.chip').forEach(function(chip){
    chip.addEventListener('click', function(){
      document.querySelectorAll('.chip').forEach(function(c){ c.classList.remove('active'); });
      chip.classList.add('active');
    });
  });

  var form = document.getElementById('quoteForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();

      // Build a real WhatsApp message from the form and open it.
      // Previously this handler only showed the success message locally —
      // nothing was ever actually sent anywhere.
      var company = document.getElementById('company');
      var contact = document.getElementById('contact');
      var phone = document.getElementById('phone');
      var qty = document.getElementById('qty');
      var freq = document.getElementById('freq');
      var notes = document.getElementById('notes');
      var source = document.getElementById('source');
      var activeChip = form.querySelector('.chip.active');

      var lines = ['New quote request / طلب عرض سعر جديد'];
      if(company && company.value) lines.push('Company: ' + company.value);
      if(contact && contact.value) lines.push('Contact: ' + contact.value);
      if(phone && phone.value) lines.push('Phone: ' + phone.value);
      if(activeChip) lines.push('Category: ' + activeChip.dataset.value);
      if(qty && qty.value) lines.push('Quantity: ' + qty.value);
      if(freq && freq.options.length) lines.push('Order type: ' + freq.options[freq.selectedIndex].text);
      if(source && source.value) lines.push('Source: ' + source.value);
      if(notes && notes.value) lines.push('Notes: ' + notes.value);

      var waLink = 'https://wa.me/966591342020?text=' + encodeURIComponent(lines.join('\n'));
      window.open(waLink, '_blank');

      var msg = document.getElementById('successMsg');
      if(msg) msg.classList.add('show');
      form.reset();
      document.querySelectorAll('.chip').forEach(function(c){ c.classList.remove('active'); });
    });
  }
});

function prefillQuote(category){
  document.querySelectorAll('.chip').forEach(function(c){
    c.classList.toggle('active', c.dataset.value === category);
  });
  var quote = document.getElementById('quote');
  if(quote) quote.scrollIntoView({behavior:'smooth'});
  var company = document.getElementById('company');
  if(company) company.focus({preventScroll:true});
}
