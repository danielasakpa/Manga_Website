import React from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter, ScrollRestoration } from "react-router-dom";
import { MangaProvider } from './context/MangaContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from 'react-toastify';

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
      <MangaProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <MainRouter />
          </QueryClientProvider>
          {/* <ScrollRestoration /> */}
        </BrowserRouter>
        <ToastContainer newestOnTop />
      </MangaProvider>
    </div>
  )
}

export default App