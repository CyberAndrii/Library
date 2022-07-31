export class GetBooksResponse {
  id: number;
  title: string;
  cover: string;
  author: string;
  rating: number;
  reviewsNumber: number;

  constructor(
    id: number,
    title: string,
    cover: string,
    author: string,
    rating: number,
    reviewsNumber: number) {

    this.id = id;
    this.title = title;
    this.cover = cover;
    this.author = author;
    this.rating = rating;
    this.reviewsNumber = reviewsNumber;
  }
}
