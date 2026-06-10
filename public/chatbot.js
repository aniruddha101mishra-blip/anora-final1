/* =============================================
   ANORA — Jus Fragrance Assistant Chatbot
   chatbot.js
   ============================================= */

'use strict';

/* ── Perfume catalogue ── */
const CATALOGUE = [
  {
    name: 'Anora — Cāru',
    families: ['Floral', 'Fresh/Aquatic'],
    notes: ['Rose', 'Jasmine', 'Bergamot', 'Musk'],
    avoidNotes: ['Oud', 'Patchouli'],
    occasions: ['Daily Wear', 'Office', 'Casual Outings'],
    longevity: '6-8 Hours',
    projection: 'Moderate',
    gender: ['Women', 'Unisex'],
    price: 499,
    size: '30ml',
    description: 'A radiant floral bouquet lifted by sun-drenched citrus.',
  },
  {
    name: 'Anora — Nisha',
    families: ['Oriental', 'Spicy'],
    notes: ['Oud', 'Amber', 'Sandalwood', 'Rose'],
    avoidNotes: ['Lavender', 'Coconut'],
    occasions: ['Date Night', 'Party', 'Special Events'],
    longevity: '8-12 Hours',
    projection: 'Strong',
    gender: ['Men', 'Unisex'],
    price: 899,
    size: '30ml',
    description: 'Smoky oud wrapped in warm amber for an unforgettable evening.',
  },
  {
    name: 'Anora — Vayu',
    families: ['Fresh/Aquatic', 'Citrus'],
    notes: ['Bergamot', 'Lavender', 'Musk', 'Sandalwood'],
    avoidNotes: ['Oud', 'Patchouli', 'Vanilla'],
    occasions: ['Daily Wear', 'Office', 'Casual Outings'],
    longevity: '4-6 Hours',
    projection: 'Soft',
    gender: ['Men', 'Unisex'],
    price: 649,
    size: '30ml',
    description: 'Breezy bergamot and soft lavender — effortlessly clean.',
  },
  {
    name: 'Anora — Madhura',
    families: ['Vanilla/Gourmand'],
    notes: ['Vanilla', 'Coconut', 'Musk', 'Amber'],
    avoidNotes: ['Oud', 'Spicy'],
    occasions: ['Casual Outings', 'Date Night', 'Special Events'],
    longevity: '6-8 Hours',
    projection: 'Moderate',
    gender: ['Women', 'Unisex'],
    price: 749,
    size: '30ml',
    description: 'Creamy vanilla kissed by coconut and soft amber warmth.',
  },
];

/* ── Recommendation engine ── */
function recommend(data) {
  const scores = CATALOGUE.map(p => {
    let score = 0;
    if (data.family && p.families.includes(data.family)) score += 30;
    const lovedMatch = (data.notes || []).filter(n => p.notes.includes(n)).length;
    score += lovedMatch * 12;
    const avoidHit = (data.avoidNotes || '').split(',')
      .map(s => s.trim())
      .filter(s => s && p.notes.map(n => n.toLowerCase()).includes(s.toLowerCase())).length;
    score -= avoidHit * 25;
    if (data.occasion && p.occasions.includes(data.occasion)) score += 20;
    if (data.longevity && p.longevity === data.longevity) score += 10;
    if (data.projection && p.projection === data.projection) score += 10;
    if (data.gender && (p.gender.includes(data.gender) || p.gender.includes('Unisex'))) score += 10;
    const budgetMap = { 'Under ₹500': 500, '₹500-₹1000': 1000, '₹1000-₹2000': 2000, '₹2000+': Infinity };
    const maxBudget = budgetMap[data.budget] || Infinity;
    if (p.price <= maxBudget) score += 15; else score -= 20;
    const confidence = Math.min(99, Math.max(0, Math.round((score / 107) * 100)));
    return { ...p, confidence };
  });
  return scores.filter(p => p.confidence > 0).sort((a, b) => b.confidence - a.confidence).slice(0, 2);
}

