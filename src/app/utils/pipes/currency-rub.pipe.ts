import { Pipe, PipeTransform } from '@angular/core';

/** Currency pipe */
@Pipe({
  name: 'currencyRub',
})
export class CurrencyRubPipe implements PipeTransform {
  /**
   * Adds rouble to amount of money
   * @param value - amount
   */
  transform(value: number): string {
    return `${value} ₽`;
  }
}
