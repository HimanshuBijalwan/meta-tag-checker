// Meta Tag Checker Pro Frontend JS
async function fetchHtmlFromUrl(url) {
  // Use a public CORS proxy for demo (for production, use your own backend)
  const proxy = 'https://corsproxy.io/?';
  try {
    const res = await fetch(proxy + encodeURIComponent(url));
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.text();
  } catch (e) {
    document.getElementById('results').innerHTML = `<div class='alert alert-danger'>Could not fetch HTML. Most websites block this for security reasons (CORS).<br>Try another URL or paste HTML manually.<br><a href='https://github.com/himanshubijalwan/meta-tag-checker#faq' target='_blank'>Learn more</a>.</div>`;
    return '';
  }
}

function checkMetaTags(html) {
  // og:image
  const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  // twitter:card
  const twitterCardMatch = html.match(/<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  // title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  // description
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i);

  return {
    ogImage: ogImageMatch ? ogImageMatch[1] : '',
    twitterCard: twitterCardMatch ? twitterCardMatch[1] : '',
    title: titleMatch ? titleMatch[1] : '',
    description: descMatch ? descMatch[1] : '',
  };
}

function renderResults(results) {
  let output = '<h3>Results:</h3><ul>';
  if(results.ogImage) {
    output += `<li><strong>og:image:</strong> <span class="found">${results.ogImage}</span><br><img src="${results.ogImage}" class="img-preview" alt="og:image preview"></li>`;
  } else {
    output += `<li><strong>og:image:</strong> <span class="missing">Not found</span></li>`;
  }
  output += `<li><strong>twitter:card:</strong> ${results.twitterCard ? `<span class='found'>${results.twitterCard}</span>` : "<span class='missing'>Not found</span>"}</li>`;
  output += `<li><strong>Title:</strong> ${results.title ? `<span class='found'>${results.title}</span>` : "<span class='missing'>Not found</span>"}</li>`;
  output += `<li><strong>Description:</strong> ${results.description ? `<span class='found'>${results.description}</span>` : "<span class='missing'>Not found</span>"}</li>`;
  output += '</ul>';
  document.getElementById('results').innerHTML = output;
}

function renderEditMeta(results) {
  document.getElementById('editMeta').innerHTML = `
    <h3>Edit Meta Tags</h3>
    <label>Title: <input id="editTitle" value="${results.title || ''}" /></label><br>
    <label>Description: <input id="editDesc" value="${results.description || ''}" /></label><br>
    <label>og:image: <input id="editOgImage" value="${results.ogImage || ''}" /></label><br>
    <label>twitter:card: <input id="editTwitterCard" value="${results.twitterCard || ''}" /></label><br>
    <button id="updateMetaBtn">Update HTML</button>
  `;
  document.getElementById('updateMetaBtn').onclick = function() {
    updateHtmlFromMeta();
  };
}

function updateHtmlFromMeta() {
  let html = document.getElementById('htmlInput').value;
  // Replace or insert meta tags
  const title = document.getElementById('editTitle').value;
  const desc = document.getElementById('editDesc').value;
  const ogImage = document.getElementById('editOgImage').value;
  const twitterCard = document.getElementById('editTwitterCard').value;

  // Title
  if (/<title>.*<\/title>/i.test(html)) {
    html = html.replace(/<title>.*<\/title>/i, `<title>${title}</title>`);
  } else {
    html = html.replace(/<head>/i, `<head>\n<title>${title}</title>`);
  }
  // Description
  if (/<meta[^>]+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta[^>]+name=["']description["'][^>]*>/i, `<meta name="description" content="${desc}">`);
  } else {
    html = html.replace(/<head>/i, `<head>\n<meta name="description" content="${desc}">`);
  }
  // og:image
  if (/<meta[^>]+property=["']og:image["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta[^>]+property=["']og:image["'][^>]*>/i, `<meta property="og:image" content="${ogImage}">`);
  } else {
    html = html.replace(/<head>/i, `<head>\n<meta property="og:image" content="${ogImage}">`);
  }
  // twitter:card
  if (/<meta[^>]+name=["']twitter:card["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta[^>]+name=["']twitter:card["'][^>]*>/i, `<meta name="twitter:card" content="${twitterCard}">`);
  } else {
    html = html.replace(/<head>/i, `<head>\n<meta name="twitter:card" content="${twitterCard}">`);
  }
  document.getElementById('htmlInput').value = html;
  const results = checkMetaTags(html);
  renderResults(results);
  renderEditMeta(results);
  renderPreviews(results);
}

document.getElementById('checkBtn').addEventListener('click', function() {
  const html = document.getElementById('htmlInput').value;
  const results = checkMetaTags(html);
  renderResults(results);
  renderEditMeta(results);
  renderPreviews(results);
});

document.getElementById('copyBtn').addEventListener('click', function() {
  const html = document.getElementById('htmlInput').value;
  navigator.clipboard.writeText(html).then(() => {
    document.getElementById('copyBtn').textContent = 'Copied!';
    setTimeout(()=>{document.getElementById('copyBtn').textContent = 'Copy HTML';}, 1200);
  });
});

document.getElementById('fetchBtn').addEventListener('click', async function() {
  const url = document.getElementById('urlInput').value;
  if (!url) return alert('Please enter a URL.');
  document.getElementById('fetchBtn').textContent = 'Fetching...';
  const html = await fetchHtmlFromUrl(url);
  document.getElementById('htmlInput').value = html;
  document.getElementById('fetchBtn').textContent = 'Fetch';
  const results = checkMetaTags(html);
  renderResults(results);
  renderEditMeta(results);
  renderPreviews(results);
});

function renderPreviews(results) {
  // SERP Card
  let serp = `<div style="background:#fff;border:1px solid #e5e7eb;padding:1em 1.5em;border-radius:8px;margin-bottom:1em;max-width:500px;margin:auto;">
    <div style="color:#1a0dab;font-size:1.1em;font-weight:600;">${results.title || 'SERP Title'}</div>
    <div style="color:#006621;font-size:0.95em;">www.example.com</div>
    <div style="color:#545454;font-size:0.98em;">${results.description || 'SERP description goes here.'}</div>
  </div>`;
  // Twitter Card
  let twitter = `<div style="background:#f7f9fa;border:1px solid #cfd9de;padding:1em 1.5em;border-radius:8px;max-width:500px;margin:auto;">
    <div style="color:#1da1f2;font-weight:600;">Twitter Card</div>
    <div style="font-size:1.1em;font-weight:600;">${results.title || 'Twitter Title'}</div>
    <div style="color:#555;">${results.description || 'Twitter description goes here.'}</div>
    ${results.ogImage ? `<img src="${results.ogImage}" style="max-width:100%;border-radius:8px;margin-top:8px;">` : ''}
  </div>`;
  // Social Card
  let social = `<div style="background:#f0f2f5;border:1px solid #d1d5db;padding:1em 1.5em;border-radius:8px;max-width:500px;margin:auto;">
    <div style="color:#4267B2;font-weight:600;">Social Card</div>
    <div style="font-size:1.1em;font-weight:600;">${results.title || 'Social Title'}</div>
    <div style="color:#555;">${results.description || 'Social description goes here.'}</div>
    ${results.ogImage ? `<img src="${results.ogImage}" style="max-width:100%;border-radius:8px;margin-top:8px;">` : ''}
  </div>`;
  document.getElementById('previews').innerHTML = `<h3>Previews</h3>${serp}${twitter}${social}`;
}
