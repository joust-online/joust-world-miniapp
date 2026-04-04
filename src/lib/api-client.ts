import superjson from "superjson";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const text = await response.text();

    if (!response.ok) {
      let errorData: { error: string };
      try {
        errorData = superjson.parse(text);
      } catch {
        try {
          errorData = JSON.parse(text);
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
      }
      throw new Error(errorData.error);
    }

    try {
      return superjson.parse<T>(text);
    } catch {
      // Fall back to plain JSON for backwards compatibility during migration
      return JSON.parse(text) as T;
    }
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
      const qs = searchParams.toString();
      if (qs) url += (endpoint.includes("?") ? "&" : "?") + qs;
    }
    return this.request<T>(url);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? superjson.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? superjson.stringify(data) : undefined,
    });
  }
}

export const apiClient = new ApiClient();
