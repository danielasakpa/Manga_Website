import React from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter, ScrollRestoration } from "react-router-dom";
import { MangaProvider } from './context/MangaContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
      </MangaProvider>
    </div>
  )
}

export default App