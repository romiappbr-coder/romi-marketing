// ============================================================
//  ROMI — Google Analytics 4 Events
//  Measurement ID: G-PXVHDKFZY0
// ============================================================

// ── Utilitário ────────────────────────────────────────────
function gaEvent(name, params = {}) {
  if (typeof gtag === 'undefined') return;
  gtag('event', name, params);
}

// ── first_open ────────────────────────────────────────────
// Dispara uma única vez, na primeira abertura do gerenciador
(function trackFirstOpen() {
  if (!localStorage.getItem('romi_first_open_sent')) {
    gaEvent('first_open', { app_name: 'Romi Gerenciador de MKT' });
    localStorage.setItem('romi_first_open_sent', '1');
  }
})();

// ── referrer_traffic e social_media_referral ──────────────
// Detecta de onde o usuário veio ao abrir o site
(function trackReferrer() {
  const ref = document.referrer;
  if (!ref) return;

  gaEvent('referrer_traffic', { referrer_url: ref });

  const socialDomains = [
    'facebook.com', 'instagram.com', 'twitter.com', 'x.com',
    'linkedin.com', 'tiktok.com', 'youtube.com', 'pinterest.com',
    'threads.net', 'whatsapp.com',
  ];
  const isSocial = socialDomains.some(domain => ref.includes(domain));
  if (isSocial) {
    const platform = socialDomains.find(d => ref.includes(d))?.split('.')[0] || 'unknown';
    gaEvent('social_media_referral', { platform, referrer_url: ref });
  }
})();

// ── click (navegação entre páginas) ───────────────────────
// Sobrescreve navigate() para rastrear cada troca de seção
const _originalNavigate = window.navigate;
window.navigate = function(pageId) {
  gaEvent('click', {
    event_category: 'navigation',
    event_label: pageId,
    page_section: pageId,
  });
  if (_originalNavigate) _originalNavigate(pageId);
};

// ── button_click ──────────────────────────────────────────
// Rastreia cliques nos botões principais via delegação de eventos
document.addEventListener('click', function(e) {
  const btn = e.target.closest('button');
  if (!btn) return;

  const label = btn.textContent.trim().slice(0, 60);
  const page  = document.querySelector('.page.active')?.id?.replace('page-', '') || 'unknown';

  gaEvent('button_click', {
    event_category: 'engagement',
    button_label: label,
    page_section: page,
  });
});

// ── pricing_interaction ───────────────────────────────────
// Chame esta função quando o usuário interagir com planos/preços no app Romi
function trackPricingInteraction(planName, action = 'view') {
  gaEvent('pricing_interaction', {
    plan_name: planName,
    interaction_type: action, // 'view' | 'click' | 'select'
  });
}

// ── Funções prontas para o app Romi ──────────────────────
// Use estas funções no app real nos momentos indicados

// Quando o usuário assinar pela primeira vez via App Store / Play Store
function trackSubscriptionConvert(plan, value, currency = 'BRL') {
  gaEvent('app_store_subscription_convert', {
    plan_name: plan,
    value,
    currency,
  });
}

// Quando uma assinatura for renovada automaticamente
function trackSubscriptionRenew(plan, value, currency = 'BRL') {
  gaEvent('app_store_subscription_renew', {
    plan_name: plan,
    value,
    currency,
  });
}

// Quando o usuário fizer uma compra dentro do app (créditos, destaques, etc.)
function trackInAppPurchase(itemName, value, currency = 'BRL') {
  gaEvent('in_app_purchase', {
    item_name: itemName,
    value,
    currency,
  });
}

// Quando uma transação de serviço for concluída
function trackPurchase(transactionId, value, currency = 'BRL') {
  gaEvent('purchase', {
    transaction_id: transactionId,
    value,
    currency,
  });
}
