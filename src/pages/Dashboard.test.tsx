import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Dashboard from './Dashboard';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Dashboard', () => {
  const invoices = [
    {
      id: 1,
      clientNumber: '3000055479',
      referenceMonth: 'JAN/2023',
      energyElectricityQty: 100,
      energyElectricityValue: 50,
      energySCEEEQty: 200,
      energySCEEEValue: 100,
      energyCompensatedQty: 300,
      energyCompensatedValue: 150,
      publicLightingValue: 25,
      fileName: '3000055479-01-2023.pdf'
    },
    {
      id: 2,
      clientNumber: '3004298116',
      referenceMonth: 'FEB/2023',
      energyElectricityQty: 150,
      energyElectricityValue: 75,
      energySCEEEQty: 250,
      energySCEEEValue: 125,
      energyCompensatedQty: 350,
      energyCompensatedValue: 175,
      publicLightingValue: 30,
      fileName: '3004298116-02-2023.pdf'
    },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: invoices });
  });

  test('renders Dashboard and shows charts', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/3000055479/)).toBeInTheDocument();
      expect(screen.getByText(/3004298116/)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '3000055479' } });

    await waitFor(() => {
      expect(screen.getByText('Consumo de Energia (kWh)')).toBeInTheDocument();
      expect(screen.getByText('Valores Monetários (R$)')).toBeInTheDocument();
    });
  });
});
