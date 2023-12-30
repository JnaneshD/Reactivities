using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Activities
{
    public class Details{
        public class Query : IRequest<Result<Activity>>
        {
            public Guid Id {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {   
                _context = context;
            }
            public async Task<Result<Activity>> Handle(Query request, CancellationToken token)
            {
                var activity = await this._context.Activities.FindAsync(request.Id) ;
                return Result<Activity>.Success(activity);
            }
        }
    }
}