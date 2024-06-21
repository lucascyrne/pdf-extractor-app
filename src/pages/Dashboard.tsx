import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Layout from '../components/Layout';
import { Invoice } from '../types';

const Dashboard: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clientNumbers, setClientNumbers] = useState<string[]>([]);
  const [selectedClientNumber, setSelectedClientNumber] = useState<string>('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/invoices`).then((response) => {
      setInvoices(response.data);
      const uniqueClientNumbers: string[] = Array.from(
        new Set(response.data.map((invoice: Invoice) => invoice.clientNumber))
      );
      setClientNumbers(uniqueClientNumbers);
    });
  }, []);

  const filteredInvoices = invoices.filter(
    (invoice) =>
      !selectedClientNumber || invoice.clientNumber === selectedClientNumber
  );

  const data = filteredInvoices.map((invoice) => ({
    referenceMonth: invoice.referenceMonth,
    energyConsumption: invoice.energyElectricityQty + invoice.energySCEEEQty,
    energyCompensated: invoice.energyCompensatedQty,
    totalValue:
      invoice.energyElectricityValue +
      invoice.energySCEEEValue +
      invoice.publicLightingValue,
    savingsGD: invoice.energyCompensatedValue,
  }));

  return (
    <Layout>
      <h1 className='text-3xl mb-4 px-4'>Dashboard</h1>
      <div className='mb-4 px-4'>
        <label className='block mb-2'>No DO CLIENTE</label>
        <select
          value={selectedClientNumber}
          onChange={(e) => setSelectedClientNumber(e.target.value)}
          className='border p-2 w-full md:w-1/3'
        >
          <option value=''>Selecione um cliente</option>
          {clientNumbers.map((clientNumber) => (
            <option key={clientNumber} value={clientNumber}>
              {clientNumber}
            </option>
          ))}
        </select>
      </div>
      <h2 className='text-2xl mb-4 px-4'>Consumo de Energia (kWh)</h2>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='referenceMonth' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='energyConsumption'
            stroke='#8884d8'
            name='Consumo de Energia (kWh)'
          />
          <Line
            type='monotone'
            dataKey='energyCompensated'
            stroke='#82ca9d'
            name='Energia Compensada (kWh)'
          />
        </LineChart>
      </ResponsiveContainer>
      <h2 className='text-2xl mb-4 px-4'>Valores Monetários (R$)</h2>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='referenceMonth' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='totalValue'
            stroke='#8884d8'
            name='Valor Total sem GD (R$)'
          />
          <Line
            type='monotone'
            dataKey='savingsGD'
            stroke='#82ca9d'
            name='Economia GD (R$)'
          />
        </LineChart>
      </ResponsiveContainer>
    </Layout>
  );
};

export default Dashboard;
