export interface Invoice {
    id: number;
    clientNumber: string;
    referenceMonth: string;
    energyElectricityQty: number;
    energyElectricityValue: number;
    energySCEEEQty: number;
    energySCEEEValue: number;
    energyCompensatedQty: number;
    energyCompensatedValue: number;
    publicLightingValue: number;
    fileName: string;
  }