// ============================================================
//  ROMI — Gerenciador de Marketing | App Logic
// ============================================================

// ── Navegação ─────────────────────────────────────────────
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const page = document.getElementById(`page-${pageId}`);
  const nav = document.querySelector(`[data-page="${pageId}"]`);

  if (page) page.classList.add('active');
  if (nav) nav.classList.add('active');

  // Update header
  const titles = {
    dashboard: { title: 'Dashboard', sub: 'Visão geral do marketing do Romi' },
    seo: { title: 'SEO — Otimização para Busca', sub: 'Palavras-chave, checklist técnico e conteúdo orgânico' },
    paid: { title: 'Tráfego Pago', sub: 'Gestão de anúncios no Google e Meta' },
    content: { title: 'Marketing de Conteúdo', sub: 'Blog, calendário editorial e estratégia de conteúdo' },
    social: { title: 'Redes Sociais', sub: 'Instagram e estratégia de presença social' },
    email: { title: 'Email Marketing & Automação', sub: 'Fluxos automáticos e campanhas por email' },
    analytics: { title: 'Análise de Dados', sub: 'Métricas, KPIs e performance das estratégias' },
    integrations: { title: 'Integrações', sub: 'Conecte suas ferramentas de marketing' },
  };

  const t = titles[pageId] || titles.dashboard;
  document.getElementById('header-title').textContent = t.title;
  document.getElementById('header-sub').textContent = t.sub;

  window.scrollTo(0, 0);
}

// ── Tabs ──────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.closest('.tabs').dataset.group;
      document.querySelectorAll(`.tabs[data-group="${group}"] .tab`).forEach(t => t.classList.remove('active'));
      document.querySelectorAll(`.tab-content[data-group="${group}"]`).forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
}

// ── Toast ─────────────────────────────────────────────────
function toast(msg, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'fadeOut 0.4s ease forwards';
    setTimeout(() => el.remove(), 400);
  }, 3000);
}

// ── Modal ─────────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// ── KPI Editor ────────────────────────────────────────────
function renderKPIs() {
  const container = document.getElementById('kpi-container');
  if (!container) return;
  container.innerHTML = ROMI_DATA.kpis.map(kpi => {
    const savedVal = STATE.kpis[kpi.id] || kpi.value;
    return `
    <div class="kpi-card ${kpi.color}">
      <div class="kpi-header">
        <span class="kpi-icon">${kpi.icon}</span>
        <span class="kpi-trend neutral" id="trend-${kpi.id}">— Sem dados</span>
      </div>
      <div class="kpi-value" id="kpi-val-${kpi.id}">${savedVal}</div>
      <div class="kpi-label">${kpi.label}</div>
      <button class="btn btn-ghost btn-sm" style="margin-top:8px;font-size:11px;" onclick="editKpi('${kpi.id}','${kpi.label}')">✏️ Editar</button>
    </div>`;
  }).join('');
}

function editKpi(id, label) {
  document.getElementById('kpi-edit-label').textContent = label;
  document.getElementById('kpi-edit-input').value = STATE.kpis[id] || '0';
  document.getElementById('kpi-edit-input').dataset.id = id;
  openModal('modal-kpi');
}

function saveKpi() {
  const input = document.getElementById('kpi-edit-input');
  STATE.setKpi(input.dataset.id, input.value);
  renderKPIs();
  closeModal('modal-kpi');
  toast('Métrica atualizada!', 'success');
}

// ── SEO Checklist ─────────────────────────────────────────
function renderSeoChecklist(filterCategory = 'all') {
  const container = document.getElementById('seo-checklist');
  if (!container) return;

  const items = filterCategory === 'all'
    ? ROMI_DATA.seoChecklist
    : ROMI_DATA.seoChecklist.filter(i => i.category === filterCategory);

  container.innerHTML = items.map(item => {
    const done = STATE.seoChecklist[item.id] || false;
    const prioClass = { alta: 'priority-high', média: 'priority-med', baixa: 'priority-low' }[item.priority] || 'priority-low';
    const prioLabel = { alta: 'Alta', média: 'Média', baixa: 'Baixa' }[item.priority];
    return `
    <div class="check-item ${done ? 'done' : ''}" onclick="toggleCheck('${item.id}')">
      <div class="check-box">${done ? '✓' : ''}</div>
      <div style="flex:1">
        <div class="check-label">${item.label}</div>
        <div class="check-desc">${item.desc}</div>
      </div>
      <span class="check-priority ${prioClass}">${prioLabel}</span>
    </div>`;
  }).join('');

  updateSeoProgress();
}

