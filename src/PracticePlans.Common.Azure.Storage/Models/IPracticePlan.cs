using System;

namespace PracticePlans.Common.Azure.Storage.Models
{
    public interface IPracticePlan
    {
        DateTime StartDate { get; set; }

        string Details { get; set; }
    }
}
