// ============================================================
// DATA — Content System (edit copy here)
// ============================================================
const CONTENT = {
  hirer: {
    hero: {
      eyebrow: '',
      headline: 'Tell us what you need. We’ll send you a shortlist you can trust.',
      sub: 'You’re not looking for more options. You’re looking for one operator who can deliver.\nWorkbase screens for quality and AI-ready workflow, then matches for fit.',
      chips: ['Quality-screened', 'AI-native workflow', 'Shortlist-first'],
      primaryCta: 'Get Early Access →',
      secondaryCta: 'See the Operator Tracks ↓',
      microcopy: 'Phased onboarding. We’re moving carefully so your first shortlist is worth your time.',
      helper: 'For teams hiring across Web, Design, Video, Motion, Marketing Ops, and Data &amp; Automation.',
    },
    process: {
      title: 'Here’s how you get a stronger hire, faster.',
      sub: '',
      steps: [
        { title: 'Describe the role', desc: 'Tell us the outcome, timeline, and what good looks like.' },
        { title: 'We screen for quality', desc: 'No noisy profiles. Only operators who meet the standard.' },
        { title: 'You get a shortlist', desc: 'Fewer names. Better fit. Faster decisions.' },
      ],
    },
    midCta: {
      headline: 'Join early and help shape the next standard for digital hiring.',
      sub: 'We\'re onboarding in phases and prioritizing teams that value quality, fit, and serious execution.',
      btn: 'Get Early Access →',
    },
    problemIntro: 'You don’t have a talent shortage. You have a filtering problem.',
    problemBody: [
      'Most platforms give you volume, then leave you to do the hard part: filtering.',
      'Workbase does the filtering upfront so you spend your time interviewing serious options, not chasing maybes.'
    ],
    tracksTitle: 'Six tracks. One standard.',
    tracksSubtitle: 'Pick the track you’re hiring for. We’ll handle the filtering.',
    tracksHelper: 'Pick the track you’re hiring for. We’ll handle the filtering.',
    trustEmphasis: 'Built for teams that care about hiring quality, not marketplace volume.',
    form: {
      eyebrow: 'Early access for hiring',
      headline: 'Ready to stop browsing and start hiring?',
      body: 'Join early access and we’ll onboard you in phases.\nWhen your slot opens, you’ll be able to hire from six AI-native operator tracks.',
      microcopy: 'No spam. Early-access updates only. Phased onboarding.',
      submitBtn: 'Get Early Access →',
      successMsg: 'You’re on the list. We’ll reach out when your early access slot opens.',
    },
    faqOrder: [1, 2, 3, 4, 5, 6],
  },
  talent: {
    hero: {
      eyebrow: '',
      headline: 'If you can deliver, you shouldn’t have to beg for attention.',
      sub: 'Workbase is built for operators who take their craft seriously and use AI to move faster.\nWe screen for quality, then help you get matched to teams that value it.',
      chips: ['Skill-first', 'AI-enabled execution', 'Serious opportunities'],
      primaryCta: 'Join Early Access →',
      secondaryCta: 'See the Operator Tracks ↓',
      microcopy: 'Phased onboarding. We’re curating early so the work stays high-quality.',
      helper: 'For operators with strong craft and AI-enabled workflows across six tracks.',
    },
    process: {
      title: 'How you get seen for quality.',
      sub: '',
      steps: [
        { title: 'Apply to your track', desc: 'Choose where you fit and submit your profile.' },
        { title: 'Pass screening', desc: 'We check for real execution, not talk.' },
        { title: 'Get matched to better work', desc: 'Not endless gigs. Serious teams. Clear expectations.' },
      ],
    },
    midCta: {
      headline: 'Join early and position yourself for higher-standard opportunities.',
      sub: 'We\'re onboarding operators in phases and prioritizing professionals with strong craft and AI-native workflows.',
      btn: 'Get Early Access →',
    },
    problemIntro: 'You’re not overpriced. You’re just in the wrong room.',
    problemBody: [
      'Crowded platforms reward volume and low pricing.',
      'Workbase is building a smaller room with higher standards, so quality work gets the visibility it deserves.'
    ],
    tracksTitle: 'Six tracks. One standard.',
    tracksSubtitle: 'Pick your track. If you meet the standard, you’ll be seen.',
    tracksHelper: 'Pick your track. If you meet the standard, you’ll be seen.',
    trustEmphasis: 'Built for operators who want to be evaluated on execution quality, not platform noise.',
    form: {
      eyebrow: 'Early access for operators',
      headline: 'Want serious teams to find you?',
      body: 'Join early access. Choose your operator track.\nIf you meet the standard, you’ll get visibility where it actually matters.',
      microcopy: 'No spam. Early-access updates only. Phased onboarding.',
      submitBtn: 'Join Early Access →',
      successMsg: 'You’re on the list. We’ll reach out when early access opens for your track.',
    },
    faqOrder: [1, 2, 3, 4, 5, 6],
  }
};

