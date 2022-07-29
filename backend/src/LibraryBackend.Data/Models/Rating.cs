namespace LibraryBackend.Data.Models;

public class Rating
{
    public int Id { get; set; }

    public int BookId { get; set; }

    public byte Score { get; set; }

    public Book Book { get; set; } = null!;
}
