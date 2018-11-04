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
            this.StartDate = practicePlanEntity.StartDate;
            this.Details = practicePlanEntity.Details;
        }

        public DateTimeOffset StartDate { get; set; }

        public string StartDateString => this.StartDate.ToString("yyyy-MM-dd");

        public string Details { get; set; }
    }
}
