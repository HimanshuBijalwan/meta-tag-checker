// Checks for Twitter Card meta tag
export function checkTwitterCard(html: string): { exists: boolean; content?: string } {
  const match = html.match(/<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  return match
    ? { exists: true, content: match[1] }
    : { exists: false };
}
