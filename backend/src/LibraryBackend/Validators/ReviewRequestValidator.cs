namespace LibraryBackend.Validators;

public class ReviewRequestValidator : AbstractValidator<ReviewRequest>
{
    public ReviewRequestValidator()
    {
        RuleFor(x => x.Message)
            .NotEmpty()
            .Length(2, 256);

        RuleFor(x => x.Reviewer)
            .NotEmpty()
            .Length(2, 30);
    }
}
