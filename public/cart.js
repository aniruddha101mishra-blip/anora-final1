/* =============================================
   ANORA — Cart & Payment System
   cart.js
   ============================================= */

'use strict';

/* ── Product catalogue (source of truth) ── */
const PRODUCTS = {
  'anora-caru': {
    id: 'anora-caru',
    name: 'Anora — Cāru',
    size: 'Eau de Parfum · 30ml',
    price: 499,
    image: 'collections/anora-1.jpeg',
  },
};

/* ── Cart State ── */
let cart = loadCart();

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('anora_cart') || '[]');
  } catch { return []; }
}

function saveCart() {
  localStorage.setItem('anora_cart', JSON.stringify(cart));
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartItemCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function addToCart(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty = Math.min(existing.qty + 1, 10);
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(product.name);
  renderCartItems();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, Math.min(10, item.qty + delta));
  saveCart();
  updateCartUI();
  renderCartItems();
}

/* ── DOM refs ── */
const cartBackdrop     = document.getElementById('cartBackdrop');
const cartDrawer       = document.getElementById('cartDrawer');
const cartItemsEl      = document.getElementById('cartItems');
const cartCountEl      = document.getElementById('cartCount');
const cartSubtotalEl   = document.getElementById('cartSubtotal');
const cartDrawerCount  = document.getElementById('cartDrawerCount');
const cartToast        = document.getElementById('cartToast');

/* ── Open / Close Drawer ── */
function openCart() {
  cartDrawer.classList.add('open');
  cartBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

cartBackdrop.addEventListener('click', closeCart);
document.getElementById('cartCloseBtn').addEventListener('click', closeCart);
document.getElementById('cartContinueBtn').addEventListener('click', closeCart);

/* ── Nav Cart button ── */
document.getElementById('cartNavBtn').addEventListener('click', openCart);

/* ── Update badge & subtotal ── */
function updateCartUI() {
  const count = cartItemCount();
  cartCountEl.textContent = count;
  cartCountEl.classList.toggle('visible', count > 0);

  const total = cartTotal();
  if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
  if (cartDrawerCount) cartDrawerCount.textContent = `(${count} item${count !== 1 ? 's' : ''})`;
}

/* ── Render cart items ── */
function renderCartItems() {
  if (!cartItemsEl) return;

  const emptyState = document.getElementById('cartEmptyState');
  const cartFooter = document.getElementById('cartFooter');

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '';
    if (emptyState) emptyState.style.display = 'flex';
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (cartFooter) cartFooter.style.display = 'block';

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      ${item.image
        ? `<img class="cart-item-img" src="${item.image}" alt="${escHtml(item.name)}" />`
        : `<div class="cart-item-img-placeholder">A</div>`}
      <div class="cart-item-details">
        <div class="cart-item-name">${escHtml(item.name)}</div>
        <div class="cart-item-size">${escHtml(item.size)}</div>
        <div class="cart-item-row">
          <div class="qty-control">
            <button class="qty-btn" data-id="${item.id}" data-delta="-1" aria-label="Decrease quantity">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" data-id="${item.id}" data-delta="1" aria-label="Increase quantity">+</button>
          </div>
          <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
        </div>
        <button class="cart-item-remove" data-remove="${item.id}">Remove</button>
      </div>
    </div>
  `).join('');

  // Bind qty buttons
  cartItemsEl.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateQty(btn.dataset.id, parseInt(btn.dataset.delta));
    });
  });

  // Bind remove buttons
  cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.remove));
  });
}

/* ── Toast ── */
function showToast(name) {
  cartToast.innerHTML = `<span class="toast-name">${escHtml(name)}</span> added to your cart ✦`;
  cartToast.classList.add('show');
  setTimeout(() => cartToast.classList.remove('show'), 2800);
}

/* ── Checkout → redirect to Next.js checkout on Vercel ── */
document.getElementById('cartCheckoutBtn').addEventListener('click', () => {
  if (cart.length === 0) return;
  closeCart();
  const cartData = encodeURIComponent(JSON.stringify(cart));
  window.location.href = 'https://anora-final1.vercel.app/checkout?cart=' + cartData;
});

/* ── Wire up "Add to Cart" buttons ── */
document.querySelectorAll('.btn-add').forEach(btn => {
  const productId = btn.dataset.product;
  if (!productId) return;

  btn.addEventListener('click', () => {
    addToCart(productId);

    // Brief visual feedback
    const orig = btn.textContent;
    btn.textContent = 'Added ✦';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--charcoal)';
    btn.style.borderColor = 'var(--gold)';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 1800);
  });
});

/* ── Wire up "Buy Now" buttons ── */
document.querySelectorAll('.btn-buy').forEach(btn => {
  const productId = btn.dataset.product;
  if (!productId) return;

  btn.addEventListener('click', () => {
    addToCart(productId);
    const cartData = encodeURIComponent(JSON.stringify(cart));
    window.location.href = 'https://anora-final1.vercel.app/checkout?cart=' + cartData;
  });
});

/* ── Keyboard: close cart on Escape ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCart();
});

/* ── Helpers ── */
function escHtml(s) {
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

/* ── Init ── */
updateCartUI();
renderCartItems();
