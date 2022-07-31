namespace LibraryBackend.Validators;

public class SaveBookRequestValidator : AbstractValidator<SaveBookRequest>
{
    public SaveBookRequestValidator()
    {
        RuleFor(x => x.Id);

        RuleFor(x => x.Title)
            .NotEmpty()
            .Length(2, 100);

        RuleFor(x => x.Cover)
            .NotEmpty()
            .Custom((value, context) =>
            {
                if (value.StartsWith("data:image/"))
                {
                    return;
                }

                context.AddFailure("Not a valid image");
            })
            .MaximumLength(2_000_000);

        RuleFor(x => x.Content)
            .NotEmpty()
            .Length(2, 2_000_000);

        RuleFor(x => x.Genre)
            .NotEmpty()
            .Length(2, 20);

        RuleFor(x => x.Author)
            .NotEmpty()
            .Length(2, 30);
    }
}
