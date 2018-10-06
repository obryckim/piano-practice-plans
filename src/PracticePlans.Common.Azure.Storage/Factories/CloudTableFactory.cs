using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;

namespace PracticePlans.Common.Azure.Storage.Factories
{
    public class CloudTableFactory : ICloudTableFactory
    {
        private readonly ICloudTableClientFactory cloudTableClientFactory;

        public CloudTableFactory(ICloudTableClientFactory cloudTableClientFactory)
        {
            this.cloudTableClientFactory = cloudTableClientFactory;
        }

        public async Task<CloudTable> CreateAsync(string tableName)
        {
            var cloudTableClient = this.cloudTableClientFactory.Create();
            var table = cloudTableClient.GetTableReference(tableName);

            await table.CreateIfNotExistsAsync();

            return table;
        }
    }
}
