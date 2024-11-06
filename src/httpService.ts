import AppStore from "./AppStore";
import { THttpArgs } from "./types";

//Request backend
export const httpService = {
  fetch: async ({url, options}: THttpArgs): Promise<any> => {
    return await fetch(`http://localhost:8080${url}`, options)
  },
  fetchWithAuth: async ({url, options}: THttpArgs): Promise<any> => {
    const optionsWithAuth = { // extend options and add auth headers
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${AppStore.authToken}`,
      }
    }
    return await fetch(`http://localhost:8080${url}`, optionsWithAuth)
  },
}

export default httpService;