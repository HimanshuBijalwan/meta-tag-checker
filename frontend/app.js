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
  output += `<li><strong>og:image:</strong> ${results.ogImage ? results.ogImage : '<span style="color:red">Not found</span>'}</li>`;
  output += `<li><strong>twitter:card:</strong> ${results.twitterCard ? results.twitterCard : '<span style="color:red">Not found</span>'}</li>`;
  output += `<li><strong>Title:</strong> ${results.title ? results.title : '<span style="color:red">Not found</span>'}</li>`;
  output += `<li><strong>Description:</strong> ${results.description ? results.description : '<span style="color:red">Not found</span>'}</li>`;
  output += '</ul>';
  document.getElementById('results').innerHTML = output;
});
