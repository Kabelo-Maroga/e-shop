import { IShoppingCart } from 'app/entities/shopping-cart/shopping-cart.model';
import { Role } from 'app/entities/enumerations/role.model';

export interface IShopUser {
  id?: number;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  role?: Role | null;
  shoppingCart?: IShoppingCart | null;
}

export class ShopUser implements IShopUser {
  constructor(
    public id?: number,
    public name?: string | null,
    public email?: string | null,
    public password?: string | null,
    public role?: Role | null,
    public shoppingCart?: IShoppingCart | null
  ) {}
}

export function getShopUserIdentifier(shopUser: IShopUser): number | undefined {
  return shopUser.id;
}
