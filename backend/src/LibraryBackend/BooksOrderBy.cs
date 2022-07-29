using System.Text.Json.Serialization;

namespace LibraryBackend;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum BooksOrderBy
{
    Title,
    Author,
}
