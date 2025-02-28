import React, { ReactNode } from "react";
import RightSidebar from "../components/RightSideBar";
import Header from "../components/Header";

interface LayoutProps {
    children: ReactNode;
  }
  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <div className="flex h-screen bg-gray-100">

        <RightSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    );
  };
  
  export default Layout;

