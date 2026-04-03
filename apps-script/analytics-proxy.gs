var PROPERTY_ID = '502209959';

function doGet(e) {
  var days = '30';
  if (e && e.parameter && e.parameter.days) {
    days = e.parameter.days;
  }
  var dateRange = { startDate: days + 'daysAgo', endDate: 'today' };
  try {
    var data = {
      overview: getOverview(dateRange),
      events: getTopEvents(dateRange),
      pages: getTopPages(dateRange),
      traffic: getTrafficSources(dateRange),
      lastUpdated: new Date().toISOString()
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

function runReport(body) {
  var url = 'https://analyticsdata.googleapis.com/v1beta/properties/' + PROPERTY_ID + ':runReport';
  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
    payload: JSON.stringify(body),
    muteHttpExceptions: true
  };
  var res = UrlFetchApp.fetch(url, options);
  return JSON.parse(res.getContentText());
}

function getOverview(dateRange) {
  var result = runReport({
    dateRanges: [dateRange],
    metrics: [
      { name: 'sessions' },
      { name: 'activeUsers' },
      { name: 'newUsers' },
      { name: 'bounceRate' },
      { name: 'averageSessionDuration' }
    ]
  });
  if (!result.rows || !result.rows[0]) {
    return {};
  }
  var v = result.rows[0].metricValues;
  return {
    sessions: v[0].value,
    activeUsers: v[1].value,
    newUsers: v[2].value,
    bounceRate: (parseFloat(v[3].value) * 100).toFixed(1),
    avgDuration: Math.round(parseFloat(v[4].value))
  };
}

function getTopEvents(dateRange) {
  var result = runReport({
    dateRanges: [dateRange],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit: 10
  });
  if (!result.rows) {
    return [];
  }
  return result.rows.map(function(row) {
    return {
      name: row.dimensionValues[0].value,
      count: parseInt(row.metricValues[0].value)
    };
  });
}

function getTopPages(dateRange) {
  var result = runReport({
    dateRanges: [dateRange],
    dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 8
  });
  if (!result.rows) {
    return [];
  }
  return result.rows.map(function(row) {
    return {
      title: row.dimensionValues[0].value,
      path: row.dimensionValues[1].value,
      views: parseInt(row.metricValues[0].value),
      sessions: parseInt(row.metricValues[1].value)
    };
  });
}

function getTrafficSources(dateRange) {
  var result = runReport({
    dateRanges: [dateRange],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 8
  });
  if (!result.rows) {
    return [];
  }
  var total = 0;
  for (var i = 0; i < result.rows.length; i++) {
    total += parseInt(result.rows[i].metricValues[0].value);
  }
  return result.rows.map(function(row) {
    var sessions = parseInt(row.metricValues[0].value);
    return {
      channel: row.dimensionValues[0].value,
      sessions: sessions,
      users: parseInt(row.metricValues[1].value),
      pct: total > 0 ? Math.round((sessions / total) * 100) : 0
    };
  });
}
