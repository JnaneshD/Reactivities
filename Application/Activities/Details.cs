using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class Details{
        public class Query : IRequest<Activity>
        {
            public Guid Guid {get; set;}
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {   
                _context = context;
            }
            public async Task<Activity> Handle(Query request, CancellationToken token)
            {
                return await this._context.Activities.FirstOrDefaultAsync(x => x.Id == request.Guid);
            }
        }
    }
}