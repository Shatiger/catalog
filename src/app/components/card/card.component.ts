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
  /** Can be removed */
  @Input() canBeRemoved = false;
  /** Remove */
  @Output() remove = new EventEmitter<void>();
  /** Change count */
  @Output() changeCount = new EventEmitter<number>();

  /**
   * Change item count
   * @param isIncrement - is incrementing
   */
  changeItemCount(isIncrement: boolean): void {
    let count = this.item.count;
    count += isIncrement ? 1 : -1;
    count = count > this.item.stock ? this.item.stock : count;
    count = count <= 0 ? 1 : count;
    this.changeCount.emit(count);
  }

  /** Remove item */
  removeItem(): void {
    this.remove.emit();
  }
}
