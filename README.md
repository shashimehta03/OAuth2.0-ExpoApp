
# OAuth Login with Google - Expo React Native App

This project demonstrates how to integrate OAuth authentication with Google in a React Native app using Expo. The authentication flow is handled using the `oauthclient-noscrubs` library, and user data (name, email, and profile picture) is fetched after a successful login.

## Features

- Google OAuth 2.0 authentication
- Fetch user data: Name, Email, Profile Picture
- Built with React Native and Expo
- Custom OAuth client using the `oauthclient-noscrubs` library

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js** installed on your machine
- **Expo CLI** installed:  
  ```bash
  npm install -g expo-cli
  ```

## Setup Instructions

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/oauth-login-expo.git
    cd oauth-login-expo
    ```

2. **Install Dependencies**:
    ```bash
    yarn install
    ```

    Or if you are using npm:

    ```bash
    npm install
    ```

3. **Configure Google OAuth Credentials**:
   - Go to the [Google Developer Console](https://console.developers.google.com/).
   - Create a new project or use an existing one.
   - Enable the **Google+ API**.
   - Create OAuth 2.0 credentials and get your `clientId` and `clientSecret`.
   - Add `https://auth.expo.io/@your-username/your-app-slug` as the redirect URI in the Google OAuth settings.

4. **Modify App Configuration**:
    - Replace the `clientId` and `clientSecret` in the `App.js` file with your Google OAuth credentials.
    - Make sure the `redirectUri` is set correctly to the Expo redirect URL:
      ```javascript
      const redirectUri = 'https://auth.expo.io/@your-username/your-app-slug';
      ```

5. **Run the App**:
    - Start the app using Expo CLI:
      ```bash
      expo start
      ```

    - Scan the QR code with the Expo Go app or run it on an emulator.

## Code Walkthrough

### OAuthClient Setup

- We use the `oauthclient-noscrubs` library to handle the OAuth 2.0 flow.
- The `redirectUri` is configured using Expo's `AuthSession` library to handle the OAuth callback.

### Authentication Flow

1. When the user presses the "Login with Google" button, the app redirects them to the Google login page.
2. After the user successfully logs in and grants permissions, Google redirects back to the app with an authorization code.
3. The app exchanges the authorization code for an access token using the `oauthclient-noscrubs` library.
4. The access token is used to fetch the user’s profile data from Google.

### Displaying User Data

After a successful login, the user’s name, email, and profile picture are displayed in the app.

## Troubleshooting

- **Redirect URI issues**: Ensure that the redirect URI in the Google Developer Console matches the one used in your app.
- **Network errors**: Make sure your device or emulator has internet access.



## Acknowledgments

- [Expo](https://expo.dev/) - For providing an easy-to-use platform for building React Native apps.
- [OAuthClient-noscrubs](https://github.com/shashimehta03/OAuth2.0-Package) - OAuth 2.0 client library for handling Google authentication.
```

This README provides instructions on setting up, running, and troubleshooting your app.
