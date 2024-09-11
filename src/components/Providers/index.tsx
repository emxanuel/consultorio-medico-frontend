"use client"

import { PrimeReactProvider } from 'primereact/api'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface Props {
    children: React.ReactNode;
}

const Providers: React.FC<Props>  = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <PrimeReactProvider>
                {children}
            </PrimeReactProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default Providers