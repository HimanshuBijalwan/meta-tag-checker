// Meta Tag Checker Frontend JS
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
    ogImage: ogImageMatch ? ogImageMatch[1] : null,
    twitterCard: twitterCardMatch ? twitterCardMatch[1] : null,
    title: titleMatch ? titleMatch[1] : null,
    description: descMatch ? descMatch[1] : null,
  };
}

document.getElementById('checkBtn').addEventListener('click', function() {
  const html = document.getElementById('htmlInput').value;
  const results = checkMetaTags(html);
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
});
