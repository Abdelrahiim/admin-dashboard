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

export interface MonthlyData {
  month: string;
  totalSales: number;
  totalUnits: number;
}

export interface DailyData {
  date: string;
  totalSales: number;
  totalUnits: number;
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
  _id: string;
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

export interface OverAllStat {
  _id: string;
  productId: string;
  yearlySalesTotal?: number;
  yearlyTotalSoldUnits?: number;
  year?: number;
  monthlyData: MonthlyData[];
  dailyData: DailyData[];
  salesByCategory: {
    [key: string]: number;
  };
  createdAt: string;
  updatedAT: string;
}
