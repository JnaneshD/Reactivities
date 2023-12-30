using System.Data;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }

        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;

            }


            public async Task<Result<Unit>> Handle(Command req, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(req.Activity.Id);
                if(activity == null)
                {
                    return null;
                }

                mapper.Map(req.Activity, activity);

                var result = await context.SaveChangesAsync();
                if(result == 0)
                {
                    return Result<Unit>.Failure("Failed to update activity");
                }
                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}