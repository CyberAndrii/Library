namespace LibraryBackend.Data.Models;

public class Review
{
    public int Id { get; set; }

    public int BookId { get; set; }

    public string Message { get; set; } = null!;

    public string Reviewer { get; set; } = null!;

    public Book Book { get; set; } = null!;
}