/* ── Flow definition ── */
const STEPS = [
  { id: 'welcome',      type: 'info' },
  { id: 'name',         type: 'text',   prompt: "What should I call you?" },
  { id: 'family',       type: 'single', prompt: "What fragrance family do you usually enjoy?",
    options: ['Floral','Citrus','Woody','Fresh/Aquatic','Vanilla/Gourmand','Spicy','Oriental','Not Sure'] },
  { id: 'notes',        type: 'multi',  prompt: "Select all fragrance notes you love:",
    options: ['Rose','Jasmine','Lavender','Vanilla','Musk','Sandalwood','Amber','Oud','Bergamot','Blueberry','Coconut','Patchouli','Other'] },
  { id: 'avoidNotes',   type: 'text',   prompt: "Any notes you dislike or want to avoid? (type 'none' if not)" },
  { id: 'occasion',     type: 'single', prompt: "When will you mostly wear this perfume?",
    options: ['Daily Wear','Office','Casual Outings','Date Night','Party','Wedding','Special Events'] },
  { id: 'longevity',    type: 'single', prompt: "How long would you like the fragrance to last?",
    options: ['4-6 Hours','6-8 Hours','8-12 Hours','All Day'] },
  { id: 'projection',   type: 'single', prompt: "How noticeable do you want the fragrance to be?",
    options: ['Soft','Moderate','Strong','Very Strong'] },
  { id: 'gender',       type: 'single', prompt: "Preferred fragrance gender?",
    options: ['Men','Women','Unisex'] },
  { id: 'budget',       type: 'single', prompt: "What is your preferred budget?",
    options: ['Under ₹500','₹500-₹1000','₹1000-₹2000','₹2000+'] },
  { id: 'custom',       type: 'single', prompt: "Would you like a custom-made fragrance just for you?",
    options: ['Yes','No'] },
  { id: 'customDream',  type: 'text',   prompt: "Describe your dream fragrance in a few words." },
  { id: 'customLove',   type: 'text',   prompt: "Any perfumes you currently love?" },
  { id: 'customInclude',type: 'text',   prompt: "Any specific ingredients you'd like included?" },
  { id: 'customAvoid',  type: 'text',   prompt: "Any ingredients to avoid in your custom blend?" },
  { id: 'recommendation', type: 'info' },
  { id: 'leadAsk',      type: 'single', prompt: "Would you like our team to reach out with personalised recommendations?",
    options: ['Yes please','No thanks'] },
  { id: 'leadName',     type: 'text',   prompt: "Your name?" },
  { id: 'leadEmail',    type: 'text',   prompt: "Your email address?" },
  { id: 'leadPhone',    type: 'text',   prompt: "Your phone number?" },
  { id: 'done',         type: 'info' },
];

const TOTAL_MAIN_STEPS = 14;

/* ── State ── */
let state = { step: 0, data: {}, multiSelected: [], wantsCustom: false, wantsLead: false };

/* ── DOM refs — match the IDs in index.html exactly ── */
const toggleBtn   = document.getElementById('asjusToggle');
const chatWindow  = document.getElementById('asjusWindow');
const messages    = document.getElementById('asjusMessages');
const optionsWrap = document.getElementById('asjusOptions');
const confirmBtn  = document.getElementById('asjusConfirm');
const textInput   = document.getElementById('asjusInput');
const sendBtn     = document.getElementById('ajsusSend');
const progressWrap= document.getElementById('asjusProgress');
const badge       = document.getElementById('ajsusBadge');
const minimizeBtn = document.getElementById('asjusMinimize');

/* ── Guard: if any critical element is missing, bail silently ── */
if (!toggleBtn || !chatWindow || !messages) {
  console.warn('[Jus] Chatbot DOM elements not found. Check IDs in index.html.');
} else {

/* ── Toggle open/close ── */
toggleBtn.addEventListener('click', () => {
  const isOpen = chatWindow.classList.toggle('open');
  toggleBtn.classList.toggle('open', isOpen);
  if (isOpen) {
    if (badge) badge.style.display = 'none';
    if (state.step === 0) startFlow();
  }
});

/* ── Minimize ── */
if (minimizeBtn) {
  minimizeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('open');
    toggleBtn.classList.remove('open');
  });
}

/* ── Progress dots ── */
function renderProgress(current) {
  if (!progressWrap) return;
  progressWrap.innerHTML = '';
  for (let i = 0; i < TOTAL_MAIN_STEPS; i++) {
    const d = document.createElement('div');
    d.className = 'asjus-prog-dot' + (i < current ? ' done' : '') + (i === current ? ' active' : '');
    progressWrap.appendChild(d);
  }
}

