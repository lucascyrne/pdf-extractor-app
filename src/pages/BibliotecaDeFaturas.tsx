import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Invoice } from '../types/index';

const months = [
  'JAN/2023', 'FEV/2023', 'MAR/2023', 'ABR/2023', 'MAI/2023', 'JUN/2023',
  'JUL/2023', 'AGO/2023', 'SET/2023', 'OUT/2023', 'NOV/2023', 'DEZ/2023'
];

const BibliotecaDeFaturas: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clientNumbers, setClientNumbers] = useState<string[]>([]);
  const [clientNumber, setClientNumber] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/invoices')
      .then(response => {
        setInvoices(response.data);
        const uniqueClientNumbers: string[] = Array.from(new Set(response.data.map((invoice: Invoice) => invoice.clientNumber)));
        setClientNumbers(uniqueClientNumbers);
      });
  }, []);

  const handleDownload = (fileName: string) => {
    axios.get(`http://localhost:3001/invoices/download/${fileName}`, {
      responseType: 'blob',
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    });
  };

  const filteredInvoices = invoices.filter(invoice => 
    (!clientNumber || invoice.clientNumber === clientNumber) &&
    (!month || invoice.referenceMonth === month)
  );

  return (
    <Layout>
      <h1 className="text-3xl mb-4">Biblioteca de Faturas</h1>
      <div className="mb-4 p-4 border rounded-lg max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block mb-2">No DO CLIENTE</label>
          <select 
            value={clientNumber} 
            onChange={e => setClientNumber(e.target.value)} 
            className="border p-2 w-full md:w-1/2"
          >
            <option value="">Selecione um cliente</option>
            {clientNumbers.map(number => (
              <option key={number} value={number}>{number}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Mês (MMM/AAAA)</label>
          <select 
            value={month} 
            onChange={e => setMonth(e.target.value)} 
            className="border p-2 w-full md:w-1/2"
          >
            <option value="">Selecione um mês</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={() => handleDownload(filteredInvoices[0]?.fileName)}
          disabled={!filteredInvoices.length}
          className="bg-blue-500 text-white px-4 py-2 mt-4 disabled:bg-gray-400"
        >
          Download
        </button>
      </div>
      <ul>
        {filteredInvoices.map(invoice => (
          <li key={invoice.id} className="mb-2">
            <div className="flex justify-between items-center border p-2">
              <span>{invoice.clientNumber} - {invoice.referenceMonth}</span>
              <button 
                onClick={() => handleDownload(invoice.fileName)}
                className="bg-blue-500 text-white px-4 py-2"
              >
                Download
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default BibliotecaDeFaturas;
