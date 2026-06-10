/* =============================================
   ANORA — Media Asset URLs
   assets.js

   ⚠️  GitHub Pages cannot serve large video files reliably.
   You MUST upload your videos and images to Cloudinary (free):

   1. Sign up at https://cloudinary.com (free tier is enough)
   2. Upload your files in the Media Library:
        videos/anora.mp4           → hero video
        videos/anora-1.mp4        → heritage video
        collections/anora-1.jpeg  → product image
   3. Click each uploaded file → copy the URL shown
   4. Paste the URLs below replacing the placeholder values
   5. Push this file to GitHub:
        git add assets.js
        git commit -m "fix: cloudinary media URLs"
        git push origin main
   ============================================= */

const ANORA_ASSETS = {
  // ── Videos ── Replace with your Cloudinary URLs ──
  heroVideo:     'https://res.cloudinary.com/dtips5xbg/video/upload/v1780985161/anora_compressed_pbygd9.mp4',
  heritageVideo: 'https://res.cloudinary.com/dtips5xbg/video/upload/v1780985925/anora-1_odehtj.mp4',

  // ── Images ── Replace with your Cloudinary URL ──
  productCaruImg: 'https://res.cloudinary.com/dtips5xbg/image/upload/f_auto,q_auto/anora-1_afkq6k',
};

/* ── Apply assets to the DOM ── */
(function applyAssets() {
  // Hero video
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    const src = heroVideo.querySelector('source');
    if (src) src.setAttribute('src', ANORA_ASSETS.heroVideo);
    heroVideo.setAttribute('poster', ANORA_ASSETS.productCaruImg);
    heroVideo.load();
    // Force play after load — handles browsers that block autoplay
    heroVideo.play().catch(() => {
      // Autoplay blocked — make video visible anyway so poster shows
      heroVideo.style.opacity = '1';
    });
  }

  // Heritage video
  const heritageVideo = document.getElementById('heritageVideo');
  if (heritageVideo) {
    const src = heritageVideo.querySelector('source');
    if (src) src.setAttribute('src', ANORA_ASSETS.heritageVideo);
    heritageVideo.load();
    heritageVideo.play().catch(() => {});
  }

  // Product image — set src and remove lazy loading to force display
  const productImg = document.querySelector('.product-photo[data-asset="caru"]');
  if (productImg) {
    productImg.removeAttribute('loading');
    productImg.src = ANORA_ASSETS.productCaruImg;
    // If still broken after load, show gold placeholder
    productImg.onerror = function() {
      this.style.display = 'none';
      const parent = this.closest('.product-image');
      if (parent) {
        parent.style.background = 'rgba(200,164,106,0.08)';
        parent.style.display = 'flex';
        parent.style.alignItems = 'center';
        parent.style.justifyContent = 'center';
        const ph = document.createElement('span');
        ph.textContent = 'ANORA';
        ph.style.cssText = 'font-family:Cormorant Garamond,serif;font-size:1.4rem;color:rgba(200,164,106,0.35);letter-spacing:0.2em';
        parent.appendChild(ph);
      }
    };
  }
})();
