using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using MediatR;
using System.Net;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet] // api/activites
        public async Task<ActionResult<List<Activity>>> GetActivites()
        {
            return await Mediator.Send(new List.Query());
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityDetails(Guid id)
        {
            var query = new Details.Query{Guid = id};
            var details = await Mediator.Send(query);
            if(details != null)
            {
                return await Mediator.Send(query);
            }
            else{
                return StatusCode(StatusCodes.Status404NotFound, new ErrorMessage{erroMessage = "Send proper ID"});
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody]Activity activity)
        {
            await Mediator.Send(new Create.Commad{activity = activity});
            return Ok(); 
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id, Activity activity)  
        {
            activity.Id = id;
            try{
            await Mediator.Send(new Edit.Command{Activity = activity});
            }
            catch(Exception ex){
                var errormodel = new ErrorMessage{
                    erroMessage = ex.Message
                };
                return StatusCode(StatusCodes.Status500InternalServerError, errormodel);
            }
            return Ok();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            try{
                await Mediator.Send(new Delete.Command{id = id});
                return Ok();
            }
            catch(Exception ex){
                var errormodel = new ErrorMessage{
                    erroMessage = ex.Message
                };
                return StatusCode(StatusCodes.Status500InternalServerError, errormodel);
            }
        }
    }
}