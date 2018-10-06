using System;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using PracticePlans.Common.Options;

namespace PracticePlans.Common.Azure.Storage.Factories
{
    public class CloudStorageAccountFactory : ICloudStorageAccountFactory
    {
        private readonly AzureOptions azureOptions;

        public CloudStorageAccountFactory(IOptions<ConfigurationOptions> optionsAccessor)
        {
            this.azureOptions = optionsAccessor.Value.Azure;
        }

        public CloudStorageAccount Create()
        {
            var connectionString = this.azureOptions.CloudStorageConnectionString;

            if (CloudStorageAccount.TryParse(connectionString, out var storageAccount))
            {
                return storageAccount;
            }

            throw new Exception("Unable to connect to storage account.");
        }
    }
}
