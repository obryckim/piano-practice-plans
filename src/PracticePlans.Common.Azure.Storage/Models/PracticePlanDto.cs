using System;

namespace PracticePlans.Common.Azure.Storage.Models
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