// FAQ content (1-indexed matching prompt spec)
const FAQ_ITEMS = {
  1: {
    q: 'Is Workbase live yet?',
    a: 'Not yet. Workbase is currently in early validation, and access will open in phases.'
  },
  2: {
    q: 'Who can join early access?',
    a: 'Hiring teams, digital operators, and potential ecosystem partners can join the waitlist.'
  },
  3: {
    q: 'Which operator tracks are available for early access?',
    a: 'Workbase is opening early access across six operator tracks: Web, Design, Video, Motion, Marketing Ops, and Data & Automation.'
  },
  4: {
    q: 'How does Workbase vet talent?',
    a: 'Workbase is being built around quality screening and role-fit criteria. Full screening details will be shared as onboarding opens.'
  },
  5: {
    q: 'Does Workbase only accept AI-native operators?',
    a: 'Workbase prioritizes operators who know their craft and can use AI tools responsibly to improve speed, consistency, and execution quality. The standard is not AI hype, but stronger outcomes.'
  },
  6: {
    q: 'Does AI use replace core skill requirements?',
    a: 'No. Workbase\'s standard is skill first, with AI used as a workflow advantage, not a substitute for competence.'
  },
};

// ============================================================
// STATE
// ============================================================
let audienceMode = 'hirer';
let isAnimating = false;

// Submit label helper (role-aware)
function getSubmitLabel(role) {
  if (role === 'talent') return 'Join Early Access →';
  if (role === 'partner') return 'Request Partner Access';
  return 'Get Early Access →';
}

