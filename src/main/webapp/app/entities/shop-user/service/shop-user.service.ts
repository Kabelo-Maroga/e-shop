import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IShopUser, getShopUserIdentifier } from '../shop-user.model';

export type EntityResponseType = HttpResponse<IShopUser>;
export type EntityArrayResponseType = HttpResponse<IShopUser[]>;

@Injectable({ providedIn: 'root' })
export class ShopUserService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/shop-users');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(shopUser: IShopUser): Observable<EntityResponseType> {
    return this.http.post<IShopUser>(this.resourceUrl, shopUser, { observe: 'response' });
  }

  update(shopUser: IShopUser): Observable<EntityResponseType> {
    return this.http.put<IShopUser>(`${this.resourceUrl}/${getShopUserIdentifier(shopUser) as number}`, shopUser, { observe: 'response' });
  }

  partialUpdate(shopUser: IShopUser): Observable<EntityResponseType> {
    return this.http.patch<IShopUser>(`${this.resourceUrl}/${getShopUserIdentifier(shopUser) as number}`, shopUser, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IShopUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShopUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addShopUserToCollectionIfMissing(shopUserCollection: IShopUser[], ...shopUsersToCheck: (IShopUser | null | undefined)[]): IShopUser[] {
    const shopUsers: IShopUser[] = shopUsersToCheck.filter(isPresent);
    if (shopUsers.length > 0) {
      const shopUserCollectionIdentifiers = shopUserCollection.map(shopUserItem => getShopUserIdentifier(shopUserItem)!);
      const shopUsersToAdd = shopUsers.filter(shopUserItem => {
        const shopUserIdentifier = getShopUserIdentifier(shopUserItem);
        if (shopUserIdentifier == null || shopUserCollectionIdentifiers.includes(shopUserIdentifier)) {
          return false;
        }
        shopUserCollectionIdentifiers.push(shopUserIdentifier);
        return true;
      });
      return [...shopUsersToAdd, ...shopUserCollection];
    }
    return shopUserCollection;
  }
}
