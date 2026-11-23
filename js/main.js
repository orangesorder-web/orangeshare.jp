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

/* FUN: replace graphic fallback cards with recent WordPress posts when the public API is available. */
document.addEventListener('DOMContentLoaded', async () => {
  const grid=document.getElementById('funLatestPosts');
  if(!grid) return;
  const endpoint='https://fun.orangeshare.jp/wp-json/wp/v2/posts?per_page=4&_embed=1';
  const controller=new AbortController();
  const cancel=setTimeout(()=>controller.abort(),6500);
  try {
    const response=await fetch(endpoint,{signal:controller.signal,mode:'cors'});
    if(!response.ok) return;
    const posts=await response.json();
    if(!Array.isArray(posts)||posts.length===0) return;
    const fallbackImages=['images/fun-cover-01.svg','images/fun-cover-02.svg','images/fun-cover-03.svg','images/fun-cover-04.svg'];
    const cards=posts.slice(0,4).map((post,i)=>{
      if(!post?.link||!/^https:\/\/fun\.orangeshare\.jp\//.test(post.link))return null;
      const thumb=post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      const htmlContent=post.content?.rendered||'';
      let firstImage=null;
      if(htmlContent){
        const temp=document.createElement('template');temp.innerHTML=htmlContent;
        firstImage=temp.content.querySelector('img')?.getAttribute('src');
      }
      let imageSrc=fallbackImages[i];
      const candidate=thumb||firstImage;
      if(candidate) {
        try {const url=new URL(candidate,endpoint);if(url.protocol==='https:' && url.hostname==='fun.orangeshare.jp') imageSrc=url.href;}catch(e){}
      }
      const a=document.createElement('a');a.className='fun-card';a.href=post.link;a.target='_blank';a.rel='noopener';
      const figure=document.createElement('div');figure.className='fun-card-image';
      const img=document.createElement('img');img.src=imageSrc;img.alt='';img.loading='lazy';figure.appendChild(img);
      const copy=document.createElement('div');copy.className='fun-card-copy';
      const meta=document.createElement('span');meta.textContent='ORANGESHARE FUN';
      const title=document.createElement('h3');const decode=document.createElement('textarea');decode.innerHTML=post.title?.rendered||'FUNの新着記事';title.textContent=decode.value;
      copy.append(meta,title);a.append(figure,copy);return a;
    }).filter(Boolean);
    if(cards.length) grid.replaceChildren(...cards);
  } catch(e) { /* Keep designed fallbacks when FUN is not yet available. */ }
  finally {clearTimeout(cancel);}
});
