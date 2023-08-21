using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;   
        }

        [HttpGet] // api/activites
        public async Task<ActionResult<List<Activity>>> GetActivites()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] // Get details of an activity //api/activities/{id}
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}