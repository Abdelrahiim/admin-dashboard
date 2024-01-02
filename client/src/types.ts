export interface User {
  _id: string;
  name: string;
  email: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  phoneNumber: string;
  transactions: string[];
  role: string;
}

interface MonthlyData {
  month?: string;
  totalSales?: number;
  totalUnits?: number;
}

interface DailyData {
  date?: string;
  totalSales?: number;
  totalUnits?: number;
}

export interface ProductStat {
  _id: string;
  productId: string;
  yearlySalesTotal?: number;
  yearlyTotalSoldUnits?: number;
  year?: number;
  monthlyData?: MonthlyData[];
  dailyData?: DailyData[];
  createdAt: string;
  updatedAT: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
  stat: ProductStat[];
  createdAt: string;
  updatedAT: string;
}

export interface Transactions {
  useId?: string;
  cost?: string;
  products: string[];
  createdAt: string;
  updatedAT: string;
}

export interface GeographyData {
  id: string;
  count: number;
}
