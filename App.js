import React, { useState, useEffect } from 'react';
import { Button, Text, View, Image, ActivityIndicator, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useAuthRequest } from 'expo-auth-session';
import OAuthClient from 'oauthclient-noscrubs';

// OAuthClient configuration (adjust as needed)
const oauthClient = new OAuthClient({
  clientId: '**replace***',
  clientSecret: '**repalce**',
  redirectUri: '**replace**', // Replace with your Expo redirect URI
  authEndpoint: 'https://accounts.google.com/o/oauth2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  scopes: ['profile', 'email' ], // Added the required scope
});

const App = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: oauthClient.clientId,
      redirectUri: oauthClient.redirectUri,
      scopes: oauthClient.scopes,
    },
    {
      authorizationEndpoint: oauthClient.authEndpoint,
      tokenEndpoint: oauthClient.tokenEndpoint,
    }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      // Debugging: Log the response to check if we are getting the code
      console.log('OAuth response:', response);

      // Use oauthclient-noscrubs to handle the callback
      fetchTokens(response.params.code);
    } else if (response?.type === 'error') {
      // Handle error cases
      console.error('OAuth error:', response.error);
      Alert.alert('OAuth Error', response.error_description);
    }
  }, [response]);

  const fetchTokens = async (code) => {
    try {
      setLoading(true);

      // Using oauthclient-noscrubs to handle the callback
      const tokens = await oauthClient.handleCallback({
        code,
        redirectUri: oauthClient.redirectUri,
      });

      console.log('Tokens received:', tokens);

      if (tokens.access_token) {
        // Store token securely
        await SecureStore.setItemAsync('access_token', tokens.access_token);
        fetchUserProfile(tokens.access_token);
      } else {
        Alert.alert('OAuth Error', 'Failed to retrieve access token');
      }
    } catch (error) {
      console.error('Error fetching tokens:', error);
      Alert.alert('Error', 'Something went wrong while fetching tokens.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (accessToken) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const profile = await response.json();
      console.log('User Profile:', profile);
      setUserData(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'Failed to fetch user profile.');
    }
  };

  const handleLogin = () => {
    promptAsync();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>OAuth Login</Text>

      {!userData ? (
        <Button
          title={loading ? 'Logging in...' : 'Login with Google'}
          onPress={handleLogin}
          disabled={loading}
        />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>Welcome, {userData.name}!</Text>
          <Text>Email: {userData.email}</Text>
          <Image
            source={{ uri: userData.picture }}
            style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }}
          />
        </View>
      )}

      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default App;
