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

export interface Transactions extends Transaction {
  id: string;
}

export interface TransactionWithCategory {
  id: string;
  categories: Category[];
}

export interface ApiTransaction {
  [id: string]: Transaction
}