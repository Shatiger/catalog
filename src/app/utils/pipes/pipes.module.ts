import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyRubPipe } from './currency-rub.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [CurrencyRubPipe],
  exports: [CurrencyRubPipe],
})
export class PipesModule {}
