"use client"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query";

let browserQueyClient: QueryClient | undefined = undefined;

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60
            }
        }
    })
}

function getQueryClient() {
    if (isServer) {
        return makeQueryClient()
    }
    else {
        if (!browserQueyClient) {
            browserQueyClient = makeQueryClient()
        }
    }
    return browserQueyClient;
}


interface Props {
    children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
    const queryClient = getQueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default Providers