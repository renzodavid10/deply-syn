/* import { StrictMode } from 'react'
 */
import { createRoot } from 'react-dom/client'
import './index.css'
/* import App from './App.tsx'
import Formula from './AppFormulario.tsx'
import App2 from './App2.tsx' */
import { Toaster } from 'react-hot-toast'
import { AppRouter } from './Routes/Route.tsx'
import { Provider } from 'react-redux'
import { store } from './store/storeRedux';
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <BrowserRouter basename='/deply-syn/'>
        <AppRouter />
      </BrowserRouter>
      <Toaster />
    </Provider>
    {/*<App />*/}
  </>

)
