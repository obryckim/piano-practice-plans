using Microsoft.WindowsAzure.Storage.Table;

namespace AzureTestConsole.Factories
{
    public interface ICloudTableClientFactory
    {
        CloudTableClient Create();
    }
}
