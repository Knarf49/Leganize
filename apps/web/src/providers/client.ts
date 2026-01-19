import { Client } from "@langchain/langgraph-sdk";

export function createClient(apiUrl: string, apiKey: string | undefined) {
  // Remove trailing slash from apiUrl to prevent double slashes in API calls
  const normalizedUrl = apiUrl.replace(/\/$/, "");

  return new Client({
    apiKey,
    apiUrl: normalizedUrl,
  });
}
