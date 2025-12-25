import { supabase } from '/js/supabase-config.js';

document.documentElement.classList.remove('no-js');

// About
const aboutSection = document.querySelector('.about-wrapper');
const animatedItems = document.querySelectorAll(
  '.about-wrapper, .about-avatar, .about-title, .intro, .desc, .btn-gradient2'
);

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animatedItems.forEach(el => {
        el.classList.add('animate');
      });
      aboutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

if (aboutSection) {
  aboutObserver.observe(aboutSection);
}

// Skills
const skillItems = document.querySelectorAll('.skill-item');

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const item = entry.target;
      item.classList.add('show');

      const progress = item.querySelector('.skill-progress');
      const bar = item.querySelector('.progress-bar');
      const percent = item.querySelector('.progress-percent');

      const target = parseInt(progress.dataset.progress, 10);
      let count = 0;

      bar.style.width = target + '%';

      const counter = setInterval(() => {
        if (count >= target) {
          clearInterval(counter);
        } else {
          count++;
          percent.textContent = count + '%';
        }
      }, 15);

      skillsObserver.unobserve(item);
    }
  });
}, { threshold: 0.3 });

skillItems.forEach(item => skillsObserver.observe(item));

//Services
const serviceCards = document.querySelectorAll('.service-card');

const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

serviceCards.forEach(card => {
  card.classList.add('animate-service');
  serviceObserver.observe(card);
});

// Projects
const projectCards = document.querySelectorAll('.project-card-modern');

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

projectCards.forEach(card => projectObserver.observe(card));

const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalLink = document.getElementById('modal-link');
const modalContent = document.querySelector('.modal-content');
const projectBtns = document.querySelectorAll('.project-btn');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = card.dataset.title || '';
    modalDesc.textContent = card.dataset.desc || '';
    modalLink.href = card.dataset.link || '#';
    modal.classList.add('show');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('show');
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('show');
  }
});

modalContent.addEventListener('click', (e) => e.stopPropagation());
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('show');
});

projectBtns.forEach(btn => {
  btn.addEventListener('click', (e) => e.stopPropagation());
});

// Values
const valueCards = document.querySelectorAll('.values-section .animate-on-scroll');

const valueInView = (el, offset = 100) => el.getBoundingClientRect().top <= (window.innerHeight - offset);
const showValueCard = el => el.classList.add('show');

const handleValuesScroll = () => {
  valueCards.forEach((card) => {
    if (valueInView(card, 100)) showValueCard(card);
  });
};

window.addEventListener('scroll', handleValuesScroll);
window.addEventListener('load', handleValuesScroll);

// Email JS
(function () { emailjs.init('gJKnV9pSOkR2ByhUl'); })();

const form = document.getElementById('contactFormUltra');
const submitBtn = form.querySelector("button[type='submit']");
const spinner = document.getElementById('loadingSpinnerUltra');
const alertBox = document.getElementById('formAlertUltra');

function showAlert(text, type) {
  alertBox.textContent = text;
  alertBox.className = type + ' show';
  setTimeout(() => {
    alertBox.classList.remove('show');
    alertBox.textContent = '';
  }, 4000);
}

form.querySelectorAll('.form-control').forEach(input => {
  input.addEventListener('input', () => input.classList.remove('is-invalid', 'error'));
});

function validateForm() {
  let valid = true;
  form.querySelectorAll('.form-control').forEach(input => {
    input.value = input.value.trim();
    if (!input.checkValidity()) {
      input.classList.add('is-invalid', 'error');
      valid = false;
      setTimeout(() => input.classList.remove('error'), 500);
    }
  });
  return valid;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateForm()) {
    showAlert('لطفا فیلدها را درست پر کنید ❌', 'error');
    return;
  }

  spinner.classList.remove('d-none');
  submitBtn.disabled = true;

const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const message = document.getElementById('message').value.trim();


  try {
    const { error } = await supabase.from('contacts').insert([{ name, email, message }]);
    if (error) throw error;

    await emailjs.send('service_2e5d0sr', 'template_p1xw2g7', { name, email, message, reply_to: email });
    showAlert('پیام با موفقیت ارسال شد ✅', 'success');
    form.reset();
  } catch (err) {
    console.error(err);
    showAlert('خطا در ارسال پیام ❌', 'error');
  } finally {
    spinner.classList.add('d-none');
    submitBtn.disabled = false;
  }
});

// How I Work
const methodCards = document.querySelectorAll('#methods .method-card');

const methodObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      methodObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.2});

methodCards.forEach((card) => {
  methodObserver.observe(card);
});

// Why Me
const whyCards = document.querySelectorAll('#why-me .why-me-card');

const whyMeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      whyMeObserver.unobserve(entry.target);
    }
  })
 }, {threshold: 0.2});

 whyCards.forEach((card) => {
  whyMeObserver.observe(card);
 });

 // Scroll To Top
 const scrollBtn = document.getElementById('scrollTopBtn');

 window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
 });

 scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
 });