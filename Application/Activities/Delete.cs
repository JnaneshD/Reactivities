using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;


namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command command, CancellationToken token)
            {
                var activity = await context.Activities.FindAsync(command.id);
                if(activity == null)
                {
                    return null;
                }

                context.Remove(activity);
                var result = await context.SaveChangesAsync();
                if(result <= 0)
                {
                    return Result<Unit>.Failure("Failed to delete activity");

                }
                return Result<Unit>.Success(Unit.Value);
            }

        }
    }
}