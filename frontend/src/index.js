import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./redux/store";
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "549338674585-av5ja8h1j3jqd2rvljkegmdlhvu9o3tt.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
            <App />
        </GoogleOAuthProvider>
    </Provider>
);