function toggleCheck(id) {
  STATE.toggleChecklistItem(id);
  renderSeoChecklist(document.getElementById('seo-filter')?.value || 'all');
  toast(STATE.seoChecklist[id] ? 'Item concluído!' : 'Item reaberto', 'info');
}

function updateSeoProgress() {
  const total = ROMI_DATA.seoChecklist.length;
  const done = STATE.getChecklistDone();
  const pct = Math.round((done / total) * 100);
  const fill = document.getElementById('seo-progress-fill');
  const label = document.getElementById('seo-progress-label');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = `${done} de ${total} itens concluídos (${pct}%)`;
}

// ── Keywords Table ────────────────────────────────────────
function renderKeywords() {
  const tbody = document.getElementById('keywords-tbody');
  if (!tbody) return;

  tbody.innerHTML = ROMI_DATA.keywords.map(kw => {
    const diffColor = kw.difficulty < 25 ? '#27AE60' : kw.difficulty < 40 ? '#F39C12' : '#E74C3C';
    const intentBadge = {
      comercial: '<span class="badge badge-blue">Comercial</span>',
      transacional: '<span class="badge badge-green">Transacional</span>',
      informacional: '<span class="badge badge-gray">Informacional</span>',
    }[kw.intent] || '';
    const audBadge = {
      owner: '<span class="audience-pill aud-owner">Dono de Casa</span>',
      pro: '<span class="audience-pill aud-pro">Profissional</span>',
      all: '<span class="audience-pill aud-all">Todos</span>',
    }[kw.audience] || '';
    const prioBadge = {
      alta: '<span class="badge badge-orange">Alta</span>',
      média: '<span class="badge badge-yellow">Média</span>',
      baixa: '<span class="badge badge-gray">Baixa</span>',
    }[kw.priority] || '';

    return `
    <tr>
      <td><strong>${kw.kw}</strong></td>
      <td><strong>${kw.volume.toLocaleString('pt-BR')}</strong>/mês</td>
      <td>
        <div class="keyword-difficulty">
          <div class="diff-bar"><div class="diff-fill" style="width:${kw.difficulty}%;background:${diffColor}"></div></div>
          <span style="font-size:12px;color:${diffColor};font-weight:700">${kw.difficulty}</span>
        </div>
      </td>
      <td>${intentBadge}</td>
      <td>${audBadge}</td>
      <td>${prioBadge}</td>
      <td>${kw.position ? `<strong>#${kw.position}</strong>` : '<span class="text-muted text-xs">Não rastreado</span>'}</td>
    </tr>`;
  }).join('');
}

// ── Blog Ideas ────────────────────────────────────────────
function renderBlogIdeas() {
  const container = document.getElementById('blog-ideas-list');
  if (!container) return;

  container.innerHTML = ROMI_DATA.blogIdeas.map((idea, i) => {
    const audBadge = {
      owner: '<span class="audience-pill aud-owner">Dono de Casa</span>',
      pro: '<span class="audience-pill aud-pro">Profissional</span>',
      all: '<span class="audience-pill aud-all">Todos</span>',
    }[idea.audience] || '';
    const typeBadge = {
      guia: '<span class="badge badge-blue">Guia</span>',
      lista: '<span class="badge badge-green">Lista</span>',
      educativo: '<span class="badge badge-gray">Educativo</span>',
      institucional: '<span class="badge badge-orange">Institucional</span>',
    }[idea.type] || '';
    const prioBadge = idea.priority === 'alta'
      ? '<span class="badge badge-orange">Alta prioridade</span>'
      : '<span class="badge badge-yellow">Média</span>';

    return `
    <tr>
      <td><strong>${idea.title}</strong><br><span class="text-xs text-muted">KW: ${idea.kw}</span></td>
      <td>${audBadge}</td>
      <td>${typeBadge}</td>
      <td>${prioBadge}</td>
      <td><span class="badge badge-gray">Ideia</span></td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="toast('Em breve: editor de artigos!','info')">✏️ Escrever</button>
      </td>
    </tr>`;
  }).join('');
}

// ── Campaigns ─────────────────────────────────────────────
function renderCampaigns() {
  const container = document.getElementById('campaigns-list');
  if (!container) return;

  container.innerHTML = ROMI_DATA.campaigns.map(c => {
    const platformIcon = c.platform.includes('Google') ? '🎯' : '📱';
    const platformBadge = c.platform.includes('Google')
      ? '<span class="badge badge-blue">Google Ads</span>'
      : '<span class="badge badge-orange">Meta Ads</span>';
    const statusBadge = c.status === 'ativa'
      ? '<span class="badge badge-green">● Ativa</span>'
      : '<span class="badge badge-gray">○ Inativa</span>';

    return `
    <div class="card mb-16">
      <div class="card-header">
        <div>
          <div class="card-title">${platformIcon} ${c.name}</div>
          <div class="flex gap-8" style="margin-top:6px">${platformBadge} ${statusBadge}</div>
        </div>
        <div class="flex gap-8 items-center">
          <span style="font-size:13px;font-weight:600;color:var(--text-muted)">Budget: R$ ${c.budget}/dia</span>
          <button class="btn btn-primary btn-sm" onclick="toast('Conecte o ${c.platform} nas Integrações para ativar campanhas.','info')">
            ${c.status === 'ativa' ? '⏸ Pausar' : '▶ Ativar'}
          </button>
        </div>
      </div>
      <div class="grid grid-2 gap-16">
        <div>
          <div class="text-xs text-muted mb-4">Objetivo</div>
          <div class="text-sm font-bold">${c.objective}</div>
        </div>
        <div>
          <div class="text-xs text-muted mb-4">Público-alvo</div>
          <div class="text-sm">${c.audience}</div>
        </div>
        ${c.keywords ? `
        <div>
          <div class="text-xs text-muted mb-4">Palavras-chave</div>
          <div class="flex gap-8" style="flex-wrap:wrap">${c.keywords.map(k => `<span class="badge badge-blue">${k}</span>`).join('')}</div>
        </div>` : ''}
        <div>
          <div class="text-xs text-muted mb-4">CTA sugerido</div>
          <div class="text-sm font-bold" style="color:var(--primary)">"${c.cta}"</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="tip-box" style="padding:12px 16px">
        <span class="tip-icon">💡</span>
        <div class="tip-text">${c.notes}</div>
      </div>
    </div>`;
  }).join('');
}

// ── Social Ideas ──────────────────────────────────────────
function renderSocialIdeas() {
  const container = document.getElementById('social-ideas-list');
  if (!container) return;

  const typeColors = {
    educativo: { bg: '#E3F2FD', color: '#1565C0', label: 'Educativo' },
    prova_social: { bg: '#E8F5E9', color: '#2E7D32', label: 'Prova Social' },
    engajamento: { bg: '#FFF8E1', color: '#E65100', label: 'Engajamento' },
    institucional: { bg: '#F3E5F5', color: '#6A1B9A', label: 'Institucional' },
    pro_content: { bg: '#E8EAF6', color: '#3949AB', label: 'Para Profissionais' },
  };

  const formatIcons = { carrossel: '🎴', 'stories/reels': '🎬', reels: '🎬', stories: '📱' };
  const audBadge = {
    owner: '<span class="audience-pill aud-owner">Dono de Casa</span>',
    pro: '<span class="audience-pill aud-pro">Profissional</span>',
    all: '<span class="audience-pill aud-all">Todos</span>',
  };

  container.innerHTML = ROMI_DATA.socialIdeas.map(idea => {
    const tc = typeColors[idea.type] || typeColors.educativo;
    return `
    <div class="card" style="cursor:pointer" onclick="toast('Em breve: agendamento de posts!','info')">
      <div class="flex items-center gap-12 mb-12">
        <span style="font-size:22px">${formatIcons[idea.format] || '📄'}</span>
        <div style="flex:1">
          <div class="font-bold text-sm">${idea.title}</div>
          <div class="text-xs text-muted mt-4">${idea.format} · ${idea.frequency}</div>
        </div>
        <span class="badge" style="background:${tc.bg};color:${tc.color}">${tc.label}</span>
      </div>
      <div style="font-size:12px;color:var(--text-muted);background:var(--bg);padding:10px 12px;border-radius:8px;line-height:1.5;font-style:italic">
        "${idea.caption}"
      </div>
      <div class="flex items-center justify-between mt-12">
        ${audBadge[idea.audience] || ''}
        <button class="btn btn-outline btn-sm">📅 Agendar</button>
      </div>
    </div>`;
  }).join('');
}

// ── Email Flows ───────────────────────────────────────────
function renderEmailFlows() {
  const container = document.getElementById('email-flows-list');
  if (!container) return;

  container.innerHTML = ROMI_DATA.emailFlows.map(flow => {
    const emails = flow.emails.map((e, i) => `
      <div style="display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--border)">
        <div style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${i+1}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:700">${e.subject}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${e.objective}</div>
        </div>
        <span class="badge badge-gray">${e.delay}</span>
      </div>`).join('');

    return `
    <div class="card mb-16">
      <div class="card-header">
        <div>
          <div class="card-title">✉️ ${flow.name}</div>
          <div class="text-xs text-muted mt-4">Gatilho: <strong>${flow.trigger}</strong> · Público: <strong>${flow.audience}</strong></div>
        </div>
        <div class="flex gap-8">
          <span class="badge badge-gray">${flow.emails.length} emails</span>
          <button class="btn btn-outline btn-sm" onclick="toast('Conecte uma plataforma de email nas Integrações.','info')">⚡ Configurar</button>
        </div>
      </div>
      ${emails}
    </div>`;
  }).join('');
}

// ── Integrations ──────────────────────────────────────────
function renderIntegrations() {
  const container = document.getElementById('integrations-list');
  if (!container) return;

  container.innerHTML = ROMI_DATA.integrations.map(int => {
    const status = STATE.integrations[int.id] || int.status;
    const statusInfo = {
      connected: { label: 'Conectado', cls: 'status-connected', dot: 'dot-green' },
      disconnected: { label: 'Não conectado', cls: 'status-disconnected', dot: 'dot-gray' },
      pending: { label: 'Pendente', cls: 'status-pending', dot: 'dot-yellow' },
    }[status];

    const categoryBadge = {
      analytics: '<span class="badge badge-blue">Analytics</span>',
      seo: '<span class="badge badge-green">SEO</span>',
      paid: '<span class="badge badge-orange">Tráfego Pago</span>',
      email: '<span class="badge badge-gray">Email</span>',
    }[int.category] || '';

    const steps = int.setupSteps.map((s, i) => `
      <div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--border)">
        <div style="width:22px;height:22px;border-radius:50%;background:var(--primary-light);color:var(--primary);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0">${i+1}</div>
        <div style="font-size:12px;color:var(--text);line-height:1.5">${s}</div>
      </div>`).join('');

    const metrics = int.metrics.map(m => `<span class="badge badge-gray" style="margin:2px">${m}</span>`).join('');

    return `
    <div class="integration-card">
      <div class="flex items-center gap-12">
        <div class="integration-logo">${int.logo}</div>
        <div class="integration-info">
          <div class="integration-name">${int.name}</div>
          <div class="integration-desc">${int.desc}</div>
        </div>
        ${categoryBadge}
      </div>
      <div class="integration-status-row">
        <span class="status-pill ${statusInfo.cls}">
          <span class="dot ${statusInfo.dot}"></span>
          ${statusInfo.label}
        </span>
        <div class="flex gap-8">
          <button class="btn btn-ghost btn-sm" onclick="toggleIntDetails('${int.id}')">📋 Como configurar</button>
          ${status === 'connected'
            ? `<button class="btn btn-outline btn-sm" onclick="disconnectInt('${int.id}')">Desconectar</button>`
            : status === 'pending'
              ? `<button class="btn btn-primary btn-sm" onclick="confirmInt('${int.id}')">✅ Confirmar conexão</button>`
              : `<button class="btn btn-primary btn-sm" onclick="connectInt('${int.id}')">Conectar</button>`}
        </div>
      </div>
      <div id="int-details-${int.id}" style="display:none">
        <div class="divider"></div>
        <div style="font-size:12px;font-weight:700;color:var(--text);margin-bottom:8px">Passos para configurar:</div>
        ${steps}
        <div style="margin-top:12px">
          <div style="font-size:12px;font-weight:700;color:var(--text);margin-bottom:8px">Métricas disponíveis:</div>
          <div>${metrics}</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function toggleIntDetails(id) {
  const el = document.getElementById(`int-details-${id}`);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function connectInt(id) {
  STATE.setIntegrationStatus(id, 'pending');
  renderIntegrations();
  toast('Siga os passos de configuração acima para conectar.', 'info');
  toggleIntDetails(id);
  updateHeaderIntegrationStatus();
}

function confirmInt(id) {
  STATE.setIntegrationStatus(id, 'connected');
  renderIntegrations();
  toast('Integração confirmada e ativa!', 'success');
  updateHeaderIntegrationStatus();
}

function disconnectInt(id) {
  STATE.setIntegrationStatus(id, 'disconnected');
  renderIntegrations();
  toast('Integração desconectada.', 'info');
  updateHeaderIntegrationStatus();
}

function updateHeaderIntegrationStatus() {
  const connected = ROMI_DATA.integrations.filter(i => (STATE.integrations[i.id] || i.status) === 'connected').length;
  const pending = ROMI_DATA.integrations.filter(i => (STATE.integrations[i.id] || i.status) === 'pending').length;
  const statusEl = document.getElementById('header-int-status');
  if (statusEl) {
    if (connected > 0) {
      statusEl.innerHTML = `<span class="dot dot-green"></span> ${connected} integração(ões) ativa(s)`;
      statusEl.style.color = 'var(--success)';
    } else if (pending > 0) {
      statusEl.innerHTML = `<span class="dot dot-yellow"></span> ${pending} pendente(s)`;
      statusEl.style.color = 'var(--warning)';
    } else {
      statusEl.innerHTML = `<span class="dot dot-gray"></span> Sem integrações`;
      statusEl.style.color = 'var(--text-muted)';
    }
  }
}

// ── Content Calendar ──────────────────────────────────────
function renderCalendar() {
  const container = document.getElementById('calendar-grid');
  if (!container) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  document.getElementById('calendar-month').textContent = `${monthNames[month]} ${year}`;

  const days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const headers = days.map(d => `<div class="cal-day-header">${d}</div>`).join('');

  let cells = '';
  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    cells += '<div></div>';
  }

  // Days
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate();
    const events = ROMI_DATA.calendarEvents.filter(e => e.day === d);
    const eventsHtml = events.map(e => `<div class="cal-event ${e.type}" title="${e.title}">${e.title.slice(0,12)}…</div>`).join('');
    cells += `
    <div class="cal-day ${isToday ? 'today' : ''} ${events.length ? 'has-post' : ''}" onclick="toast('Em breve: editor de eventos no calendário!','info')">
      <div class="cal-day-num">${d}</div>
      ${eventsHtml}
    </div>`;
  }

  container.innerHTML = headers + cells;
}

// ── Analytics Page ────────────────────────────────────────
function renderAnalytics() {
  // Render simple funnel
  const funnelData = [
    { label: 'Visitantes', value: '—', desc: 'Sessões no site/app', color: 'var(--info)' },
    { label: 'Cadastros', value: '—', desc: 'Usuários registrados', color: 'var(--primary)' },
    { label: 'Solicitações', value: '—', desc: 'Serviços pedidos', color: 'var(--accent)' },
    { label: 'Concluídos', value: '—', desc: 'Serviços finalizados', color: 'var(--success)' },
  ];

  const funnel = document.getElementById('funnel-container');
  if (funnel) {
    funnel.innerHTML = funnelData.map((f, i) => `
      <div style="flex:1;text-align:center;position:relative">
        <div style="background:${f.color};color:#fff;border-radius:12px;padding:20px 16px;margin:0 ${i * 10}px">
          <div style="font-size:24px;font-weight:800">${f.value}</div>
          <div style="font-size:13px;font-weight:700;margin-top:4px">${f.label}</div>
          <div style="font-size:11px;opacity:0.8;margin-top:2px">${f.desc}</div>
        </div>
        ${i < 3 ? '<div style="text-align:center;font-size:20px;color:var(--text-muted);margin:4px 0">▼</div>' : ''}
      </div>`).join('');
  }
}

// ── Dashboard Quickstats ──────────────────────────────────
function renderDashboardChecklist() {
  const total = ROMI_DATA.seoChecklist.length;
  const done = STATE.getChecklistDone();
  const pct = Math.round((done / total) * 100);
  const el = document.getElementById('dash-seo-progress');
  if (el) el.textContent = `SEO: ${done}/${total} itens (${pct}%)`;

  const intDone = ROMI_DATA.integrations.filter(i => (STATE.integrations[i.id] || i.status) === 'connected').length;
  const intEl = document.getElementById('dash-int-count');
  if (intEl) intEl.textContent = `${intDone} de ${ROMI_DATA.integrations.length} integrações ativas`;
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Nav click handlers
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navigate(item.dataset.page);
    });
  });

  // Modal close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // SEO filter
  const seoFilter = document.getElementById('seo-filter');
  if (seoFilter) {
    seoFilter.addEventListener('change', () => renderSeoChecklist(seoFilter.value));
  }

  // Init tabs
  initTabs();

  // Render all components
  renderKPIs();
  renderSeoChecklist();
  renderKeywords();
  renderBlogIdeas();
  renderCampaigns();
  renderSocialIdeas();
  renderEmailFlows();
  renderIntegrations();
  renderCalendar();
  renderAnalytics();
  renderDashboardChecklist();
  updateHeaderIntegrationStatus();

  // Start on dashboard
  navigate('dashboard');

  // Welcome toast
  setTimeout(() => toast('Bem-vindo ao Gerenciador de Marketing do Romi!', 'success'), 600);
});
