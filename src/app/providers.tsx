"use client"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NextUIProvider } from "@nextui-org/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

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

const paypalInitialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
    currency: "USD",
    intent: "capture"
}


interface Props {
    children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
    const queryClient = getQueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <NextUIProvider>
                <UserProvider>
                    <PayPalScriptProvider options={paypalInitialOptions}>
                        {children}
                    </PayPalScriptProvider>
                </UserProvider>
            </NextUIProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default Providers