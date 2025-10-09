import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {SnackbarProvider} from "notistack";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <SnackbarProvider hideIconVariant
                maxSnack={3}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={3000}
            >
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </StrictMode>,
)
