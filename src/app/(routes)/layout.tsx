import Header from "@/components/Header";
import React, { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default Layout;
