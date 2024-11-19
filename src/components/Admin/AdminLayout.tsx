import React, { ReactNode } from 'react';
import Header from '../Common/Header'; // Header can be common or specific for admin
import Footer from '../Common/Footer'; // Footer can be common or specific for admin

interface AdminLayoutProps {
  children: ReactNode; // Type for children prop, ensuring it can accept any valid React node (components, elements, etc.)
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="admin-layout">
      <Header />
      
      <div className="admin-content">
        {children}
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLayout;
