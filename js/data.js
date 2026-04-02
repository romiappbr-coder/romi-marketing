// ============================================================
//  ROMI — Dados e Conteúdo Estratégico
// ============================================================

const ROMI_DATA = {

  // ── Métricas do Dashboard ──────────────────────────────
  kpis: [
    { id: 'users', label: 'Usuários Cadastrados', value: '0', trend: null, icon: '👤', color: 'orange', desc: 'Total de usuários na plataforma' },
    { id: 'pros', label: 'Profissionais Ativos', value: '0', trend: null, icon: '🔨', color: 'green', desc: 'Profissionais com perfil ativo' },
    { id: 'services', label: 'Serviços Solicitados', value: '0', trend: null, icon: '📋', color: 'blue', desc: 'Total de solicitações' },
    { id: 'conversion', label: 'Taxa de Conversão', value: '0%', trend: null, icon: '📈', color: 'yellow', desc: 'Visitantes que se cadastram' },
  ],

  // ── SEO: Palavras-chave ────────────────────────────────
  keywords: [
    { kw: 'pedreiro em Fortaleza', volume: 1600, difficulty: 32, position: null, intent: 'comercial', audience: 'owner', priority: 'alta' },
    { kw: 'eletricista em Fortaleza', volume: 1300, difficulty: 28, position: null, intent: 'comercial', audience: 'owner', priority: 'alta' },
    { kw: 'encanador Fortaleza', volume: 1100, difficulty: 25, position: null, intent: 'comercial', audience: 'owner', priority: 'alta' },
    { kw: 'pintor de paredes Fortaleza', volume: 720, difficulty: 20, position: null, intent: 'comercial', audience: 'owner', priority: 'alta' },
    { kw: 'serviços de reforma residencial CE', volume: 880, difficulty: 35, position: null, intent: 'comercial', audience: 'owner', priority: 'alta' },
    { kw: 'contratar pedreiro app', volume: 480, difficulty: 18, position: null, intent: 'transacional', audience: 'owner', priority: 'média' },
    { kw: 'como conseguir clientes construção civil', volume: 590, difficulty: 22, position: null, intent: 'informacional', audience: 'pro', priority: 'alta' },
    { kw: 'trabalhar como pedreiro autônomo', volume: 430, difficulty: 19, position: null, intent: 'informacional', audience: 'pro', priority: 'média' },
    { kw: 'aplicativo para profissionais da construção', volume: 320, difficulty: 15, position: null, intent: 'transacional', audience: 'pro', priority: 'alta' },
    { kw: 'encontrar serviços de manutenção residencial', volume: 260, difficulty: 17, position: null, intent: 'informacional', audience: 'owner', priority: 'média' },
    { kw: 'quanto custa reforma apartamento Fortaleza', volume: 1400, difficulty: 40, position: null, intent: 'informacional', audience: 'owner', priority: 'média' },
    { kw: 'gesseiro Fortaleza', volume: 390, difficulty: 18, position: null, intent: 'comercial', audience: 'owner', priority: 'média' },
  ],

  // ── SEO: Checklist Técnico ────────────────────────────
  seoChecklist: [
    { id: 'sc1', label: 'Google Search Console configurado', desc: 'Verificar propriedade do site e enviar sitemap', priority: 'alta', done: false, category: 'técnico' },
    { id: 'sc2', label: 'Google Analytics instalado no site', desc: 'Código de rastreamento em todas as páginas', priority: 'alta', done: false, category: 'técnico' },
    { id: 'sc3', label: 'Sitemap XML criado e enviado ao Google', desc: 'Facilita indexação de todas as páginas', priority: 'alta', done: false, category: 'técnico' },
    { id: 'sc4', label: 'Robots.txt configurado', desc: 'Permite que o Google acesse as páginas corretas', priority: 'alta', done: false, category: 'técnico' },
    { id: 'sc5', label: 'Site com HTTPS ativo', desc: 'Certificado SSL é fator de ranqueamento', priority: 'alta', done: false, category: 'técnico' },
    { id: 'sc6', label: 'Velocidade de carregamento < 3 segundos', desc: 'Testar com PageSpeed Insights do Google', priority: 'alta', done: false, category: 'técnico' },
    { id: 'sc7', label: 'Site responsivo para mobile', desc: 'Maioria das buscas locais vem de celular', priority: 'alta', done: false, category: 'técnico' },
    { id: 'sc8', label: 'Perfil no Google Meu Negócio criado', desc: 'Essencial para buscas locais em Fortaleza', priority: 'alta', done: false, category: 'local' },
    { id: 'sc9', label: 'Fotos e informações completas no Google Meu Negócio', desc: 'Aumenta CTR nos resultados de busca', priority: 'média', done: false, category: 'local' },
    { id: 'sc10', label: 'Title tags otimizadas (até 60 caracteres)', desc: 'Incluir palavra-chave principal e cidade', priority: 'alta', done: false, category: 'on-page' },
    { id: 'sc11', label: 'Meta descriptions atraentes (até 160 caracteres)', desc: 'Aumenta taxa de clique nos resultados', priority: 'alta', done: false, category: 'on-page' },
    { id: 'sc12', label: 'Blog com pelo menos 4 artigos publicados', desc: 'Conteúdo gera tráfego orgânico consistente', priority: 'alta', done: false, category: 'conteúdo' },
    { id: 'sc13', label: 'Schema markup para serviços locais', desc: 'Dados estruturados melhoram rich snippets', priority: 'média', done: false, category: 'técnico' },
    { id: 'sc14', label: 'URLs amigáveis e descritivas', desc: 'Ex: /servicos/eletricista-fortaleza', priority: 'média', done: false, category: 'técnico' },
    { id: 'sc15', label: 'Avaliações no Google Meu Negócio (min. 10)', desc: 'Reviews aumentam credibilidade local', priority: 'alta', done: false, category: 'local' },
  ],

  // ── Blog: Ideias de Conteúdo ───────────────────────────
  blogIdeas: [
    { title: 'Como contratar um pedreiro confiável em Fortaleza', audience: 'owner', kw: 'pedreiro em Fortaleza', stage: 'ideia', type: 'guia', priority: 'alta' },
    { title: '10 perguntas para fazer antes de contratar um eletricista', audience: 'owner', kw: 'contratar eletricista', stage: 'ideia', type: 'lista', priority: 'alta' },
    { title: 'Quanto custa uma reforma de banheiro em Fortaleza em 2024?', audience: 'owner', kw: 'custo reforma banheiro Fortaleza', stage: 'ideia', type: 'guia', priority: 'alta' },
    { title: 'Como se tornar pedreiro autônomo e conseguir mais clientes', audience: 'pro', kw: 'trabalhar como pedreiro autônomo', stage: 'ideia', type: 'guia', priority: 'alta' },
    { title: 'Checklist: o que verificar antes de fazer uma pequena reforma', audience: 'owner', kw: 'checklist reforma residencial', stage: 'ideia', type: 'lista', priority: 'média' },
    { title: 'Dicas para eletricistas aumentarem sua renda em Fortaleza', audience: 'pro', kw: 'como ganhar mais como eletricista', stage: 'ideia', type: 'lista', priority: 'média' },
    { title: 'Serviços de manutenção que todo dono de casa precisa conhecer', audience: 'owner', kw: 'manutenção residencial preventiva', stage: 'ideia', type: 'guia', priority: 'média' },
    { title: 'Como o Romi conecta profissionais e clientes em Fortaleza', audience: 'all', kw: 'plataforma serviços construção Fortaleza', stage: 'ideia', type: 'institucional', priority: 'alta' },
    { title: 'Encanador ou bombeiro hidráulico: quando chamar cada um?', audience: 'owner', kw: 'diferença encanador bombeiro hidráulico', stage: 'ideia', type: 'educativo', priority: 'baixa' },
    { title: 'Como divulgar seu trabalho de pedreiro pela internet', audience: 'pro', kw: 'divulgar serviços construção civil online', stage: 'ideia', type: 'guia', priority: 'média' },
  ],

  // ── Tráfego Pago: Campanhas Sugeridas ─────────────────
  campaigns: [
    {
      id: 'gads1',
      platform: 'Google Ads',
      name: 'Captura - Donos de Casa (Busca)',
      objective: 'Cadastros de usuários',
      audience: 'Donos de casa buscando serviços',
      budget: 30,
      status: 'inativa',
      keywords: ['pedreiro Fortaleza', 'eletricista Fortaleza', 'encanador Fortaleza', 'serviços construção civil CE'],
      cta: 'Solicite um orçamento grátis',
      notes: 'Campanha de search com foco em conversão. Segmentar por raio de 20km de Fortaleza.',
    },
    {
      id: 'gads2',
      platform: 'Google Ads',
      name: 'Captura - Profissionais (Busca)',
      objective: 'Cadastros de profissionais',
      audience: 'Pedreiros, eletricistas, encanadores buscando trabalho',
      budget: 20,
      status: 'inativa',
      keywords: ['como conseguir clientes construção', 'trabalho de pedreiro Fortaleza', 'app para profissionais construção'],
      cta: 'Cadastre-se e receba chamados',
      notes: 'Foco em profissionais autônomos. Anúncios com proposta de valor clara: mais trabalho.',
    },
    {
      id: 'meta1',
      platform: 'Meta Ads',
      name: 'Awareness - Donos de Casa (Feed/Stories)',
      objective: 'Reconhecimento de marca',
      audience: '25-55 anos, Fortaleza, interesses: casa, reforma, construção',
      budget: 25,
      status: 'inativa',
      format: 'Imagem + Carrossel',
      cta: 'Saiba mais',
      notes: 'Campanha de topo de funil. Mostrar problema que o Romi resolve. Usar depoimentos reais.',
    },
    {
      id: 'meta2',
      platform: 'Meta Ads',
      name: 'Conversão - Profissionais (Feed)',
      objective: 'Cadastros de profissionais',
      audience: '22-50 anos homens, Fortaleza, interesses: construção civil, ferramentas, trabalho autônomo',
      budget: 20,
      status: 'inativa',
      format: 'Vídeo curto (15-30s)',
      cta: 'Cadastre-se agora',
      notes: 'Abordagem direta: "Você é pedreiro/eletricista? Receba pedidos de trabalho pelo Romi."',
    },
    {
      id: 'meta3',
      platform: 'Meta Ads',
      name: 'Retargeting - Visitantes do site',
      objective: 'Reconversão de visitantes',
      audience: 'Público personalizado: visitaram o site nos últimos 30 dias',
      budget: 15,
      status: 'inativa',
      format: 'Carrossel dinâmico',
      cta: 'Complete seu cadastro',
      notes: 'Reativar visitantes que não converteram. Oferecer benefício exclusivo (ex: primeiro pedido prioritário).',
    },
  ],

  // ── Redes Sociais: Calendário e Ideias ────────────────
  socialIdeas: [
    { id: 'si1', type: 'educativo', title: 'Antes de contratar: 3 perguntas essenciais', platform: 'instagram', audience: 'owner', format: 'carrossel', frequency: 'semanal', caption: 'Antes de contratar qualquer profissional, faça essas 3 perguntas. Salva esse post! 📌' },
    { id: 'si2', type: 'prova_social', title: 'Depoimento de profissional cadastrado', platform: 'instagram', audience: 'pro', format: 'stories/reels', frequency: 'semanal', caption: 'Mais um profissional que encontrou clientes pelo Romi. Pode ser você também! 👷' },
    { id: 'si3', type: 'prova_social', title: 'Antes e depois de uma reforma', platform: 'instagram', audience: 'owner', format: 'carrossel', frequency: 'quinzenal', caption: 'Transformação completa! Do problema à solução com profissionais do Romi. ✅' },
    { id: 'si4', type: 'educativo', title: 'Checklist de manutenção residencial', platform: 'instagram', audience: 'owner', format: 'carrossel', frequency: 'mensal', caption: 'Salva para não esquecer! Esses cuidados básicos evitam problemas maiores. 🏠' },
    { id: 'si5', type: 'engajamento', title: 'Enquete: qual serviço você mais procura?', platform: 'instagram', audience: 'all', format: 'stories', frequency: 'semanal', caption: 'Conta pra gente! Qual serviço você mais precisa em casa?' },
    { id: 'si6', type: 'institucional', title: 'Como funciona o Romi em 3 passos', platform: 'instagram', audience: 'all', format: 'reels', frequency: 'mensal', caption: 'É simples assim! Encontre o profissional certo sem complicação. 🔨' },
    { id: 'si7', type: 'educativo', title: 'Dica rápida: como evitar vazamentos', platform: 'instagram', audience: 'owner', format: 'reels', frequency: 'semanal', caption: 'Essa dica simples pode te poupar uma fortuna. Compartilha com quem precisa! 💧' },
    { id: 'si8', type: 'pro_content', title: 'Dica para eletricistas: organize seu dia', platform: 'instagram', audience: 'pro', format: 'carrossel', frequency: 'quinzenal', caption: 'Para os profissionais: essas dicas de organização vão aumentar sua produtividade ⚡' },
  ],

  // ── Email Marketing: Fluxos de Automação ──────────────
  emailFlows: [
    {
      id: 'ef1',
      name: 'Boas-vindas — Dono de Casa',
      trigger: 'Cadastro de novo usuário',
      audience: 'Donos de casa',
      emails: [
        { delay: '0', subject: 'Bem-vindo ao Romi! Veja como funciona', objective: 'Apresentar a plataforma e próximos passos' },
        { delay: '2 dias', subject: 'Já sabe o que procura? Veja os profissionais perto de você', objective: 'Engajar com a primeira solicitação de serviço' },
        { delay: '5 dias', subject: 'Dica: como escolher o profissional certo no Romi', objective: 'Educação e confiança na plataforma' },
        { delay: '10 dias', subject: 'Tem alguma dúvida? Estamos aqui para ajudar', objective: 'Reengajamento de usuários inativos' },
      ]
    },
    {
      id: 'ef2',
      name: 'Boas-vindas — Profissional',
      trigger: 'Cadastro de novo profissional',
      audience: 'Profissionais da construção',
      emails: [
        { delay: '0', subject: 'Cadastro recebido! Veja como completar seu perfil', objective: 'Orientar para completar o perfil (fotos, especialidades)' },
        { delay: '1 dia', subject: 'Perfil completo = mais clientes. Veja como melhorar o seu', objective: 'Aumentar qualidade do perfil' },
        { delay: '4 dias', subject: 'Primeiro chamado recebido? Saiba como responder bem', objective: 'Educar sobre boas práticas de atendimento' },
        { delay: '7 dias', subject: 'Dica para conseguir as primeiras avaliações no Romi', objective: 'Construção de reputação inicial' },
      ]
    },
    {
      id: 'ef3',
      name: 'Reengajamento — Inativos',
      trigger: '30 dias sem atividade',
      audience: 'Usuários ou profissionais inativos',
      emails: [
        { delay: '0', subject: 'Sentimos sua falta! O que mudou no Romi', objective: 'Apresentar novidades e reengajar' },
        { delay: '5 dias', subject: 'Precisa de um profissional? Temos novos cadastrados perto de você', objective: 'Oferta específica para reativar' },
      ]
    },
    {
      id: 'ef4',
      name: 'Pós-serviço',
      trigger: 'Serviço marcado como concluído',
      audience: 'Donos de casa',
      emails: [
        { delay: '1 dia', subject: 'Como foi o serviço? Avalie o profissional', objective: 'Coletar avaliação e fortalecer reputação da plataforma' },
        { delay: '30 dias', subject: 'Precisa de mais algum serviço? Temos profissionais disponíveis', objective: 'Estimular nova solicitação / retenção' },
      ]
    },
  ],

  // ── Integrações ───────────────────────────────────────
  integrations: [
    {
      id: 'ga4',
      name: 'Google Analytics 4',
      logo: '📊',
      desc: 'Rastreie visitantes, sessões, conversões e comportamento no site e no app.',
      status: 'disconnected',
      category: 'analytics',
      setupSteps: [
        'Acesse analytics.google.com e crie uma conta para o Romi',
        'Crie uma propriedade GA4 (escolha "Web" ou "Web + App")',
        'Copie o Measurement ID (formato: G-XXXXXXXXXX)',
        'Adicione o snippet de código no <head> de todas as páginas',
        'Configure eventos de conversão: cadastro_usuario, cadastro_profissional, solicitacao_servico',
        'Vincule ao Google Search Console e Google Ads',
      ],
      metrics: ['Sessões', 'Usuários únicos', 'Taxa de rejeição', 'Conversões', 'Páginas mais acessadas'],
      docsUrl: 'https://support.google.com/analytics',
    },
    {
      id: 'gsc',
      name: 'Google Search Console',
      logo: '🔍',
      desc: 'Monitore o desempenho de SEO: cliques, impressões, posições e cobertura de indexação.',
      status: 'disconnected',
      category: 'seo',
      setupSteps: [
        'Acesse search.google.com/search-console',
        'Adicione a propriedade com a URL do site do Romi',
        'Verifique a propriedade (recomendado: via Google Analytics se já configurado)',
        'Envie o sitemap.xml na seção "Sitemaps"',
        'Monitore semanalmente: cliques, CTR e erros de cobertura',
      ],
      metrics: ['Cliques orgânicos', 'Impressões', 'CTR médio', 'Posição média', 'Páginas indexadas'],
      docsUrl: 'https://support.google.com/webmasters',
    },
    {
      id: 'gads',
      name: 'Google Ads',
      logo: '🎯',
      desc: 'Gerencie campanhas de busca e display. Alcance usuários no momento da intenção de compra.',
      status: 'disconnected',
      category: 'paid',
      setupSteps: [
        'Acesse ads.google.com e crie uma conta para o Romi',
        'Vincule ao Google Analytics 4 para importar conversões',
        'Instale a tag do Google Ads no site para rastrear conversões',
        'Configure conversões: cadastro e solicitação de serviço',
        'Crie a primeira campanha de Pesquisa com foco em Fortaleza',
        'Configure extensões de anúncio: sitelinks, chamadas, local',
      ],
      metrics: ['Impressões', 'Cliques', 'CTR', 'CPC médio', 'Conversões', 'CPA', 'ROAS'],
      docsUrl: 'https://support.google.com/google-ads',
    },
    {
      id: 'meta',
      name: 'Meta Ads (Facebook/Instagram)',
      logo: '📱',
      desc: 'Anúncios no Facebook e Instagram. Segmentação detalhada por interesses, localização e comportamento.',
      status: 'disconnected',
      category: 'paid',
      setupSteps: [
        'Acesse business.facebook.com e crie um Business Manager para o Romi',
        'Adicione a Página do Instagram/Facebook ao Business Manager',
        'Crie um Pixel do Meta e instale no site',
        'Configure os eventos padrão: PageView, Lead, CompleteRegistration',
        'Crie um Catálogo de Serviços se necessário',
        'Vincule uma conta de anúncios ao Business Manager',
        'Verifique o domínio do site nas configurações do Business Manager',
      ],
      metrics: ['Alcance', 'Impressões', 'CPM', 'Cliques no link', 'CPC', 'Leads', 'CPL', 'ROAS'],
      docsUrl: 'https://business.facebook.com/help',
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp / Email',
      logo: '✉️',
      desc: 'Plataforma de email marketing para criar, enviar e automatizar campanhas de email.',
      status: 'disconnected',
      category: 'email',
      setupSteps: [
        'Crie uma conta gratuita em mailchimp.com (até 500 contatos grátis)',
        'Crie um público (lista) separado para donos de casa e profissionais',
        'Configure a integração via API com o site/app do Romi',
        'Crie os fluxos de automação de boas-vindas',
        'Autentique o domínio de envio (evita spam)',
        'Teste o envio com uma lista pequena antes de escalar',
      ],
      metrics: ['Taxa de abertura', 'Taxa de cliques', 'Descadastramentos', 'Conversões por email'],
      docsUrl: 'https://mailchimp.com/help',
    },
    {
      id: 'semrush',
      name: 'SEMrush / Ubersuggest',
      logo: '📈',
      desc: 'Ferramenta de SEO para pesquisa de palavras-chave, análise de concorrentes e auditoria do site.',
      status: 'disconnected',
      category: 'seo',
      setupSteps: [
        'Crie uma conta em semrush.com (versão gratuita disponível)',
        'Adicione o domínio do Romi para monitoramento',
        'Configure rastreamento de posições para as palavras-chave prioritárias',
        'Execute uma auditoria técnica do site mensalmente',
        'Analise os concorrentes para encontrar oportunidades de palavras-chave',
      ],
      metrics: ['Posições de palavras-chave', 'Tráfego orgânico estimado', 'Backlinks', 'Erros técnicos do site'],
      docsUrl: 'https://www.semrush.com/kb',
    },
  ],

  // ── Calendário de Conteúdo: Eventos Base ──────────────
  calendarEvents: [
    // Abril 2025 (mês atual)
    { day: 2, type: 'ig', title: 'Post: Dica encanamento' },
    { day: 4, type: 'blog', title: 'Blog: Contratar pedreiro' },
    { day: 7, type: 'ig', title: 'Stories: Enquete serviços' },
    { day: 9, type: 'email', title: 'Email: Newsletter semanal' },
    { day: 11, type: 'ig', title: 'Reels: Como funciona Romi' },
    { day: 14, type: 'ads', title: 'Anúncio: Profissionais' },
    { day: 16, type: 'blog', title: 'Blog: Custo reforma' },
    { day: 18, type: 'ig', title: 'Carrossel: Antes e depois' },
    { day: 21, type: 'email', title: 'Email: Dicas para donos de casa' },
    { day: 23, type: 'ig', title: 'Stories: Depoimento profissional' },
    { day: 25, type: 'ads', title: 'Anúncio: Donos de casa' },
    { day: 28, type: 'blog', title: 'Blog: Dicas eletricistas' },
    { day: 30, type: 'ig', title: 'Post: Checklist manutenção' },
  ],
};

// Estado persistente (localStorage)
const STATE = {
  seoChecklist: JSON.parse(localStorage.getItem('romi_seo_checklist') || '{}'),
  kpis: JSON.parse(localStorage.getItem('romi_kpis') || '{}'),
  integrations: JSON.parse(localStorage.getItem('romi_integrations') || '{}'),
  notes: JSON.parse(localStorage.getItem('romi_notes') || '{}'),

  save(key) {
    localStorage.setItem(`romi_${key}`, JSON.stringify(this[key]));
  },

  toggleChecklistItem(id) {
    this.seoChecklist[id] = !this.seoChecklist[id];
    this.save('seoChecklist');
  },

  setKpi(id, value) {
    this.kpis[id] = value;
    this.save('kpis');
  },

  setIntegrationStatus(id, status) {
    this.integrations[id] = status;
    this.save('integrations');
  },

  getChecklistDone() {
    return Object.values(this.seoChecklist).filter(Boolean).length;
  },
};
