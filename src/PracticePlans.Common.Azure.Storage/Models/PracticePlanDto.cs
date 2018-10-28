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
            this.Details = practicePlanEntity.Details;
        }

        public DateTime StartDate { get; set; }

        public string Details { get; set; }
    }
}
