import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import BibliotecaDeFaturas from './BibliotecaDeFaturas';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BibliotecaDeFaturas', () => {
  const invoices = [
    {
      id: 1,
      clientNumber: '3000055479',
      referenceMonth: 'JAN/2023',
      fileName: '3000055479-01-2023.pdf',
      energyElectricityQty: 100,
      energyElectricityValue: 50,
      energySCEEEQty: 200,
      energySCEEEValue: 100,
      energyCompensatedQty: 300,
      energyCompensatedValue: 150,
      publicLightingValue: 25,
    },
    {
      id: 2,
      clientNumber: '3004298116',
      referenceMonth: 'FEB/2023',
      fileName: '3004298116-02-2023.pdf',
      energyElectricityQty: 150,
      energyElectricityValue: 75,
      energySCEEEQty: 250,
      energySCEEEValue: 125,
      energyCompensatedQty: 350,
      energyCompensatedValue: 175,
      publicLightingValue: 30,
    },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: invoices });
  });

  test('renders BibliotecaDeFaturas and downloads an invoice', async () => {
    render(
      <BrowserRouter>
        <BibliotecaDeFaturas />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/3000055479 - JAN\/2023/)).toBeInTheDocument();
      expect(screen.getByText(/3004298116 - FEB\/2023/)).toBeInTheDocument();
    });

    const downloadButtons = screen.getAllByText('Download');
    fireEvent.click(downloadButtons[0]);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/invoices/download/3000055479-01-2023.pdf`,
      {
        responseType: 'blob',
      }
    );
  });
});
