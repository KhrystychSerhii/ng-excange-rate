import { Pipe, PipeTransform } from '@angular/core';
import {get} from "../../libs/helpers";

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, searchBy?: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    return items.filter(item => {
      if (!searchBy) {
        return item.toLowerCase().includes(searchText.toLowerCase());
      }
      const prop = get(item, [searchBy], '');
      return prop.toLowerCase().includes(searchText.toLowerCase());
    });
  }
}
