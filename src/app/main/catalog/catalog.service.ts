import { Injectable } from '@angular/core';
import { ICatalogItem } from './catalog.interface';
import { catalog } from '../../../assets/catalog/catalog.json';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor() {}

  /** Get catalog items */
  getCatalogItems(): ICatalogItem[] {
    return catalog;
  }
}
