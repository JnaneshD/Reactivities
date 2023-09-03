using System.Data;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }

        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;

            }


            public async Task Handle(Command req, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(req.Activity.Id);
                mapper.Map(req.Activity, activity);
                // Console.WriteLine(activity.Title);
                if (activity.Title == "null")
                {
                    throw new DataException("One of the worst input I have ever seen");
                }
                // activity.Title = req.Activity.Title ?? activity.Title;
                await context.SaveChangesAsync();
            }
        }

    }
}