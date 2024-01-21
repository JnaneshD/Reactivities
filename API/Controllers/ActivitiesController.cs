using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using MediatR;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet] // api/activites
        public async Task<IActionResult> GetActivites()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivityDetails(Guid id)
        {
            var result = await Mediator.Send(new Details.Query{Id = id});
            return this.HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody]Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Commad{activity = activity}));
            //return Ok(); 
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id, Activity activity)  
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id = id}));
        }
    }
}