// ============================================================
// GSAP SETUP
// ============================================================
gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================================
// AUDIENCE TOGGLE LOGIC
// ============================================================
function setAudienceMode(mode, animate = true) {
  if (mode === audienceMode && animate) return;
  audienceMode = mode;

  const data = CONTENT[mode];

  // Update toggle buttons
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    const isActive = btn.dataset.mode === mode;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  const duration = (animate && !prefersReducedMotion) ? 0.18 : 0;
  const yAmt = 10;

  const dynamicEls = {
    eyebrow: document.getElementById('hero-eyebrow'),
    headline: document.getElementById('hero-headline'),
    sub: document.getElementById('hero-sub'),
    chips: document.getElementById('hero-chips'),
    primaryCta: document.getElementById('hero-primary-cta'),
    secondaryCta: document.getElementById('hero-secondary-cta'),
    microcopy: document.getElementById('hero-microcopy'),
    helper: document.getElementById('hero-helper'),
    processTitle: document.getElementById('process-title'),
    processSub: document.getElementById('process-sub'),
    step1Title: document.getElementById('step1-title'),
    step1Desc: document.getElementById('step1-desc'),
    step2Title: document.getElementById('step2-title'),
    step2Desc: document.getElementById('step2-desc'),
    step3Title: document.getElementById('step3-title'),
    step3Desc: document.getElementById('step3-desc'),
    midCTAHeadline: document.getElementById('mid-cta-headline'),
    midCTASub: document.getElementById('mid-cta-sub'),
    midCTABtn: document.getElementById('mid-cta-btn'),
    problemIntro: document.getElementById('problem-intro'),
    problemHeadline: document.querySelector('.problem-visual .pv-headline'),
    problemBodyOne: document.querySelector('.problem-visual .pv-body:nth-of-type(1)'),
    problemBodyTwo: document.querySelector('.problem-visual .pv-body:nth-of-type(2)'),
    tracksTitle: document.querySelector('.tracks-header .section-title'),
    tracksSubtitle: document.querySelector('.tracks-header .section-subtitle'),
    tracksHelper: document.getElementById('tracks-helper'),
    trustEmphasis: document.getElementById('trust-emphasis'),
    formEyebrow: document.getElementById('form-eyebrow'),
    formHeadline: document.getElementById('form-headline'),
    formBody: document.getElementById('form-body'),
    formMicrocopy: document.getElementById('form-microcopy'),
    formSubmitBtn: document.getElementById('form-submit-btn'),
  };

  const updateContent = () => {
    const h = data.hero;
    if (dynamicEls.eyebrow) dynamicEls.eyebrow.textContent = h.eyebrow;
    dynamicEls.headline.textContent = h.headline;
    dynamicEls.sub.textContent = h.sub;
    dynamicEls.chips.innerHTML = h.chips.map(c => `<span class="chip">${c}</span>`).join('');
    dynamicEls.primaryCta.textContent = h.primaryCta;
    dynamicEls.secondaryCta.textContent = h.secondaryCta;
    dynamicEls.microcopy.textContent = h.microcopy;
    dynamicEls.helper.innerHTML = h.helper;

    const p = data.process;
    dynamicEls.processTitle.textContent = p.title;
    dynamicEls.processSub.textContent = p.sub;
    dynamicEls.step1Title.textContent = p.steps[0].title;
    dynamicEls.step1Desc.textContent = p.steps[0].desc;
    dynamicEls.step2Title.textContent = p.steps[1].title;
    dynamicEls.step2Desc.textContent = p.steps[1].desc;
    dynamicEls.step3Title.textContent = p.steps[2].title;
    dynamicEls.step3Desc.textContent = p.steps[2].desc;

    const m = data.midCta;
    dynamicEls.midCTAHeadline.textContent = m.headline;
    dynamicEls.midCTASub.textContent = m.sub;
    dynamicEls.midCTABtn.textContent = m.btn;

    dynamicEls.problemIntro.textContent = data.problemIntro;
    if (dynamicEls.problemHeadline) dynamicEls.problemHeadline.textContent = data.problemIntro;
    if (dynamicEls.problemBodyOne) dynamicEls.problemBodyOne.textContent = data.problemBody[0];
    if (dynamicEls.problemBodyTwo) dynamicEls.problemBodyTwo.textContent = data.problemBody[1];
    if (dynamicEls.tracksTitle) dynamicEls.tracksTitle.textContent = data.tracksTitle;
    if (dynamicEls.tracksSubtitle) dynamicEls.tracksSubtitle.textContent = data.tracksSubtitle;
    dynamicEls.tracksHelper.textContent = data.tracksHelper;
    dynamicEls.trustEmphasis.textContent = data.trustEmphasis;

    const f = data.form;
    dynamicEls.formEyebrow.textContent = f.eyebrow;
    dynamicEls.formHeadline.textContent = f.headline;
    dynamicEls.formBody.textContent = f.body;
    dynamicEls.formMicrocopy.textContent = f.microcopy;
    dynamicEls.formSubmitBtn.textContent = f.submitBtn;

    // Update hidden field
    document.getElementById('field-audience-mode').value = mode;

    // Sync form role select
    const roleSelect = document.getElementById('field-role');
    if (mode === 'hirer' && roleSelect.value !== 'hirer') {
      roleSelect.value = 'hirer';
    } else if (mode === 'talent' && roleSelect.value !== 'talent') {
      roleSelect.value = 'talent';
    }
    updateFormFields(roleSelect.value);

    // Update sticky CTA label (mobile)
    const stickyText = document.getElementById('sticky-cta-text');
    if (stickyText) stickyText.textContent = data.form.submitBtn;

    // Re-render FAQ
    renderFAQ(mode);
  };

  if (animate && !prefersReducedMotion) {
    const targets = Object.values(dynamicEls).filter(Boolean);
    gsap.to(targets, {
      opacity: 0, y: -yAmt, duration,
      onComplete: () => {
        updateContent();
        gsap.to(targets, { opacity: 1, y: 0, duration, stagger: 0.015 });
      }
    });
  } else {
    updateContent();
  }
}

