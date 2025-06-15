// Environment-based API configuration
const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
};

// API endpoints paths
const API_PATHS = {
  communitiesSearch: "/api/communities/search",
  communitiesCreate: "/api/communities/create",
} as const;

// Type-safe function to get API URL
export const getApiUrl = (endpoint: keyof typeof API_PATHS): string => {
  return `${getBaseUrl()}${API_PATHS[endpoint]}`;
};

// Error handling utility
export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

// Generic fetch wrapper with error handling
/**
 * Generic fetch wrapper with error handling and query params support
 * @param endpoint - API endpoint key
 * @param options - fetch options (method, headers, body, etc.)
 * @param queryParams - optional object of query parameters
 */
export async function fetchApi<T>(
  endpoint: keyof typeof API_PATHS,
  options: RequestInit = {},
  queryParams?: Record<string, string | number | boolean | undefined | null>
): Promise<T | null> {
  try {

    // Build query string if queryParams provided
    let url = getApiUrl(endpoint);
    if (queryParams && Object.keys(queryParams).length > 0) {
      const params = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(`❌ API Error (${response.status}):`, {
        endpoint: getApiUrl(endpoint),
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      // Return null instead of throwing for non-ok responses
      return null;
    }

    const data = await response.json();
    console.log(`✅ API Success:`, { endpoint: url });
    return data;
  } catch (error) {
    // Log the error with detailed information
    console.error("❌ API Request Failed:", {
      endpoint: getApiUrl(endpoint),
      error:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : error,
    });

    // Return null instead of throwing
    return null;
  }
}
