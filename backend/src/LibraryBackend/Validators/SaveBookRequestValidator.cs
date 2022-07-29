using LibraryBackend.DTOs.Requests;

namespace LibraryBackend.Validators;

public class SaveBookRequestValidator : AbstractValidator<SaveBookRequest>
{
    public SaveBookRequestValidator()
    {
        RuleFor(x => x.Id);

        RuleFor(x => x.Title)
            .NotEmpty();

        RuleFor(x => x.Cover)
            .NotEmpty();

        RuleFor(x => x.Content)
            .NotEmpty();

        RuleFor(x => x.Genre)
            .NotEmpty();

        RuleFor(x => x.Author)
            .NotEmpty();
    }
}
