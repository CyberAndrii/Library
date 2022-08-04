import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

import {BooksService} from '../../services/books.service';
import {AbstractControlDirective} from "@angular/forms";
import {SaveBookRequest} from '../../dto/requests/save-book-request';

@Component({
  selector: 'add-book-card',
  templateUrl: './add-book-card.component.html',
})
export class AddBookCardComponent {

  private currentFile: File | null = null;

  form: FormGroup;

  @Output() save = new EventEmitter();

  constructor(private readonly booksService: BooksService) {
    this.form = new FormGroup({
      id: new FormControl<number | null>(null),
      title: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      genre: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      author: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      content: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(2_000_000)]),
      cover: new FormControl<FileList | null>(null), // todo: validate file size
    });

    this.updateCoverValidators(null);

    this.form.get('id')?.valueChanges.subscribe(value => this.updateCoverValidators(value));
  }

  get id() {
    return this.form.get('id');
  }

  get title() {
    return this.form.get('title');
  }

  get genre() {
    return this.form.get('genre');
  }

  get author() {
    return this.form.get('author');
  }

  get content() {
    return this.form.get('content');
  }

  get cover() {
    return this.form.get('cover');
  }

  hasErrors(formControl: AbstractControl<any, any> | null): boolean {
    return formControl?.invalid && (formControl?.dirty || formControl?.touched) || false;
  }

  private updateCoverValidators = (value: number | null) => {
    if (value) {
      this.cover!.clearValidators();
    } else {
      this.cover!.setValidators([Validators.required]);
    }
    this.cover!.updateValueAndValidity();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    const saveBook = () => {
      const request = new SaveBookRequest(
        this.form.get('id')!.value,
        this.form.get('title')!.value,
        reader?.result as string | null,
        this.form.get('content')!.value,
        this.form.get('genre')!.value,
        this.form.get('author')!.value
      );

      this.booksService.saveBook(request)
        .subscribe(() => {
          this.save.emit();
        });
    };

    if (this.currentFile) {
      var reader = new FileReader();

      reader.onload = ((e: Event) => {
        saveBook();
      }).bind(this);

      reader.readAsDataURL(this.currentFile!);
    }

    saveBook();
  }

  handleInputChange(e: Event): void {
    var inputEvent = e as InputEvent;
    this.currentFile = inputEvent.dataTransfer
      ? inputEvent.dataTransfer.files[0]
      : (e.target as HTMLInputElement).files![0];
  }

  public editExistingBook(id: number): void {
    this.booksService.getBookWithReviews(id)
      .subscribe(book => {

        this.form.setValue({
          id: book.id,
          title: book.title,
          cover: null, // keep the old cover
          content: book.content,
          genre: book.genre,
          author: book.author,
        });
      });
  }

}
