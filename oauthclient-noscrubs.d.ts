declare module 'oauthclient-noscrubs' {
    interface OAuthClientConfig {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      authEndpoint: string;
      tokenEndpoint: string;
      scopes?: string[];
    }
  
    interface TokenResponse {
      access_token: string;
      refresh_token?: string;
      expires_in?: number;
    }
  
    export default class OAuthClient {
      constructor(config: OAuthClientConfig);
      startAuthFlow(): string;
      handleCallback(params: { code: string }): Promise<TokenResponse>;
    }
  }
  