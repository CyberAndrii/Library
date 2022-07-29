import {Component} from '@angular/core';

@Component({
  selector: 'book-list',
  host: {'class': 'row'},
  template: `
    <ng-content></ng-content>
  `
})
export class BookListComponent {
}
