// OrangeShare Studio V11 Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const open = mobileDrawer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    mobileDrawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  const filterPills = document.querySelectorAll('.filter-pill');
  const caseArticles = document.querySelectorAll('.case-article');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-filter');
      caseArticles.forEach(art => {
        if (cat === 'all' || art.getAttribute('data-area') === cat) {
          art.classList.remove('hidden');
        } else {
          art.classList.add('hidden');
        }
      });
    });
  });
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    if (q) {
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => {
          i.classList.remove('active');
          i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('active');
          q.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
  const form = document.getElementById('contactForm');
  const result = document.getElementById('formResult');
  if (form && result) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const company = document.getElementById('company').value.trim();
      const name = document.getElementById('name').value.trim();
      result.hidden = false;
      result.textContent = `${company} ${name} 様、お問い合わせありがとうございます。（サンプルプレビュー動作）`;
    });
  }
});
