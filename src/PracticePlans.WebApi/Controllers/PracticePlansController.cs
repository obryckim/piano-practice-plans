using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PracticePlans.Common.Azure.Storage.Models;
using PracticePlans.Common.Azure.Storage.Repositories;

namespace PracticePlans.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            return practicePlans.ToList();
        }
    }
}
