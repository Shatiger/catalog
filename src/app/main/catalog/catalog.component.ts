import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ICatalogItem } from './catalog.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
  /** Catalog list */
  catalog: ICatalogItem[] = this._catalogService.getCatalogItems();
  /** Basket items */
  basket: ICatalogItem[] = [];

  constructor(private _catalogService: CatalogService) {}

  ngOnInit(): void {}

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
          count += draggedItem.count;
          count = count > draggedItem.stock ? draggedItem.count : count;
          foundId = i;
        }
        return {
          ...item,
          count,
        };
      });
      // basket is not contained this item previously
      if (foundId === undefined) {
        this.basket.splice(event.currentIndex, 0, {
          ...this.catalog[event.previousIndex],
        });
      }
    } else if (event.isPointerOverContainer) {
      // sort basket items if necessary
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
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
   * Remove item from basket
   * @param id - product id
   */
  removeItem(id: number): void {
    this.basket = this.basket.filter((item) => item.id !== id);
  }
}
