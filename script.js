const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const dialog = document.querySelector('.project-dialog');
const projectData = {
  alfanne: { title: 'ALFANNE', kicker: 'Brand identity / Art direction', description: 'A visual identity shaped around contrast, tactility and a confident sense of place.', approach: 'PROJECT DESCRIPTION', scope: 'Brand identity - Art direction - Applications', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1800&q=85' },
  nourmind: { title: 'NOURMIND', kicker: 'Digital product / Brand identity', description: 'A calmer, clearer digital language for a product built around everyday mental wellbeing.', approach: 'PROJECT DESCRIPTION', scope: 'Strategy · Identity · Digital experience', image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1600&q=85' },
  madclub: { title: 'MADCLUB', kicker: 'Fashion / Digital / Campaign', description: 'A visual world for a fashion label with a taste for tension, movement and the unexpected.', approach: 'PROJECT DESCRIPTION', scope: 'Creative direction · Digital · Campaign', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=85' },
  viv: { title: 'VIV', kicker: 'Brand identity / Creative direction', description: 'An energetic identity system designed to make a daily ritual feel like a small event.', approach: 'PROJECT DESCRIPTION', scope: 'Positioning · Identity · Packaging', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=85' }
};

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mainNav.classList.toggle('is-open', !isOpen);
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('is-open');
  }));
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const data = projectData[card.dataset.project];
    if (!data || !dialog) return;
    document.querySelector('#dialog-kicker').textContent = data.kicker;
    document.querySelector('#dialog-title').textContent = data.title;
    document.querySelector('#dialog-description').textContent = data.description;
    document.querySelector('#dialog-approach').textContent = data.approach;
    document.querySelector('#dialog-scope').textContent = data.scope;
    const image = document.querySelector('#dialog-image');
    image.src = data.image;
    image.alt = `${data.title} project visual`;
    dialog.showModal();
  });
});

dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

document.querySelector('.contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  const requiredFields = [...form.querySelectorAll('[required]')];
  const invalid = requiredFields.find(field => !field.value.trim() || (field.type === 'email' && !field.validity.valid));
  if (invalid) {
    status.textContent = 'Please check the highlighted fields and try again.';
    invalid.focus();
    return;
  }
  status.textContent = 'Thanks. Your inquiry is ready to send — I will be in touch soon.';
  form.reset();
});

document.addEventListener('keydown', event => { if (event.key === 'Escape' && mainNav.classList.contains('is-open')) { menuToggle.click(); } });
