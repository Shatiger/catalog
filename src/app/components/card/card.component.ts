import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ICatalogItem } from '../../main/catalog/catalog.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  /** Item */
  @Input() item: ICatalogItem;
  /** Remove */
  @Output() remove = new EventEmitter<number>();
  /** Can be removed */
  @Input() canBeRemoved = false;

  /**
   * Change item count
   * @param isIncrement - is incrementing
   */
  changeCount(isIncrement: boolean): void {
    this.item.count += isIncrement ? 1 : -1;
    if (this.item.count <= 0) {
      this.item.count = 1;
    }
    if (this.item.count > this.item.stock) {
      this.item.count = this.item.stock;
    }
  }

  /** Remove item */
  removeItem(): void {
    this.remove.emit(this.item.id);
  }
}
