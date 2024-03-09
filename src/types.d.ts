export interface Category {
  type: string;
  name: string;
}

export interface Categories extends Category {
  id: string;
}

export interface ApiCategory {
  [id: string]: Category;
}

export interface Transaction {
  type: string;
  category: string;
  amount: number;
  time: string;
}