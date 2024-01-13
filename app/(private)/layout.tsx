"use client";
import fetcher from "../util/fetcher";
import Footer from "./footer";
import Header from "./header";
import NavBar from "./navbar";
import { SWRConfig } from "swr";
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <div>
        <Header />
        <NavBar />
        <main>{children}</main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
