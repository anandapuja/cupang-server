export interface Customer {
  username: string;
  email: string;
  password: string;
}

export type Product = {
  name: string;
  slug?: string;
  price: number;
  description?: string;
  stock: number;
  sold?: number;
  images?: string[];
};

export type ProductNewArrival = {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string;
};

export type CustomerRegister = {
  username: string;
  email: string;
  password: string;
};

export type TokenPayload = {
  username: string;
  id: string;
  email: string;
};
