namespace LibraryBackend;

public static class ApplicationBuilderExtensions
{
    public static IApplicationBuilder SeedData(this IApplicationBuilder builder)
    {
        var services = builder.ApplicationServices;
        var lifetime = services.GetRequiredService<IHostApplicationLifetime>();

        lifetime.ApplicationStarted.Register(() =>
        {
            using var scope = builder.ApplicationServices.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            void AddFirstBook()
            {
                var rating = new Rating {Id = 1, BookId = 1, Score = 5};
                var review = new Review {Id = 1, BookId = 1, Message = "The best book ever", Reviewer = "John Doe"};
                var book = new Book
                {
                    Id = 1,
                    Title = "The Lord of the Rings",
                    Content =
                        "The Lord of the Rings is an epic high fantasy novel written by English author J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold",
                    Cover = "aad",
                    Author = "J.R.R. Tolkien",
                    Genre = "Fantasy",
                    Ratings = new[] {rating},
                    Reviews = new[] {review}
                };

                dbContext.Ratings.Add(rating);
                dbContext.Reviews.Add(review);
                dbContext.Books.Add(book);
            }

            void AddSecondBook()
            {
                var rating1 = new Rating {Id = 2, BookId = 2, Score = 5};
                var rating2 = new Rating {Id = 3, BookId = 2, Score = 3};
                var review = new Review
                {
                    Id = 2, //
                    BookId = 2,
                    Message = "I recommend",
                    Reviewer = "Alice"
                };
                var book = new Book
                {
                    Id = 2,
                    Title = "The Hunger Games",
                    Content = "ddd d s",
                    Cover = "ddd",
                    Author = "Suzanne Collins",
                    Genre = "Fantasy",
                    Ratings = new[] {rating1, rating2},
                    Reviews = new[] {review}
                };

                dbContext.Ratings.Add(rating1);
                dbContext.Ratings.Add(rating2);
                dbContext.Reviews.Add(review);
                dbContext.Books.Add(book);
            }

            AddFirstBook();
            AddSecondBook();

            dbContext.SaveChanges();
        });

        return builder;
    }
}
