import { Injectable } from '@angular/core';
import { IProduct } from '../../entities/product/product.model';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  public selectedProduct?: IProduct;
}
