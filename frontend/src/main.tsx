import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthGate from "@/routes/AuthGate.tsx";
import App from "./App.tsx";
import Dashboard from "@/pages/auth/Dashboard.tsx";
import NotFound from "@/pages/NotFound.tsx";
import NoInternet from "@/components/no-internet.tsx";
import PublicRoute from "@/routes/PublicRoute.tsx";
import AccountSettings from "@/pages/auth/AccountSettings.tsx";
import { Navbar } from "@/components/navbar.tsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ConfirmDeleteContact from "./pages/auth/components/dashboard/components/contacts/components/contact/confirm-delete-contact.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster closeButton richColors position="top-center" />
            {navigator.onLine && (
                <ClerkProvider
                    publishableKey={PUBLISHABLE_KEY}
                    afterSignOutUrl="/"
                    signUpForceRedirectUrl={"/dashboard"}
                    signInForceRedirectUrl={"/dashboard"}
                >
                    <QueryClientProvider client={queryClient}>
                        <ConfirmDeleteContact />
                        <BrowserRouter>
                            <Navbar />
                            <Routes>
                                <Route
                                    index
                                    element={
                                        <PublicRoute>
                                            <App />
                                        </PublicRoute>
                                    }
                                />

                                <Route
                                    path="/dashboard"
                                    element={
                                        <AuthGate>
                                            <Dashboard />
                                        </AuthGate>
                                    }
                                />

                                <Route
                                    path="account-settings"
                                    element={
                                        <AuthGate>
                                            <AccountSettings />
                                        </AuthGate>
                                    }
                                />

                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </QueryClientProvider>
                </ClerkProvider>
            )}

            {!navigator.onLine && <NoInternet />}
        </ThemeProvider>
    </StrictMode>
);
