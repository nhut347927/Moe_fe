import './index.css'
import ReactDOM from 'react-dom/client'; // Import ReactDOM từ 'react-dom/client'
import { StrictMode } from 'react'; // Import StrictMode từ React
import { Provider } from 'react-redux'; // Import Provider từ react-redux
import App from './App'; // Import App component
import store from './redux/store'; // Import Redux store
import { FilterProvider } from './context/FilterContext'; // Import FilterProvider context
import './assets/style/style.css'; // Import CSS chung

// Sử dụng createRoot cho React 18+
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <FilterProvider> 
        <App />
      </FilterProvider>
    </Provider>
  </StrictMode>
);
