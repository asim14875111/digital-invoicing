"use client";
import "./globals.css";
import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";
import { CustomerProvider } from "@/Contexts/MyContext";
import { ItemsProvider } from "@/Contexts/ItemsContext";
import { Datacontext } from "@/Contexts/DataContext";
import { CompanyProvider } from "@/Contexts/Companycontext";
import { useState } from "react";
import { IntegrationProvider } from "@/Contexts/integrationcontext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [allusersData, setAllUsersData] = useState<
    import("@/Contexts/DataContext").AllUsersDataType[]
  >([]);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <CustomerProvider>
          <ItemsProvider>
            <Datacontext.Provider value={{ allusersData, setAllUsersData }}>
              <CompanyProvider>
                <IntegrationProvider>
                  <div className="min-h-screen  flex flex-col">
                    <Navbar />
                    <div className="flex-1">{children}</div>
                    <Footer />
                  </div>
                </IntegrationProvider>
              </CompanyProvider>
            </Datacontext.Provider>
          </ItemsProvider>
        </CustomerProvider>
      </body>
    </html>
  );
}
