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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IPracticePlan>>> GetAsync()
        {
            var practicePlans = await this.practicePlanRepository.GetAllAsync();
            return this.Ok(practicePlans);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [Route("{startDate:DateTime}")]
        public async Task<ActionResult<IPracticePlan>> Get(DateTime startDate)
        {
            var practicePlan = await this.practicePlanRepository.GetAsync(startDate);

            if (practicePlan == null)
            {
                return this.NotFound();
            }

            return this.Ok(practicePlan);
        }
    }
}
