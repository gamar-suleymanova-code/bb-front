// deafult
import ReactDOM from 'react-dom/client';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// custom plugins
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// custom styling
import './assets/style/main.scss';
import store from './store/data';
import { Provider } from 'react-redux';
import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import { imgs } from './content/home';

const Home = lazy(() => import('./pages/Home'));
const Greeting = lazy(() => import('./pages/Greeting'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const router = createBrowserRouter([
  {
    path: "/BudgetBuddy",
    element: <Layout />, // This will render Nav, Footer, and dynamically loaded content
    children: [
      {
        index: true,
        // path: "/BudgetBuddy/home",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home imgs={imgs}/>
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "greeting",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Greeting />
          </Suspense>
        ),
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />;
      </Provider>
    </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
