import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IShoppingCart, getShoppingCartIdentifier, ShoppingCart } from '../shopping-cart.model';
import { IProduct } from '../../product/product.model';

export type EntityResponseType = HttpResponse<IShoppingCart>;
export type EntityArrayResponseType = HttpResponse<IShoppingCart[]>;

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  public shoppingCarts: IShoppingCart[] = [];

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/shopping-carts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(shoppingCart: IShoppingCart): Observable<EntityResponseType> {
    return this.http.post<IShoppingCart>(this.resourceUrl, shoppingCart, { observe: 'response' });
  }

  update(shoppingCart: IShoppingCart): Observable<EntityResponseType> {
    return this.http.put<IShoppingCart>(`${this.resourceUrl}/${getShoppingCartIdentifier(shoppingCart) as number}`, shoppingCart, {
      observe: 'response',
    });
  }

  partialUpdate(shoppingCart: IShoppingCart): Observable<EntityResponseType> {
    return this.http.patch<IShoppingCart>(`${this.resourceUrl}/${getShoppingCartIdentifier(shoppingCart) as number}`, shoppingCart, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IShoppingCart>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShoppingCart[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addShoppingCartToCollectionIfMissing(
    shoppingCartCollection: IShoppingCart[],
    ...shoppingCartsToCheck: (IShoppingCart | null | undefined)[]
  ): IShoppingCart[] {
    const shoppingCarts: IShoppingCart[] = shoppingCartsToCheck.filter(isPresent);
    if (shoppingCarts.length > 0) {
      const shoppingCartCollectionIdentifiers = shoppingCartCollection.map(
        shoppingCartItem => getShoppingCartIdentifier(shoppingCartItem)!
      );
      const shoppingCartsToAdd = shoppingCarts.filter(shoppingCartItem => {
        const shoppingCartIdentifier = getShoppingCartIdentifier(shoppingCartItem);
        if (shoppingCartIdentifier == null || shoppingCartCollectionIdentifiers.includes(shoppingCartIdentifier)) {
          return false;
        }
        shoppingCartCollectionIdentifiers.push(shoppingCartIdentifier);
        return true;
      });
      return [...shoppingCartsToAdd, ...shoppingCartCollection];
    }
    return shoppingCartCollection;
  }

  addToCart(product?: IProduct): void {
    let productInCart = false;

    this.shoppingCarts.forEach(shoppingCart => {
      if (shoppingCart.product === product && shoppingCart.quantity) {
        shoppingCart.quantity += 1;
        productInCart = true;
      }
    });
    if (!productInCart) {
      const cart = this.createFromForm(product);
      this.shoppingCarts.push(cart);
    }
  }

  createFromForm(product?: IProduct): IShoppingCart {
    return {
      ...new ShoppingCart(),
      quantity: 1,
      // shopUser: this.editForm.get(['shopUser'])!.value,
      product,
    };
  }

  removeFromCart(product?: IProduct): void {
    if (this.shoppingCarts.length !== 0) {
      this.shoppingCarts.forEach(shoppingCart => {
        if (shoppingCart.product === product && shoppingCart.quantity === 0) {
          const index = this.shoppingCarts.findIndex(cart => cart.product === product);
          this.shoppingCarts.splice(index, 1);
        }
        if (shoppingCart.product === product && shoppingCart.quantity) {
          shoppingCart.quantity -= 1;
        }
      });
    }
  }

  getQuantity(product?: IProduct): number {
    let quantity = 0;
    if (this.shoppingCarts.length === 0) {
      return quantity;
    }
    this.shoppingCarts.forEach(cart => {
      if (cart.product === product && cart.quantity) {
        quantity = cart.quantity;
      }
    });
    return quantity;
  }

  numberOfItemsInTheCart(): number {
    let itemCount = 0;
    this.shoppingCarts.forEach(shoppingCart => {
      if (shoppingCart.quantity) {
        itemCount += shoppingCart.quantity;
      }
    });
    return itemCount;
  }

  totalPrice(): number {
    let totalPrice = 0;
    this.shoppingCarts.forEach(shoppingCart => {
      if (shoppingCart.quantity && shoppingCart.product?.price) {
        totalPrice += shoppingCart.quantity * shoppingCart.product?.price;
      }
    });
    return totalPrice;
  }

  deleteFromCart(product?: IProduct): void {
    const index = this.shoppingCarts.findIndex(cart => cart.product === product);
    this.shoppingCarts.splice(index, 1);
  }

  clearCart(): void {
    this.shoppingCarts = [];
  }
}
