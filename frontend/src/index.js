import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./redux/store";
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "your_google_client";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
            <App />
        </GoogleOAuthProvider>
    </Provider>
);

