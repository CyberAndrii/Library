namespace LibraryBackend.DTOs.Responses;

public class GetBookWithReviewsResponse
{
    public class Review
    {
        public int Id { get; init; }

        public string Message { get; init; } = null!;

        public string Reviewer { get; init; } = null!;
    }

    public int Id { get; init; }

    public string Title { get; init; } = null!;

    public string Author { get; init; } = null!;

    public string Cover { get; init; } = null!;

    public string Content { get; init; } = null!;

    public string Genre { get; init; } = null!;

    public double Rating { get; init; }

    public IReadOnlyList<Review> Reviews { get; init; } = null!;
}
