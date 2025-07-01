export interface MetaTagResult {
    url: string;
    isValid: boolean;
    errors?: string[];
    warnings?: string[];
}

export interface CheckerOptions {
    timeout?: number;
    userAgent?: string;
    followRedirects?: boolean;
}