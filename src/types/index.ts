// Types for meta tag checker
export interface OgImageCheckResult {
  exists: boolean;
  content?: string;
}

export interface TwitterCardCheckResult {
  exists: boolean;
  content?: string;
}

export interface SerpCheckResult {
  title: string | null;
  description: string | null;
}
