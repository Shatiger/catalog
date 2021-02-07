import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ICatalogItem } from './catalog.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CatalogService } from './catalog.service';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
  /** Catalog list */
  catalog: ICatalogItem[] = this._catalogService.getCatalogItems();
  /** Basket items */
  basket: ICatalogItem[] = this._getFullBasket(this._basketService.getBasket());

  constructor(
    private _catalogService: CatalogService,
    private _basketService: BasketService
  ) {}

  /** Get basket sum */
  getBasketSum(): number {
    let sum = 0;
    this.basket.forEach((item) => {
      sum += item.price * item.count;
    });
    return sum;
  }

  /**
   * Drop item to basket
   * @param event - drop event
   */
  drop(event: CdkDragDrop<ICatalogItem[]>): void {
    if (event.previousContainer !== event.container) {
      // item dragged from catalog and then dropped in basket
      const draggedItem = event.item.data as ICatalogItem;
      let foundId;
      this.basket = this.basket.map((item, i) => {
        let count = item.count;
        if (item.id === draggedItem.id) {
          // if the basket already contains this item
          count += draggedItem.count;
          count = count > draggedItem.stock ? draggedItem.stock : count;
          foundId = i;
        }
        return {
          ...item,
          count,
        };
      });
      // basket did not contained this item previously
      if (foundId === undefined) {
        this.basket.splice(event.currentIndex, 0, {
          ...this.catalog[event.previousIndex],
        });
      }
      this._basketService.saveBasket(this.basket);
    } else if (event.isPointerOverContainer) {
      // sort basket items if necessary
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this._basketService.saveBasket(this.basket);
    } else {
      // if item dropped out of container, then we remove it
      const item = event.item.data as ICatalogItem;
      this.removeItem(item.id);
    }
  }

  /** Predicate that returns false */
  falseReturnPredicate(): boolean {
    return false;
  }

  /**
   * Change item count
   * @param id - item id
   * @param count - count
   */
  changeItemCount(
    container: ICatalogItem[],
    id: number,
    count: number,
    isBasket = false
  ): void {
    container = container.map((item) => {
      if (item.id === id) {
        item.count = count;
      }
      return item;
    });
    if (isBasket) {
      this._basketService.saveBasket(this.basket);
    }
  }

  /**
   * Remove item from basket
   * @param id - product id
   */
  removeItem(id: number): void {
    this.basket = this.basket.filter((item) => item.id !== id);
    this._basketService.removeItem(id);
  }

  /**
   * Get full basket
   * @param basket - partial basket
   */
  private _getFullBasket(basket: ICatalogItem[]): ICatalogItem[] {
    return basket.map((item) => ({
      ...this.catalog.find((catalogItem) => catalogItem.id === item.id),
      count: item.count,
    }));
  }
}
