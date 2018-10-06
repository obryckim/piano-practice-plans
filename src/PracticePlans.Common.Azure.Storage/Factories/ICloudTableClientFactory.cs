using Microsoft.WindowsAzure.Storage.Table;

namespace PracticePlans.Common.Azure.Storage.Factories
{
    public interface ICloudTableClientFactory
    {
        CloudTableClient Create();
    }
}
