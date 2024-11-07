export interface THttpArgs {
  url: string;
  options?: {
    method?: string;
    body?: string;
    headers?: any;
  };
}

export interface TAppStore {
  authToken: string | null;
}

export type Message = {
  senderName: string;
  recipientName: string;
  message: string;
};