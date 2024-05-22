import React, { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode | ReactNode[];
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-2xl">PDF Extractor</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; 2024 PDF Extractor. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
