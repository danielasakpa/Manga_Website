import React from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter } from "react-router-dom";
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
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <MainRouter />
          </QueryClientProvider>
          {/* <ScrollRestoration /> */}
        </BrowserRouter>
    </div>
  )
}

export default App