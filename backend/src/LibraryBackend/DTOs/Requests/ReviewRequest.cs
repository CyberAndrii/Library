namespace LibraryBackend.DTOs.Requests;

public class ReviewRequest
{
    public string Message { get; init; } = null!;

    public string Reviewer { get; init; } = null!;
}
