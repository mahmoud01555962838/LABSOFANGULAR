import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
//The pipe that compares the value from the search bar with the product name and product description and returns a value
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any[] {
    console.log(filterString, propName);
    const result: any = [];
    if (!value || filterString === '' || propName === '') {
      return value;
    }
    value.forEach((a: any) => {
      if (
        a[propName].trim().toLowerCase().includes(filterString.toLowerCase()) ||
        a.description.toLowerCase().includes(filterString.toLowerCase())
      ) {
        result.push(a);
      }
    });
    return result;
  }
}
