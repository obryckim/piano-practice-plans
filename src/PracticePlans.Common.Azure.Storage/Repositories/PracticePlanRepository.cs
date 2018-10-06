using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;
using PracticePlans.Common.Azure.Storage.Factories;
using PracticePlans.Common.Azure.Storage.Models;

namespace PracticePlans.Common.Azure.Storage.Repositories
{
    public class PracticePlanRepository : IPracticePlanRepository
    {
        private const string PracticePlanTableName = "PracticePlans";
        private readonly ICloudTableFactory cloudTableFactory;

        public PracticePlanRepository(ICloudTableFactory cloudTableFactory)
        {
            this.cloudTableFactory = cloudTableFactory;
        }

        public async Task DeleteAsync(IPracticePlan practicePlan)
        {
            var partitionKey = PracticePlanEntity.GetPartitionKey();
            var rowKey = PracticePlanEntity.GetRowKey(practicePlan);
            var cloudTable = await this.cloudTableFactory.CreateAsync(PracticePlanTableName);
            var tableOperation = TableOperation.Retrieve(partitionKey, rowKey);
            var result = await cloudTable.ExecuteAsync(tableOperation);

            if (result?.Result != null && result.Result is ITableEntity)
            {
                tableOperation = TableOperation.Delete((ITableEntity)result.Result);
                await cloudTable.ExecuteAsync(tableOperation);
            }
        }

        public async Task<IPracticePlan> GetAsync(DateTime startDate)
        {
            var cloudTable = await this.cloudTableFactory.CreateAsync(PracticePlanTableName);
            var query = new TableQuery<PracticePlanEntity>
            {
                FilterString = TableQuery.GenerateFilterConditionForDate("StartDate", QueryComparisons.Equal, startDate)
            };
            var continuationToken = new TableContinuationToken();
            var querySegment = await cloudTable.ExecuteQuerySegmentedAsync(query, continuationToken);

            var result = querySegment.Results
                .Select(practicePlanEntity => new PracticePlanDto(practicePlanEntity))
                .SingleOrDefault();

            return result;
        }

        public async Task UpsertAsync(IPracticePlan practicePlan)
        {
            var entity = new PracticePlanEntity
            {
                StartDate = practicePlan.StartDate.ToUniversalTime(),
                PartitionKey = PracticePlanEntity.GetPartitionKey(),
                RowKey = PracticePlanEntity.GetRowKey(practicePlan)
            };

            var cloudTable = await this.cloudTableFactory.CreateAsync(PracticePlanTableName);
            var tableOperation = TableOperation.InsertOrMerge(entity);

            await cloudTable.ExecuteAsync(tableOperation);
        }
    }
}