// ============================================================
// FAQ RENDER
// ============================================================
function renderFAQ(mode) {
  const order = CONTENT[mode].faqOrder;
  const list = document.getElementById('faq-list');
  list.innerHTML = '';

  order.forEach((idx, i) => {
    const item = FAQ_ITEMS[idx];
    const div = document.createElement('div');
    div.className = 'faq-item';
    div.setAttribute('role', 'listitem');
    div.innerHTML = `
      <button class="faq-trigger" aria-expanded="false" aria-controls="faq-body-${i}">
        <span>${item.q}</span>
        <div class="faq-icon" aria-hidden="true">
          <svg viewBox="0 0 10 10" fill="none">
            <path d="M5 1V9M1 5H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
      </button>
      <div class="faq-body" id="faq-body-${i}" role="region">
        <div class="faq-body-inner">${item.a}</div>
      </div>
    `;

    // Accordion interaction
    const btn = div.querySelector('.faq-trigger');
    const body = div.querySelector('.faq-body');
    const inner = div.querySelector('.faq-body-inner');

    btn.addEventListener('click', () => {
      const isOpen = div.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-body').style.maxHeight = '0';
        el.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        div.classList.add('open');
        body.style.maxHeight = inner.scrollHeight + 32 + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    list.appendChild(div);
  });
}

// ============================================================
// FORM CONDITIONAL FIELDS
// ============================================================
function updateFormFields(role) {
  document.getElementById('hirer-fields').classList.toggle('visible', role === 'hirer');
  document.getElementById('talent-fields').classList.toggle('visible', role === 'talent');
  document.getElementById('partner-fields').classList.toggle('visible', role === 'partner');

  // Update required states
  const companyField = document.getElementById('field-company');
  const trackField = document.getElementById('field-track');
  companyField.required = role === 'hirer';
  trackField.required = role === 'talent';

  // Update submit button label based on selected role (not audience mode)
  document.getElementById('form-submit-btn').textContent = getSubmitLabel(role);
}

// ============================================================
// FORM VALIDATION + SUBMIT
// ============================================================
function validateForm() {
  let valid = true;

  const clearErr = (id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  };
  const setErr = (inputId, errId, msg) => {
    const input = document.getElementById(inputId);
    const err = document.getElementById(errId);
    if (input) input.classList.add('error');
    if (err) err.textContent = msg;
    valid = false;
  };
  const clearInputErr = (id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('error');
  };

  ['field-name', 'field-email', 'field-company', 'field-track'].forEach(id => clearInputErr(id));
  ['err-name', 'err-email', 'err-company', 'err-track'].forEach(id => clearErr(id));

  const name = document.getElementById('field-name').value.trim();
  if (!name) setErr('field-name', 'err-name', 'Full name is required.');

  const email = document.getElementById('field-email').value.trim();
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) setErr('field-email', 'err-email', 'Email address is required.');
  else if (!emailRx.test(email)) setErr('field-email', 'err-email', 'Please enter a valid email address.');

  const role = document.getElementById('field-role').value;
  if (role === 'hirer') {
    const company = document.getElementById('field-company').value.trim();
    if (!company) setErr('field-company', 'err-company', 'Company name is required for hirers.');
  }

  if (role === 'talent') {
    const track = document.getElementById('field-track').value;
    if (!track) setErr('field-track', 'err-track', 'Please select your operator track.');
  }

  return valid;
}

function buildPayload() {
  const role = document.getElementById('field-role').value;
  const payload = {
    audienceMode,
    role,
    fullName: document.getElementById('field-name').value.trim(),
    email: document.getElementById('field-email').value.trim(),
    whatsapp: document.getElementById('field-whatsapp').value.trim(),
    note: document.getElementById('field-note').value.trim(),
  };

  if (role === 'hirer') {
    payload.company = document.getElementById('field-company').value.trim();
    payload.hiringFor = document.getElementById('field-hiring-for').value.trim();
  }
  if (role === 'talent') {
    payload.track = document.getElementById('field-track').value;
    payload.aiTools = document.getElementById('field-ai-tools').value.trim();
    payload.portfolio = document.getElementById('field-portfolio').value.trim();
  }
  if (role === 'partner') {
    payload.organization = document.getElementById('field-org').value.trim();
    payload.partnershipInterest = document.getElementById('field-partnership').value.trim();
  }

  return payload;
}

async function handleSubmit(e) {
  e.preventDefault();
  if (!validateForm()) return;

  const payload = buildPayload();
  const btn = document.getElementById('form-submit-btn');
  const errDiv = document.getElementById('form-error-general');
  errDiv.style.display = 'none';
  btn.disabled = true;
  btn.textContent = 'Submitting…';

  try {
    // REPLACE: swap console.log with your real endpoint, e.g.:
    // const res = await fetch('https://your-api.com/waitlist', { method:'POST', body: JSON.stringify(payload), headers:{'Content-Type':'application/json'} });
    // if (!res.ok) throw new Error('Network error');
    console.log('[Workbase Waitlist Payload]', payload);
    await new Promise(r => setTimeout(r, 900)); // mock delay

    // Success
    document.getElementById('form-content').style.display = 'none';
    const successEl = document.getElementById('form-success');
    successEl.style.display = 'block';
    const successMode = audienceMode === 'talent' ? 'talent' : payload.role;
    document.getElementById('success-message').textContent =
      CONTENT[successMode]?.form?.successMsg ||
      CONTENT['hirer'].form.successMsg;

    if (!prefersReducedMotion) {
      gsap.from(successEl, { opacity: 0, y: 16, duration: 0.4, ease: 'power2.out' });
    }
  } catch (err) {
    errDiv.textContent = 'Something went wrong. Please try again or email us at hello@workbase.africa';
    errDiv.style.display = 'block';
    btn.disabled = false;
    btn.textContent = CONTENT[audienceMode]?.form?.submitBtn || 'Get Early Access →';
  }
}

// ============================================================
// HERO LOAD ANIMATION
// ============================================================
function initHeroAnimation() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.fade-up').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
    return;
  }

  const heroEls = [
    '#hero-eyebrow', '#hero-headline', '#hero-sub',
    '#hero-chips', '.hero-actions', '#hero-microcopy', '#hero-helper'
  ].map(s => document.querySelector(s)).filter(Boolean);

  gsap.set(heroEls, { opacity: 0, y: 28 });
  gsap.set('#hero-media', { opacity: 0, scale: 0.97 });

  gsap.to(heroEls, {
    opacity: 1, y: 0,
    duration: 0.55,
    stagger: 0.08,
    ease: 'power3.out',
    delay: 0.15
  });

  gsap.to('#hero-media', {
    opacity: 1, scale: 1,
    duration: 0.7,
    ease: 'power3.out',
    delay: 0.5
  });
}

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
  if (prefersReducedMotion) return;

  // Generic fade-up for .fade-up elements (scroll-triggered)
  gsap.utils.toArray('.fade-up').forEach(el => {
    // Skip hero elements (handled separately)
    if (el.closest('#hero')) return;

    gsap.fromTo(el,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Process steps stagger
  gsap.utils.toArray('#process-steps .process-step').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0,
        duration: 0.5,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: '#process-steps',
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Mid CTA fade
  gsap.fromTo('.mid-cta-inner',
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.mid-cta', start: 'top 80%', toggleActions: 'play none none none' }
    }
  );

  // Problem visual parallax
  gsap.to('.problem-visual', {
    y: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.problem-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    }
  });

  // Comparison columns
  gsap.fromTo('.comp-col.old',
    { opacity: 0, x: -32 },
    {
      opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '.comparison-grid', start: 'top 82%', toggleActions: 'play none none none' }
    }
  );
  gsap.fromTo('.comp-col.new',
    { opacity: 0, x: 32 },
    {
      opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '.comparison-grid', start: 'top 82%', toggleActions: 'play none none none' }
    }
  );

  // Tracks grid stagger
  gsap.utils.toArray('.track-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        duration: 0.45,
        ease: 'power3.out',
        delay: (i % 3) * 0.08,
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });
}

