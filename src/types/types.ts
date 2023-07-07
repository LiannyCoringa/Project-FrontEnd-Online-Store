export type ProductType = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
};

export type Product = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  attributes: Attributes[];
};

export type Attributes = {
  name: string;
  value_id: string;
  value_name: string;
};
