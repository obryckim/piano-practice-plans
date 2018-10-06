using Microsoft.WindowsAzure.Storage;

namespace PracticePlans.Common.Azure.Storage.Factories
{
    public interface ICloudStorageAccountFactory
    {
        CloudStorageAccount Create();
    }
}
