using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PracticePlans.Common.Azure.Storage.Models;
using PracticePlans.Common.Azure.Storage.Repositories;

namespace PracticePlans.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class PracticePlansController : ControllerBase
    {
        private readonly IPracticePlanRepository practicePlanRepository;

        public PracticePlansController(IPracticePlanRepository practicePlanRepository)
        {
            this.practicePlanRepository = practicePlanRepository;
        }

        [HttpDelete]
        [Route("{startDate:DateTime}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> DeleteAsync(DateTime startDate)
        {
            var practicePlan = await this.practicePlanRepository.GetAsync(startDate);

            if (practicePlan == null)
            {
                return this.NotFound();
            }

            await this.practicePlanRepository.DeleteAsync(practicePlan);

            return this.NoContent();
        }

        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<ActionResult<IEnumerable<IPracticePlan>>> GetAsync()
        {
            var practicePlans = await this.practicePlanRepository.GetAllAsync();
            return practicePlans.ToList();
        }

        [HttpGet]
        [Route("{startDate:DateTime}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<IPracticePlan>> GetAsync(DateTime startDate)
        {
            var practicePlan = await this.practicePlanRepository.GetAsync(startDate);

            if (practicePlan == null)
            {
                return this.NotFound();
            }

            return (PracticePlanDto)practicePlan;
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<IPracticePlan>> PostAsync(PracticePlanDto practicePlan)
        {
            var newPracticePlan = await this.practicePlanRepository.UpsertAsync(practicePlan);

            return this.CreatedAtAction(
                nameof(this.GetAsync),
                new { startDate = newPracticePlan.StartDate },
                newPracticePlan);
        }

        [HttpPut]
        [Route("{startDate:DateTime}")]
        [Consumes("application/json")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> PutAsync(DateTime startDate, PracticePlanDto practicePlan)
        {
            var practicePlanToUpdate = await this.practicePlanRepository.GetAsync(startDate);

            if (practicePlanToUpdate == null)
            {
                return this.NotFound();
            }

            practicePlanToUpdate.Details = practicePlan.Details;

            await this.practicePlanRepository.UpsertAsync(practicePlanToUpdate);

            return this.NoContent();
        }
    }
}
