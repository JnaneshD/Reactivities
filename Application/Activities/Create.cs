using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Commad : IRequest<Result<Unit>>
        {
            public Activity activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Commad>
        {
            public CommandValidator()
            {
                RuleFor(x => x.activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Commad, Result<Unit>>
        {
        private readonly DataContext context;
            public Handler(DataContext context)
            {
            this.context = context;

            }
            public async Task<Result<Unit>> Handle(Commad request, CancellationToken cancellationToken)
            {

                // Ideally this is the last step that we are going to do to create an activity
                context.Activities.Add(request.activity);
                // This is gonna make sure the changes are commited to the dataabse that we use.
                var result = await context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to create Activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}