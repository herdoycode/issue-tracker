import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./AuthProvider";
import Nav from "./Nav";
import QueryClientProvider from "./QueryClientProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Created by Herdoy Almamun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryClientProvider>
            <Theme>
              <Nav />
              <Container>{children}</Container>
            </Theme>
            <ToastContainer autoClose={1000} />
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
