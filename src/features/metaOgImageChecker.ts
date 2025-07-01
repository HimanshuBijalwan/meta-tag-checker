// Checks for Open Graph og:image meta tag
export function checkMetaOgImage(html: string): { exists: boolean; content?: string } {
  const match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  return match
    ? { exists: true, content: match[1] }
    : { exists: false };
}
