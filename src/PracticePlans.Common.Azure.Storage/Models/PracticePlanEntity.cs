using System;
using Microsoft.WindowsAzure.Storage.Table;

namespace PracticePlans.Common.Azure.Storage.Models
{
    public class PracticePlanEntity : TableEntity, IPracticePlan
    {
        public DateTime StartDate { get; set; }

        public string Details { get; set; }

        public static string GetRowKey(IPracticePlan plan) =>
            $"{plan.StartDate.Date.ToString("yyyy.MM.dd")}";

        public static string GetPartitionKey() =>
            new Guid("00000000-0000-0000-0000-000000000001").ToString();
    }
}
