// ============================================================
//  ROMI — Google Analytics 4 Events + Dashboard
//  Measurement ID: G-PXVHDKFZY0
// ============================================================

// ── URL do Apps Script (preencher após deploy) ────────────
const GA4_PROXY_URL = 'https://script.google.com/macros/s/AKfycbyF5x96UReTPuEazBGwSANRhaacYvvoU8VDadyQAEmCz3dP0UVaBd-zDkVlYHzmLQ8AmQ/exec';

// ── Utilitário de eventos ─────────────────────────────────
function gaEvent(name, params = {}) {
  if (typeof gtag === 'undefined') return;
  gtag('event', name, params);
}

// ── first_open ────────────────────────────────────────────
(function trackFirstOpen() {
  if (!localStorage.getItem('romi_first_open_sent')) {
    gaEvent('first_open', { app_name: 'Romi Gerenciador de MKT' });
    localStorage.setItem('romi_first_open_sent', '1');
  }
})();

// ── referrer_traffic e social_media_referral ──────────────
(function trackReferrer() {
  const ref = document.referrer;
  if (!ref) return;

  gaEvent('referrer_traffic', { referrer_url: ref });

  const socialDomains = [
    'facebook.com', 'instagram.com', 'twitter.com', 'x.com',
    'linkedin.com', 'tiktok.com', 'youtube.com', 'pinterest.com',
    'threads.net', 'whatsapp.com',
  ];
  const isSocial = socialDomains.some(d => ref.includes(d));
  if (isSocial) {
    const platform = socialDomains.find(d => ref.includes(d))?.split('.')[0] || 'unknown';
    gaEvent('social_media_referral', { platform, referrer_url: ref });
  }
})();

// ── click (navegação) ─────────────────────────────────────
const _originalNavigate = window.navigate;
window.navigate = function (pageId) {
  gaEvent('click', { event_category: 'navigation', page_section: pageId });
  if (_originalNavigate) _originalNavigate(pageId);
};

// ── button_click ──────────────────────────────────────────
document.addEventListener('click', function (e) {
  const btn = e.target.closest('button');
  if (!btn) return;
  gaEvent('button_click', {
    event_category: 'engagement',
    button_label: btn.textContent.trim().slice(0, 60),
    page_section: document.querySelector('.page.active')?.id?.replace('page-', '') || 'unknown',
  });
});

// ── Funções prontas para o app Romi ──────────────────────
function trackPricingInteraction(planName, action = 'view') {
  gaEvent('pricing_interaction', { plan_name: planName, interaction_type: action });
}
function trackSubscriptionConvert(plan, value, currency = 'BRL') {
  gaEvent('app_store_subscription_convert', { plan_name: plan, value, currency });
}
function trackSubscriptionRenew(plan, value, currency = 'BRL') {
  gaEvent('app_store_subscription_renew', { plan_name: plan, value, currency });
}
function trackInAppPurchase(itemName, value, currency = 'BRL') {
  gaEvent('in_app_purchase', { item_name: itemName, value, currency });
}
function trackPurchase(transactionId, value, currency = 'BRL') {
  gaEvent('purchase', { transaction_id: transactionId, value, currency });
}

// ════════════════════════════════════════════════════════════
//  GA4 DASHBOARD — busca e renderiza dados reais
// ════════════════════════════════════════════════════════════

