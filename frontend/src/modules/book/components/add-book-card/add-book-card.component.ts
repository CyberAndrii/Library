import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {BooksService} from '../../services/books.service';
import {AbstractControlDirective} from "@angular/forms";
import {SaveBookRequest} from '../../dto/requests/save-book-request';

@Component({
  selector: 'add-book-card',
  templateUrl: './add-book-card.component.html',
})
export class AddBookCardComponent {

  private currentFile: File | null = null;

  form: FormGroup = new FormGroup({
    id: new FormControl<number | null>(null),
    title: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    genre: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    author: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    content: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(2_000_000)]),
    cover: new FormControl<FileList | null>(null, Validators.required), // todo: validate file size
  });

  constructor(private booksService: BooksService) {
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    var reader = new FileReader();

    reader.onload = ((e: Event) => {
      let reader = e.target as FileReader;

      const request = new SaveBookRequest(
        this.form.get('id')!.value,
        this.form.get('title')!.value,
        reader.result as string,
        this.form.get('content')!.value,
        this.form.get('genre')!.value,
        this.form.get('author')!.value
      );

      this.booksService.saveBook(request);

      this.form.reset();
    }).bind(this);

    reader.readAsDataURL(this.currentFile!);
  }

  handleInputChange(e: Event) {
    var inputEvent = e as InputEvent
    this.currentFile = inputEvent.dataTransfer
      ? inputEvent.dataTransfer.files[0]
      : (e.target as HTMLInputElement).files![0];
  }

}
