import React from 'react'
import './App.css';
import MainRouter from './MainRouter'
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: true,
        retry: true,
      },
    },
  });


  return (
    <div>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <MainRouter />
          </QueryClientProvider>
          {/* <ScrollRestoration /> */}
          <ToastContainer newestOnTop toastClassName="toast-con" />
        </BrowserRouter>
    </div>
  )
}

export default App