// Checks for SERP-related meta tags (title, description)
export function checkSerp(html: string): {
  title: string | null;
  description: string | null;
} {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  return {
    title: titleMatch ? titleMatch[1] : null,
    description: descMatch ? descMatch[1] : null,
  };
}
