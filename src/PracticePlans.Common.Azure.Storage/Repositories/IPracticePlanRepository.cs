using System;
using System.Threading.Tasks;
using PracticePlans.Common.Azure.Storage.Models;

namespace PracticePlans.Common.Azure.Storage.Repositories
{
    public interface IPracticePlanRepository
    {
        Task DeleteAsync(IPracticePlan practicePlan);

        Task<IPracticePlan> GetAsync(DateTime startDate);

        Task UpsertAsync(IPracticePlan practicePlan);
    }
}
