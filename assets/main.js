document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".navtoggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.querySelector(".navlinks").classList.toggle("open");
    });
  }

  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      document.querySelectorAll(".chip").forEach(function (c) {
        c.classList.remove("active");
      });
      chip.classList.add("active");
    });
  });

  var form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Build a real WhatsApp message from the form and open it.
      // Previously this handler only showed the success message locally —
      // nothing was ever actually sent anywhere.
      var company = document.getElementById("company");
      var contact = document.getElementById("contact");
      var phone = document.getElementById("phone");
      var qty = document.getElementById("qty");
      var freq = document.getElementById("freq");
      var notes = document.getElementById("notes");
      var source = document.getElementById("source");
      var activeChip = form.querySelector(".chip.active");

      var lines = ["New quote request / طلب عرض سعر جديد"];
      if (company && company.value) lines.push("Company: " + company.value);
      if (contact && contact.value) lines.push("Contact: " + contact.value);
      if (phone && phone.value) lines.push("Phone: " + phone.value);
      if (activeChip) lines.push("Category: " + activeChip.dataset.value);
      if (qty && qty.value) lines.push("Quantity: " + qty.value);
      if (freq && freq.options.length)
        lines.push("Order type: " + freq.options[freq.selectedIndex].text);
      if (source && source.value) lines.push("Source: " + source.value);
      if (notes && notes.value) lines.push("Notes: " + notes.value);

      var waLink = "https://wa.me/966591342020?text=" + encodeURIComponent(lines.join("\n"));
      window.open(waLink, "_blank");

      var msg = document.getElementById("successMsg");
      if (msg) msg.classList.add("show");
      form.reset();
      document.querySelectorAll(".chip").forEach(function (c) {
        c.classList.remove("active");
      });
    });
  }
  var supplierForm = document.getElementById("supplierForm");
  if (supplierForm) {
    function buildSupplierMessage() {
      var get = function (id) {
        var el = document.getElementById(id);
        return el ? el.value : "";
      };
      var lines = ["New supplier submission / عرض مورّد جديد"];
      if (get("vCompany")) lines.push("Company: " + get("vCompany"));
      if (get("vContact")) lines.push("Contact: " + get("vContact"));
      if (get("vPhone")) lines.push("Phone: " + get("vPhone"));
      if (get("vProduct")) lines.push("Product/specs: " + get("vProduct"));
      if (get("vPrice")) lines.push("Price: " + get("vPrice"));
      if (get("vMoq")) lines.push("Minimum order: " + get("vMoq"));
      if (get("vCity")) lines.push("Location: " + get("vCity"));
      var source = document.getElementById("vSource");
      if (source && source.options.length)
        lines.push("Imported/local: " + source.options[source.selectedIndex].text);
      if (get("vNotes")) lines.push("Notes: " + get("vNotes"));
      return lines.join("\n");
    }

    function showSupplierSuccess() {
      var msg = document.getElementById("supplierSuccessMsg");
      if (msg) msg.classList.add("show");
    }

    var waBtn = document.getElementById("supplierSendWa");
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        var text = buildSupplierMessage();
        window.open("https://wa.me/966591342020?text=" + encodeURIComponent(text), "_blank");
        showSupplierSuccess();
      });
    }

    var emailBtn = document.getElementById("supplierSendEmail");
    if (emailBtn) {
      emailBtn.addEventListener("click", function () {
        var text = buildSupplierMessage();
        var subject = encodeURIComponent("New supplier submission - Bin Sharida");
        window.location.href =
          "mailto:abdullah.sharida@gmail.com?subject=" +
          subject +
          "&body=" +
          encodeURIComponent(text);
        showSupplierSuccess();
      });
    }
  }
  var calcProduct = document.getElementById("calcProduct");
  var calcQty = document.getElementById("calcQty");
  var calcTotal = document.getElementById("calcTotal");
  var calcOrderBtn = document.getElementById("calcOrderBtn");
  if (calcProduct && calcQty && calcTotal) {
    function updateCalc() {
      var parts = calcProduct.value.split("|");
      var price = parseFloat(parts[0]);
      var qty = parseInt(calcQty.value, 10);
      if (!qty || qty < 1) qty = 1;
      var total = price * qty;
      var suffix = calcTotal.textContent.replace(/[0-9,]/g, "").trim();
      calcTotal.textContent = total.toLocaleString() + " " + suffix;
    }
    calcProduct.addEventListener("change", updateCalc);
    calcQty.addEventListener("input", updateCalc);

    if (calcOrderBtn) {
      calcOrderBtn.addEventListener("click", function () {
        var parts = calcProduct.value.split("|");
        var price = parseFloat(parts[0]);
        var name = parts[1];
        var qty = parseInt(calcQty.value, 10);
        if (!qty || qty < 1) qty = 1;
        var total = price * qty;
        var text =
          "New order / طلب جديد\n" +
          "Product: " + name + "\n" +
          "Quantity: " + qty + " carton(s)\n" +
          "Estimated total: " + total;
        window.open("https://wa.me/966591342020?text=" + encodeURIComponent(text), "_blank");
      });
    }
  }
});

function prefillQuote(category) {
  document.querySelectorAll(".chip").forEach(function (c) {
    c.classList.toggle("active", c.dataset.value === category);
  });
  var quote = document.getElementById("quote");
  if (quote) quote.scrollIntoView({ behavior: "smooth" });
  var company = document.getElementById("company");
  if (company) company.focus({ preventScroll: true });
}
