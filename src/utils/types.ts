export interface Customer {
  username: string;
  email: string;
  password: string;
}

export type ProductNewArrival = {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string;
};
