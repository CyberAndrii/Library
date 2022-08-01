export class SaveBookRequest {
  id: number | null;
  title: string;
  cover: string | null;
  content: string;
  genre: string;
  author: string;

  constructor(
    id: number | null,
    title: string,
    cover: string | null,
    content: string,
    genre: string,
    author: string) {

    this.id = id;
    this.title = title;
    this.cover = cover;
    this.content = content;
    this.genre = genre;
    this.author = author;
  }
}
