using Microsoft.WindowsAzure.Storage.Table;

namespace AzureTestConsole.Factories
{
    public class CloudTableClientFactory : ICloudTableClientFactory
    {
        private readonly ICloudStorageAccountFactory cloudStorageAccountFactory;

        public CloudTableClientFactory(ICloudStorageAccountFactory cloudStorageAccountFactory)
        {
            this.cloudStorageAccountFactory = cloudStorageAccountFactory;
        }

        public CloudTableClient Create()
        {
            var cloudStorageAccount = this.cloudStorageAccountFactory.Create();

            return cloudStorageAccount.CreateCloudTableClient();
        }
    }
}
