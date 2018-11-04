using System;

namespace PracticePlans.Common.Azure.Storage.Models
{
    public interface IPracticePlan
    {
        DateTimeOffset StartDate { get; set; }

        string Details { get; set; }
    }
}