/* ── Post a bot message ── */
function botMsg(html, delay = 0) {
  return new Promise(resolve => {
    const typing = document.createElement('div');
    typing.className = 'asjus-msg bot asjus-typing';
    typing.innerHTML = `
      <div class="asjus-msg-avatar">A</div>
      <div class="asjus-bubble">
        <div class="asjus-dot"></div>
        <div class="asjus-dot"></div>
        <div class="asjus-dot"></div>
      </div>`;
    messages.appendChild(typing);
    scrollBottom();

    setTimeout(() => {
      typing.remove();
      const msg = document.createElement('div');
      msg.className = 'asjus-msg bot';
      msg.innerHTML = `<div class="asjus-msg-avatar">A</div><div class="asjus-bubble">${html}</div>`;
      messages.appendChild(msg);
      scrollBottom();
      resolve();
    }, 900 + delay);
  });
}

/* ── Post a user message ── */
function userMsg(text) {
  const msg = document.createElement('div');
  msg.className = 'asjus-msg user';
  msg.innerHTML = `<div class="asjus-bubble">${escHtml(text)}</div>`;
  messages.appendChild(msg);
  scrollBottom();
}

function scrollBottom() {
  messages.scrollTop = messages.scrollHeight;
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ── Clear interactive area ── */
function clearUI() {
  if (optionsWrap) { optionsWrap.innerHTML = ''; optionsWrap.style.display = 'none'; }
  if (confirmBtn)  { confirmBtn.style.display = 'none'; }
  if (textInput)   { textInput.style.display = 'none'; }
  if (sendBtn)     { sendBtn.style.display = 'none'; }
  state.multiSelected = [];
}

/* ── Show text input ── */
function showTextInput(placeholder = 'Type your answer…') {
  if (!textInput || !sendBtn) return;
  textInput.style.display = 'flex';
  sendBtn.style.display = 'flex';
  textInput.placeholder = placeholder;
  textInput.value = '';
  setTimeout(() => textInput.focus(), 100);
}

/* ── Show single-select options ── */
function showOptions(opts) {
  if (!optionsWrap) return;
  optionsWrap.style.display = 'flex';
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'asjus-opt';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      userMsg(opt);
      clearUI();
      handleAnswer(opt);
    });
    optionsWrap.appendChild(btn);
  });
}

/* ── Show multi-select options ── */
function showMultiOptions(opts) {
  if (!optionsWrap || !confirmBtn) return;
  optionsWrap.style.display = 'flex';
  confirmBtn.style.display = 'block';

  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'asjus-opt';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      const idx = state.multiSelected.indexOf(opt);
      if (idx === -1) { state.multiSelected.push(opt); btn.classList.add('selected'); }
      else            { state.multiSelected.splice(idx, 1); btn.classList.remove('selected'); }
    });
    optionsWrap.appendChild(btn);
  });

  confirmBtn.addEventListener('click', confirmMulti, { once: true });
}

function confirmMulti() {
  const selected = state.multiSelected.length ? state.multiSelected.join(', ') : 'None';
  userMsg(selected);
  clearUI();
  handleAnswer(selected);
}

/* ── Start flow ── */
function startFlow() {
  renderProgress(0);
  showStep(0);
}

