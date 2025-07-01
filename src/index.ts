// Entry point for the Meta Tag Checker
import { checkMetaOgImage } from './features/metaOgImageChecker';
import { checkTwitterCard } from './features/twitterCardChecker';
import { checkSerp } from './features/serpChecker';

export async function runMetaTagChecks(html: string) {
  return {
    ogImage: checkMetaOgImage(html),
    twitterCard: checkTwitterCard(html),
    serp: checkSerp(html),
  };
}

// Example usage (for demonstration)
// (In real use, you would get HTML from a fetch or file read)
const exampleHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta property="og:image" content="https://example.com/image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <title>Example Page</title>
  <meta name="description" content="This is an example page.">
</head>
<body></body>
</html>
`;

runMetaTagChecks(exampleHtml).then(console.log);
