import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Book} from '../../models/book.model';

@Component({
  selector: 'book-list-item[id][title][cover][reviews][rating]',
  templateUrl: './book-list-item.component.html',
  host: {'class': 'col'},
})
export class BookListItemComponent {

  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() cover: string = '';
  @Input() reviews: number = 0;
  @Input() rating: number = 0;

  @Output() edit = new EventEmitter<number>();

}
