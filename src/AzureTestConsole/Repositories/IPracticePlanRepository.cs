using System;
using System.Threading.Tasks;
using AzureTestConsole.Models;

namespace AzureTestConsole.Repositories
{
    public interface IPracticePlanRepository
    {
        Task DeleteAsync(IPracticePlan practicePlan);

        Task<IPracticePlan> GetAsync(DateTime startDate);

        Task UpsertAsync(IPracticePlan practicePlan);
    }
}