/* ── Show step ── */
async function showStep(index) {
  clearUI();
  const step = STEPS[index];
  if (!step) return;

  renderProgress(Math.min(index, TOTAL_MAIN_STEPS - 1));

  switch (step.id) {

    case 'welcome':
      await botMsg("Welcome to <strong>Anora Perfumes</strong> ✦");
      await botMsg("I'm <em>Jus</em>, your fragrance assistant. I'll help you discover your perfect scent — or create a custom perfume just for you.");
      await botMsg("Shall we begin?");
      showOptions(["Let's begin ✦"]);
      break;

    case 'recommendation': {
      const recs = recommend(state.data);
      await botMsg(`Based on everything you've shared, here are my top picks for you ✦`);
      if (recs.length === 0) {
        await botMsg("Our full collection is waiting — visit the shop or let our team assist you personally.");
      } else {
        for (const r of recs) {
          const card = `
            <div class="asjus-rec-card">
              <div class="asjus-rec-title">${escHtml(r.name)}</div>
              <div class="asjus-rec-score">Match confidence: <span>${r.confidence}%</span></div>
              <div class="asjus-rec-detail">
                <strong>Notes:</strong> ${r.notes.join(' · ')}<br/>
                <strong>Occasions:</strong> ${r.occasions.join(', ')}<br/>
                <strong>Longevity:</strong> ${r.longevity}<br/>
                <strong>Price:</strong> ₹${r.price} / ${r.size}<br/>
                <em style="font-size:0.78rem;opacity:0.7">${escHtml(r.description)}</em>
              </div>
            </div>`;
          await botMsg(card);
        }
      }
      state.data.recommendations = recs.map(r => ({ name: r.name, confidence: r.confidence }));
      advance();
      break;
    }

    case 'done':
      await botMsg(`Thank you for exploring <strong>Anora Perfumes</strong>, ${escHtml(state.data.name || '')} ✦`);
      await botMsg("Your fragrance journey starts here. Our team will reach out shortly if you've requested assistance.");
      await botMsg("Until then — wear your scent with grace. 🌸");
      saveSession();
      break;

    case 'leadAsk':
      await botMsg(step.prompt);
      showOptions(step.options);
      break;

    default:
      if (step.type === 'info') { advance(); break; }
      await botMsg(step.prompt);
      if (step.type === 'text')   showTextInput();
      if (step.type === 'single') showOptions(step.options);
      if (step.type === 'multi')  showMultiOptions(step.options);
  }
}

/* ── Handle answer ── */
function handleAnswer(value) {
  const step = STEPS[state.step];
  switch (step.id) {
    case 'welcome':        advance(); break;
    case 'name':           state.data.name = value; advance(); break;
    case 'family':         state.data.family = value; advance(); break;
    case 'notes':          state.data.notes = value.split(', ').map(s => s.trim()); advance(); break;
    case 'avoidNotes':     state.data.avoidNotes = value; advance(); break;
    case 'occasion':       state.data.occasion = value; advance(); break;
    case 'longevity':      state.data.longevity = value; advance(); break;
    case 'projection':     state.data.projection = value; advance(); break;
    case 'gender':         state.data.gender = value; advance(); break;
    case 'budget':         state.data.budget = value; advance(); break;
    case 'custom':
      state.wantsCustom = (value === 'Yes');
      state.data.wantsCustom = state.wantsCustom;
      if (!state.wantsCustom) {
        state.step = STEPS.findIndex(s => s.id === 'recommendation') - 1;
      }
      advance();
      break;
    case 'customDream':    state.data.customDream = value; advance(); break;
    case 'customLove':     state.data.customLove = value; advance(); break;
    case 'customInclude':  state.data.customInclude = value; advance(); break;
    case 'customAvoid':    state.data.customAvoid = value; advance(); break;
    case 'leadAsk':
      state.wantsLead = value.startsWith('Yes');
      if (!state.wantsLead) {
        state.step = STEPS.findIndex(s => s.id === 'done') - 1;
      }
      advance();
      break;
    case 'leadName':  state.data.leadName = value; advance(); break;
    case 'leadEmail': state.data.leadEmail = value; advance(); break;
    case 'leadPhone': state.data.leadPhone = value; submitLead(); advance(); break;
    default: advance();
  }
}

function advance() {
  state.step++;
  showStep(state.step);
}

/* ── Text input send ── */
function sendText() {
  if (!textInput) return;
  const val = textInput.value.trim();
  if (!val) return;
  userMsg(val);
  clearUI();
  handleAnswer(val);
}

if (sendBtn)   sendBtn.addEventListener('click', sendText);
if (textInput) textInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendText(); });

/* ── Save session ── */
function saveSession() {
  try {
    localStorage.setItem('anora_jus_session', JSON.stringify({
      timestamp: new Date().toISOString(),
      responses: state.data,
    }));
  } catch(_) {}
}

/* ── Submit lead to Formspree ── */
async function submitLead() {
  const payload = {
    source: 'Jus Chatbot',
    name:   state.data.leadName  || state.data.name || '',
    email:  state.data.leadEmail || '',
    phone:  state.data.leadPhone || '',
    preferences: JSON.stringify(state.data),
  };
  try {
    await fetch('https://formspree.io/f/xwvjodqp', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch(_) {
    console.warn('[Jus] Lead submission failed silently.');
  }
}

} // end guard
