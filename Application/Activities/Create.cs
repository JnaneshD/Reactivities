using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Commad : IRequest
        {
            public Activity activity { get; set; }
        }

        public class Handler : IRequestHandler<Commad>
        {
        private readonly DataContext context;
            public Handler(DataContext context)
            {
            this.context = context;

            }
            public async Task Handle(Commad request, CancellationToken cancellationToken)
            {

                // Ideally this is the last step that we are going to do to create an activity
                context.Activities.Add(request.activity);
                // This is gonna make sure the changes are commited to the dataabse that we use.
                await context.SaveChangesAsync();
            }
        }
    }
}