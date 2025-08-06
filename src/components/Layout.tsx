import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
};

export default Layout;