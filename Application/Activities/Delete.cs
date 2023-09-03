using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid id { get; set; }
        }

        public class Handler : IRequestHandler<Command>{
        private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task Handle(Command command, CancellationToken token)
            {
                var activity = await context.Activities.FindAsync(command.id);
                context.Remove(activity);
                await context.SaveChangesAsync();
            }
        }
    }
}