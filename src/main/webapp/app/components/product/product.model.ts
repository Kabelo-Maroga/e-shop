import { IShoppingCart } from 'app/components/shopping-cart/shopping-cart.model';
import { Category } from 'app/components/enumerations/category.model';

export interface IProduct {
  id?: number;
  category?: Category | null;
  title?: string | null;
  price?: number | null;
  imageUrl?: string | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public category?: Category | null,
    public title?: string | null,
    public price?: number | null,
    public imageUrl?: string | null
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
