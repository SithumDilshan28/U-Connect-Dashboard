import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="851309209874-afr9mu6v9jh7u7g0c60q1os8q53aarkh.apps.googleusercontent.com">
            <Suspense>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </Suspense>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
