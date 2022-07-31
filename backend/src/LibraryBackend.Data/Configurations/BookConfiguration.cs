namespace LibraryBackend.Data.Configurations;

public class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasIndex(x => x.Id)
            .IsUnique();

        builder.Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.Cover)
            .IsRequired()
            .HasMaxLength(2_000_000);

        builder.Property(x => x.Content)
            .IsRequired()
            .HasMaxLength(2_000_000);

        builder.Property(x => x.Author)
            .IsRequired()
            .HasMaxLength(30);

        builder.Property(x => x.Genre)
            .IsRequired()
            .HasMaxLength(20);
    }
}
