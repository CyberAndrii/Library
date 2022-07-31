namespace LibraryBackend.Controllers;

[ApiController]
[Route("api")]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public BooksController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("books")]
    [ProducesResponseType(typeof(IEnumerable<GetBooksResponse>), 200)]
    public async Task<IActionResult> Get([FromQuery(Name = "order")] BooksOrderBy orderBy)
    {
        var booksQuery = orderBy switch
        {
            BooksOrderBy.Title => _dbContext.Books.OrderBy(b => b.Title),
            BooksOrderBy.Author => _dbContext.Books.OrderBy(b => b.Author),
            _ => throw new ArgumentOutOfRangeException(nameof(orderBy), orderBy, null)
        };

        var responses = await booksQuery
            .Include(b => b.Ratings)
            .Select(b => new GetBooksResponse
            {
                Id = b.Id,
                Title = b.Title,
                Author = b.Author,
                Rating = b.AverageRating,
                ReviewsNumber = b.Reviews.Count,
            })
            .AsNoTracking()
            .ToArrayAsync();

        return Ok(responses);
    }

    [HttpGet("recommended")]
    [ProducesResponseType(typeof(IEnumerable<GetRecommendedBookResponse>), 200)]
    public async Task<IActionResult> GetRecommended([FromQuery(Name = "genre")] string? genre)
    {
        var response = await _dbContext.Books
            .AsNoTracking()
            .Include(b => b.Ratings)
            .Where(genre != null ? b => b.Genre.Equals(genre, StringComparison.OrdinalIgnoreCase) : b => true)
            .OrderBy(b => b.Ratings.Count > 0 ? b.Ratings.Average(r => r.Score) : 0)
            .Select(b => new GetRecommendedBookResponse
            {
                Id = b.Id,
                Title = b.Title,
                Author = b.Author,
                Rating = b.AverageRating,
                ReviewsNumber = b.Reviews.Count,
            })
            .ToArrayAsync();

        return Ok(response);
    }

    [HttpGet("books/{id}")]
    [ProducesResponseType(typeof(GetBookWithReviewsResponse), 200)]
    public async Task<IActionResult> GetWithReviews(int id)
    {
        var book = await _dbContext.Books
            .AsNoTracking()
            .Include(b => b.Ratings)
            .Include(b => b.Reviews)
            .Where(b => b.Id == id)
            .FirstOrDefaultAsync();

        if (book == null)
        {
            return NotFound();
        }

        var response = new GetBookWithReviewsResponse
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Cover = book.Cover,
            Content = book.Content,
            Rating = book.AverageRating,
            Reviews = book.Reviews
                .Select(r => new GetBookWithReviewsResponse.Review
                {
                    Id = r.Id, Message = r.Message, Reviewer = r.Reviewer,
                })
                .ToArray(),
        };

        return Ok(response);
    }

    [HttpDelete("books/{id}")]
    public async Task<IActionResult> Delete(int id, [FromQuery(Name = "secret")] string secret)
    {
        var realSecret = HttpContext.RequestServices.GetRequiredService<IConfiguration>()["Secret"];

        if (!secret.Equals(realSecret, StringComparison.Ordinal))
        {
            return Unauthorized();
        }

        var book = await _dbContext.Books
            .AsNoTracking()
            .Where(b => b.Id == id)
            .FirstOrDefaultAsync();

        if (book == null)
        {
            return NotFound();
        }

        _dbContext.Books.Remove(book);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("books/save")]
    [ProducesResponseType(typeof(SaveBookResponse), 200)]
    public async Task<IActionResult> CreateOrEdit([FromBody] SaveBookRequest request)
    {
        void SetProperties(Book book)
        {
            book.Title = request.Title;
            book.Cover = request.Cover;
            book.Content = request.Content;
            book.Author = request.Author;
            book.Genre = request.Genre;
        }

        Book? book;

        if (request.Id.HasValue)
        {
            book = await _dbContext.Books
                .Where(b => b.Id == request.Id.Value)
                .FirstOrDefaultAsync();

            if (book == null)
            {
                return NotFound();
            }

            SetProperties(book);

            await _dbContext.SaveChangesAsync();
            return Ok(new SaveBookResponse {Id = book.Id});
        }

        book = new Book();
        SetProperties(book);

        _dbContext.Books.Add(book);

        await _dbContext.SaveChangesAsync();
        return Ok(new SaveBookResponse {Id = book.Id});
    }

    [HttpPut("books/save/{id}/review")]
    [ProducesResponseType(typeof(ReviewResponse), 200)]
    public async Task<IActionResult> Review(int id, [FromBody] ReviewRequest request)
    {
        var book = await _dbContext.Books
            .Where(b => b.Id == id)
            .FirstOrDefaultAsync();

        if (book == null)
        {
            return NotFound();
        }

        var review = new Review {BookId = book.Id, Message = request.Message, Reviewer = request.Reviewer};

        _dbContext.Reviews.Add(review);
        await _dbContext.SaveChangesAsync();

        return Ok(new ReviewResponse {Id = review.Id});
    }

    [HttpPut("books/save/{id}/rate")]
    public async Task<IActionResult> Rate(int id, [FromBody] RateRequest request)
    {
        var book = await _dbContext.Books
            .Where(b => b.Id == id)
            .FirstOrDefaultAsync();

        if (book == null)
        {
            return NotFound();
        }

        var rating = new Rating {BookId = book.Id, Score = request.Score};

        _dbContext.Ratings.Add(rating);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }
}
