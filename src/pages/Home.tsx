import React from 'react';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo à Biblioteca de Faturas</h1>
        <p>Utilize o menu para navegar até as faturas disponíveis.</p>
      </div>
    </Layout>
  );
}

export default Home;
