import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { CardModule } from '../../components/card/card.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../utils/pipes/pipes.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    TranslateModule,
    PipesModule,
    DragDropModule,
  ],
  declarations: [CatalogComponent],
  exports: [CatalogComponent],
})
export class CatalogModule {}
