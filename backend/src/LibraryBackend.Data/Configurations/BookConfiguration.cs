namespace LibraryBackend.Data.Configurations;

public class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasIndex(x => x.Id)
            .IsUnique();

        builder.Property(x => x.Title)
            .IsRequired();

        builder.Property(x => x.Cover)
            .IsRequired();

        builder.Property(x => x.Author)
            .IsRequired();
    }
}