async function fetchGA4Data(days = 30) {
  const res = await fetch(`${GA4_PROXY_URL}?days=${days}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Mapeamento visual por canal de tráfego
const CHANNEL_META = {
  'Organic Search':   { icon: '🔍', color: '#27AE60', bg: '#E8F5E9' },
  'Direct':           { icon: '🔗', color: '#2980B9', bg: '#EBF5FB' },
  'Social':           { icon: '📱', color: '#8E44AD', bg: '#F5EEF8' },
  'Paid Search':      { icon: '🎯', color: '#E67E22', bg: '#FEF9E7' },
  'Email':            { icon: '✉️', color: '#D35400', bg: '#FDF2E9' },
  'Referral':         { icon: '🌐', color: '#16A085', bg: '#E8F8F5' },
  'Organic Social':   { icon: '📲', color: '#C0392B', bg: '#FDEDEC' },
  'Organic Video':    { icon: '▶️', color: '#E74C3C', bg: '#FDEDEC' },
  'Unassigned':       { icon: '❓', color: '#95A5A6', bg: '#F2F3F4' },
};

function channelMeta(ch) {
  return CHANNEL_META[ch] || { icon: '📊', color: '#7F8C8D', bg: '#F2F3F4' };
}

function fmtDuration(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s}s`;
}

function fmtNum(n) {
  return parseInt(n).toLocaleString('pt-BR');
}

// ── Renderiza o dashboard completo ───────────────────────
async function renderGA4Dashboard() {
  const container = document.getElementById('ga4-live-data');
  if (!container) return;

  // Sem URL configurada — mostra instrução
  if (!GA4_PROXY_URL) {
    container.innerHTML = `
      <div class="card mb-24" style="border:2px dashed var(--border)">
        <div style="text-align:center;padding:32px 16px">
          <div style="font-size:40px;margin-bottom:12px">📊</div>
          <div class="font-bold" style="font-size:16px;margin-bottom:8px">Conecte o Google Analytics para ver dados reais</div>
          <div class="text-sm text-muted mb-16">Siga as instruções na aba <strong>Integrações</strong> para configurar o Apps Script e ativar esta seção.</div>
          <button class="btn btn-primary" onclick="navigate('integrations')">🔗 Ir para Integrações</button>
        </div>
      </div>`;
    return;
  }

  // Loading state
  container.innerHTML = `
    <div class="card mb-24" style="text-align:center;padding:40px">
      <div style="font-size:32px;margin-bottom:12px;animation:spin 1s linear infinite;display:inline-block">⏳</div>
      <div class="text-sm text-muted">Buscando dados do Google Analytics…</div>
    </div>`;

  let data;
  try {
    data = await fetchGA4Data(30);
  } catch (e) {
    container.innerHTML = `
      <div class="alert alert-warning mb-24">
        <span>⚠️</span>
        <span>Não foi possível buscar os dados: <strong>${e.message}</strong>. Verifique a URL do Apps Script nas Integrações.</span>
      </div>`;
    return;
  }

  if (data.error) {
    container.innerHTML = `
      <div class="alert alert-warning mb-24">
        <span>⚠️</span>
        <span>Erro do servidor: <strong>${data.error}</strong></span>
      </div>`;
    return;
  }

  const o = data.overview || {};
  const updated = data.lastUpdated
    ? new Date(data.lastUpdated).toLocaleString('pt-BR')
    : '—';

  // Maior contagem de eventos (para calcular % da barra)
  const maxEvent = data.events && data.events.length ? data.events[0].count : 1;
  // Maior views de página
  const maxViews = data.pages && data.pages.length ? data.pages[0].views : 1;

  container.innerHTML = `

    <!-- Header do bloco GA4 -->
    <div class="section-header mb-16" style="margin-top:0">
      <div>
        <h2 style="margin:0">📊 Google Analytics — Dados Reais</h2>
        <p style="margin:4px 0 0" class="text-muted text-xs">Últimos 30 dias · romi-app.com · Atualizado em ${updated}</p>
      </div>
      <button class="btn btn-outline btn-sm" onclick="renderGA4Dashboard()">↻ Atualizar</button>
    </div>

    <!-- Overview Cards -->
    <div class="grid grid-4 mb-24">
      ${overviewCard('Sessões', fmtNum(o.sessions || 0), '🖥️', 'blue', 'Total de visitas no período')}
      ${overviewCard('Usuários Ativos', fmtNum(o.activeUsers || 0), '👤', 'green', 'Usuários que interagiram')}
      ${overviewCard('Novos Usuários', fmtNum(o.newUsers || 0), '✨', 'orange', 'Primeira visita no período')}
      ${overviewCard('Tempo Médio', fmtDuration(o.avgDuration || 0), '⏱️', 'yellow', 'Duração média por sessão')}
    </div>

    <!-- Eventos + Páginas -->
    <div class="grid grid-2 mb-24">

      <!-- Top Eventos -->
      <div class="card">
        <div class="card-title mb-16">🔥 Eventos Mais Disparados</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${(data.events || []).map(ev => `
            <div>
              <div class="flex justify-between mb-4">
                <span class="text-sm font-bold" style="font-family:monospace;font-size:12px">${ev.name}</span>
                <span class="text-sm text-muted">${fmtNum(ev.count)}</span>
              </div>
              <div style="height:6px;background:var(--border);border-radius:99px;overflow:hidden">
                <div style="height:100%;width:${Math.round((ev.count / maxEvent) * 100)}%;background:var(--primary);border-radius:99px;transition:width .4s"></div>
              </div>
            </div>`).join('') || '<div class="text-sm text-muted">Nenhum evento registrado.</div>'}
        </div>
      </div>

      <!-- Top Páginas -->
      <div class="card">
        <div class="card-title mb-16">📄 Páginas Mais Visitadas</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${(data.pages || []).map(pg => `
            <div>
              <div class="flex justify-between mb-4">
                <span class="text-sm font-bold" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:180px" title="${pg.path}">${pg.title !== '(not set)' ? pg.title : pg.path}</span>
                <span class="text-sm text-muted">${fmtNum(pg.views)} views</span>
              </div>
              <div style="height:6px;background:var(--border);border-radius:99px;overflow:hidden">
                <div style="height:100%;width:${Math.round((pg.views / maxViews) * 100)}%;background:#8E44AD;border-radius:99px;transition:width .4s"></div>
              </div>
            </div>`).join('') || '<div class="text-sm text-muted">Nenhuma página registrada.</div>'}
        </div>
      </div>

    </div>

    <!-- Origem do Tráfego -->
    <div class="card mb-24">
      <div class="card-title mb-16">🌐 Origem do Tráfego</div>
      <div style="display:flex;flex-direction:column;gap:12px">
        ${(data.traffic || []).map(ch => {
          const m = channelMeta(ch.channel);
          return `
          <div class="flex items-center gap-12">
            <div style="width:130px;display:flex;align-items:center;gap:8px;flex-shrink:0">
              <span style="font-size:16px">${m.icon}</span>
              <span class="text-sm font-bold">${ch.channel}</span>
            </div>
            <div style="flex:1;height:10px;background:var(--border);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${ch.pct}%;background:${m.color};border-radius:99px;transition:width .4s"></div>
            </div>
            <div style="width:100px;text-align:right;flex-shrink:0">
              <span class="text-sm font-bold">${ch.pct}%</span>
              <span class="text-xs text-muted"> · ${fmtNum(ch.sessions)} sess.</span>
            </div>
          </div>`;
        }).join('') || '<div class="text-sm text-muted">Nenhum dado de tráfego.</div>'}
      </div>
    </div>

    <div class="divider mb-24"></div>
  `;
}

function overviewCard(label, value, icon, color, desc) {
  return `
    <div class="kpi-card ${color}">
      <div class="kpi-header">
        <span class="kpi-icon">${icon}</span>
      </div>
      <div class="kpi-value">${value}</div>
      <div class="kpi-label">${label}</div>
      <div class="text-xs text-muted" style="margin-top:4px">${desc}</div>
    </div>`;
}
