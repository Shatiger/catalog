import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ICatalogItem } from './catalog.interface';
import { catalog } from '../../../assets/catalog/catalog.json';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
  /** Catalog list */
  catalog: ICatalogItem[];
  /** Basket items */
  basket: ICatalogItem[];

  constructor() {}

  ngOnInit(): void {
    this.catalog = catalog;
    console.log(this.catalog);
  }
}
