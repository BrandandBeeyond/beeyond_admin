import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { basePath } from './context/constants'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'

import 'bootstrap/dist/css/bootstrap.min.css';
import { PersistGate } from 'redux-persist/integration/react'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={basePath}>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
)
