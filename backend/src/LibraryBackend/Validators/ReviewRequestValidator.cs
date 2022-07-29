using LibraryBackend.DTOs.Requests;

namespace LibraryBackend.Validators;

public class ReviewRequestValidator : AbstractValidator<ReviewRequest>
{
    public ReviewRequestValidator()
    {
        RuleFor(x => x.Message)
            .NotEmpty();

        RuleFor(x => x.Reviewer)
            .NotEmpty();
    }
}
