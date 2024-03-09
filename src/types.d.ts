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