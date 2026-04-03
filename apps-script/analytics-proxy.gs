// ============================================================
//  ROMI — GA4 Analytics Proxy
//  Cole este código em script.google.com
// ============================================================

const PROPERTY_ID = '502209959';

function doGet(e) {
  const days = (e && e.parameter && e.parameter.days) ? e.parameter.days : '30';
  const dateRange = { startDate: `${days}daysAgo`, endDate: 'today' };

  try {
    const data = {
      overview:  getOverview(dateRange),
      events:    getTopEvents(dateRange),
      pages:     getTopPages(dateRange),
      traffic:   getTrafficSources(dateRange),
      lastUpdated: new Date().toISOString(),
    };

    return ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Helper: chama a GA4 Data API ──────────────────────────
function runReport(body) {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`;
  const res = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: `Bearer ${ScriptApp.getOAuthToken()}` },
    payload: JSON.stringify(body),
    muteHttpExceptions: true,
  });
  return JSON.parse(res.getContentText());
}

// ── Sessões e Usuários ────────────────────────────────────
function getOverview(dateRange) {
  const result = runReport({
    dateRanges: [dateRange],
    metrics: [
      { name: 'sessions' },
      { name: 'activeUsers' },
      { name: 'newUsers' },
      { name: 'bounceRate' },
      { name: 'averageSessionDuration' },
    ],
  });

  if (!result.rows || !result.rows[0]) return {};
  const v = result.rows[0].metricValues;

  return {
    sessions:    v[0].value,
    activeUsers: v[1].value,
    newUsers:    v[2].value,
    bounceRate:  (parseFloat(v[3].value) * 100).toFixed(1),
    avgDuration: Math.round(parseFloat(v[4].value)),
  };
}

// ── Eventos mais disparados ───────────────────────────────
function getTopEvents(dateRange) {
  const result = runReport({
    dateRanges: [dateRange],
    dimensions: [{ name: 'eventName' }],
    metrics:    [{ name: 'eventCount' }],
    orderBys:   [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit: 10,
  });

  if (!result.rows) return [];
  return result.rows.map(row => ({
    name:  row.dimensionValues[0].value,
    count: parseInt(row.metricValues[0].value),
  }));
}

// ── Páginas mais visitadas ────────────────────────────────
function getTopPages(dateRange) {
  const result = runReport({
    dateRanges: [dateRange],
    dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
    metrics:    [{ name: 'screenPageViews' }, { name: 'sessions' }],
    orderBys:   [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 8,
  });

  if (!result.rows) return [];
  return result.rows.map(row => ({
    title:    row.dimensionValues[0].value,
    path:     row.dimensionValues[1].value,
    views:    parseInt(row.metricValues[0].value),
    sessions: parseInt(row.metricValues[1].value),
  }));
}

// ── Origem do tráfego ─────────────────────────────────────
function getTrafficSources(dateRange) {
  const result = runReport({
    dateRanges: [dateRange],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics:    [{ name: 'sessions' }, { name: 'activeUsers' }],
    orderBys:   [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 8,
  });

  if (!result.rows) return [];

  const total = result.rows.reduce((sum, row) =>
    sum + parseInt(row.metricValues[0].value), 0);

  return result.rows.map(row => ({
    channel:  row.dimensionValues[0].value,
    sessions: parseInt(row.metricValues[0].value),
    users:    parseInt(row.metricValues[1].value),
    pct:      total > 0
      ? Math.round((parseInt(row.metricValues[0].value) / total) * 100)
      : 0,
  }));
}
