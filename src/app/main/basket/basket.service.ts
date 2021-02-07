import { Injectable } from '@angular/core';
import { ICatalogItem } from '../catalog/catalog.interface';
import { LOCAL_STORAGE_KEYS } from '../../utils/interfaces/local-storage.interface';
import { CatalogService } from '../catalog/catalog.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private _catalogService: CatalogService) {}

  /** Get basket items from local storage */
  getBasket(): ICatalogItem[] {
    const basketJson = localStorage.getItem(LOCAL_STORAGE_KEYS.BASKET);
    const basket = JSON.parse(basketJson);
    if (basket === null) {
      this._saveLocalStorageBasket([]);
      return [];
    }
    return basket;
  }

  /**
   * Remove item with specified id from basket
   * @param id - item id
   */
  removeItem(id: number): ICatalogItem[] {
    let basket = this.getBasket();
    basket = basket.filter((item) => item.id !== id);
    this._saveLocalStorageBasket(basket);
    return basket;
  }

  /**
   * Save basket in local storage
   * @param basket - basket items
   */
  saveBasket(items: ICatalogItem[]): ICatalogItem[] {
    const catalog = this._catalogService.getCatalogItems();
    const basket = items.map((item) => {
      const catalogItem = catalog.find((product) => product.id === item.id);
      return {
        id: item.id,
        count: item.count > catalogItem.stock ? catalogItem.stock : item.count,
      };
    });
    this._saveLocalStorageBasket(basket);
    return basket;
  }

  /**
   * Save basket in local storage
   * @param basket - basket
   */
  private _saveLocalStorageBasket(basket: ICatalogItem[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.BASKET, JSON.stringify(basket));
  }
}
