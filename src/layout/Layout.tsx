import React, { ReactNode } from "react";
import RightSidebar from "../components/RightSideBar";
import Header from "../components/Header";
import LeftSideBar from '../components/LeftSideBar'

interface LayoutProps {
    children: ReactNode;
    todos: any[],
  }
  
  const Layout: React.FC<LayoutProps> = ({ children, todos }) => {
    return (
      <div className="flex h-screen bg-gray-800">

        <RightSidebar todos={todos} />
        <LeftSideBar 
          items={[]} 
          addItem={() => {}} 
          removeItem={() => {}} 
          selectedIndex={0} 
          setSelectedIndex={() => {}} 
        />
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          <Header />
          
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    );
  };
  
  export default Layout;