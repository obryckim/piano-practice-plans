using Microsoft.WindowsAzure.Storage;

namespace AzureTestConsole.Factories
{
    public interface ICloudStorageAccountFactory
    {
        CloudStorageAccount Create();
    }
}