// ============================================================
// STICKY MOBILE CTA
// ============================================================
function initStickyCTA() {
  const cta = document.getElementById('sticky-cta');
  const hero = document.getElementById('hero');

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      cta.classList.add('visible');
    } else {
      cta.classList.remove('visible');
    }
  }, { threshold: 0.1 });

  observer.observe(hero);
}

// ============================================================
// NAV ACTIVE LINK ON SCROLL
// ============================================================
function initNavHighlight() {
  const sections = ['process', 'why', 'faq'].map(id => document.getElementById(id)).filter(Boolean);
  const links = document.querySelectorAll('.nav-links a[href^="#"]');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => obs.observe(s));
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Set initial mode without animation
  setAudienceMode('hirer', false);
  renderFAQ('hirer');

  // Toggle buttons
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => setAudienceMode(btn.dataset.mode));
  });

  // Nav data-toggle links
  document.querySelectorAll('[data-toggle]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      setAudienceMode(link.dataset.toggle);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Footer role links
  document.querySelectorAll('[data-role]').forEach(link => {
    link.addEventListener('click', () => {
      const role = link.dataset.role;
      if (role === 'hirer' || role === 'talent') setAudienceMode(role);
    });
  });

  // Form role change
  const roleSelect = document.getElementById('field-role');
  roleSelect.addEventListener('change', () => {
    updateFormFields(roleSelect.value);
    // Sync audience mode if switching between hirer/talent
    if (roleSelect.value === 'hirer' || roleSelect.value === 'talent') {
      setAudienceMode(roleSelect.value);
    }
  });
  updateFormFields('hirer');

  // Form submit
  document.getElementById('waitlist-form').addEventListener('submit', handleSubmit);

  // Init animations
  initHeroAnimation();
  initScrollAnimations();
  initStickyCTA();
  initNavHighlight();
});
