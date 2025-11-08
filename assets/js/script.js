const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("mainHeader");
function updateNav() {
  let scrollPos = window.scrollY + 150; 
  // Header animation on scroll
  if (window.scrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
  // Active link AND section animation
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
      section.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", updateNav);
window.addEventListener("load", updateNav);
// Show Modal on form submit
document.getElementById('admissionForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const modal = new bootstrap.Modal(document.getElementById('thankYouModal'));
  modal.show();
  this.reset();
});
//For Form
const admissionForm = document.getElementById('admissionForm');
const admissionToastEl = document.getElementById('admissionToast');
const admissionToast = new bootstrap.Toast(admissionToastEl, { delay: 5000 });
admissionForm.addEventListener('submit', function(e) {
  e.preventDefault();
  // Hide modal
  const modalEl = document.getElementById('admissionModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();
  // Show toast
  admissionToast.show();
  // Reset form
  admissionForm.reset();
});
const contactForm = document.getElementById('contactForm');
const contactToastEl = document.getElementById('contactToast');
const contactToast = new bootstrap.Toast(contactToastEl, { delay: 5000 });

contactForm.addEventListener('submit', function(e) {
  e.preventDefault(); 
  contactToast.show(); 
  this.reset(); 
});
