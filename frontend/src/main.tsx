
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import {store} from './utils/redux/app/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(

         <Provider store={store}>
              

               
         <GoogleOAuthProvider clientId="974795426790-q8r39lnd0o5sp196q0et21jrvk1gpujo.apps.googleusercontent.com">
        <App />
        </GoogleOAuthProvider>
        
    </Provider>

)
