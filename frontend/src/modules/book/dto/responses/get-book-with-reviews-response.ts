export class GetBookWithReviewsResponse {
  id: number;
  title: string;
  cover: string;
  content: string;
  genre: string;
  author: string;
  rating: number;
  reviews: GetBookWithReviewsResponseReview[];

  constructor(
    id: number,
    title: string,
    cover: string,
    content: string,
    genre: string,
    author: string,
    rating: number,
    reviews: GetBookWithReviewsResponseReview[]) {

    this.id = id;
    this.title = title;
    this.cover = cover;
    this.content = content;
    this.genre = genre;
    this.author = author;
    this.rating = rating;
    this.reviews = reviews;
  }

}

export class GetBookWithReviewsResponseReview {
  id: number;
  message: string;
  reviewer: string;

  constructor(
    id: number,
    message: string,
    reviewer: string) {

    this.id = id;
    this.message = message;
    this.reviewer = reviewer;
  }

}
