using System;

namespace AzureTestConsole.Models
{
    public class PracticePlanDto : IPracticePlan
    {
        public PracticePlanDto()
        {
        }

        public PracticePlanDto(PracticePlanEntity practicePlanEntity)
        {
            this.StartDate = practicePlanEntity.StartDate.ToLocalTime();
        }

        public DateTime StartDate { get; set; }
    }
}
