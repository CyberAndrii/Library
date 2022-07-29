import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule, Routes} from '@angular/router'
import {BookModule} from '../book/book.module';

import {AppComponent} from './components/app/app.component';
import {BooksPageComponent} from '../book/pages/books-page/books-page.component';

const routes: Routes = [
  {path: '', component: BooksPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    BookModule,
  ],
  providers: [
    BrowserModule,
    NgbModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
