"use client"
import React from 'react';
import { Descope } from '@descope/nextjs-sdk';

const AuthPage = () => {
  return (
    <Descope
      flowId="sign-up-or-in"
      onSuccess={() => {
        console.log('Logged in!');
        window.close(); // Optionally close the tab after success
      }}
      onError={() => console.log('Could not log in!')}
      redirectAfterSuccess="/"
      // redirectAfterError="/error-page"
    />
  );
};

export default AuthPage;
