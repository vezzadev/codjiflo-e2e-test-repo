// API Client - rewritten with better error handling
export class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string, timeout = 5000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  async get<T>(path: string): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json() as Promise<T>;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json() as Promise<T>;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
