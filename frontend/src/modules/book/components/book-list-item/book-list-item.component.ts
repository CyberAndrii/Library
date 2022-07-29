import {Component, Input} from '@angular/core';

@Component({
  selector: 'book-list-item[title][cover][reviews][rating]',
  templateUrl: './book-list-item.component.html',
  host: {'class': 'col'},
})
export class BookListItemComponent {

  @Input() title: string = '';
  @Input() cover: string = '';
  @Input() reviews: number = 0;
  @Input() rating: number = 0;

}
