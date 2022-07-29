namespace LibraryBackend.DTOs.Requests;

public class SaveBookRequest
{
    public int? Id { get; init; }

    public string Title { get; init; } = null!;

    public string Cover { get; init; } = null!;

    public string Content { get; init; } = null!;

    public string Genre { get; init; } = null!;

    public string Author { get; init; } = null!;
}
