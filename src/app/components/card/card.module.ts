import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../utils/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, TranslateModule, PipesModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
