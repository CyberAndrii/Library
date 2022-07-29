namespace LibraryBackend.DTOs.Responses;

public class GetRecommendedBookResponse
{
    public int Id { get; init; }

    public string Title { get; init; } = null!;

    public string Author { get; init; } = null!;

    public double Rating { get; init; }

    public int ReviewsNumber { get; init; }
}
