import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

const firebaseConfig = {
  apiKey: "AIzaSyCYUZMgpkT9eOt1YgZqwoM9QsdqAkF-v7o",
  authDomain: "futbol-app-8b521.firebaseapp.com",
  databaseURL: "https://futbol-app-8b521.firebaseio.com",
  projectId: "futbol-app-8b521",
  storageBucket: "futbol-app-8b521.appspot.com",
  messagingSenderId: "173423653380",
  appId: "1:173423653380:web:f553cc0a81931c548b7b51"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default function MyApp(props) {
  const { Component, pageProps } = props;

  // React.useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Futbol App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
