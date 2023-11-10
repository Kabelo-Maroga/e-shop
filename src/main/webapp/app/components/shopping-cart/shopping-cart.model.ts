import { IShopUser } from 'app/components/shop-user/shop-user.model';
import { IProduct } from 'app/components/product/product.model';

export interface IShoppingCart {
  id?: number;
  quantity?: number | null;
  shopUser?: IShopUser | null;
  product?: IProduct | null;
}

export class ShoppingCart implements IShoppingCart {
  constructor(public id?: number, public quantity?: number | null, public shopUser?: IShopUser | null, public product?: IProduct | null) {}
}

export function getShoppingCartIdentifier(shoppingCart: IShoppingCart): number | undefined {
  return shoppingCart.id;
}
