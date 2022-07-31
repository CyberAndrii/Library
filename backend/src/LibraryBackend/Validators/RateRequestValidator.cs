namespace LibraryBackend.Validators;

public class RateRequestValidator : AbstractValidator<RateRequest>
{
    public RateRequestValidator()
    {
        RuleFor(x => x.Score)
            .InclusiveBetween<RateRequest, byte>(1, 5);
    }
}
