import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/index.css";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <NextUIProvider>
                <main className="light text-foreground bg-background">
                    <App />
                    <Toaster />
                </main>
            </NextUIProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
