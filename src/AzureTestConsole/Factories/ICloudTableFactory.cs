using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;

namespace AzureTestConsole.Factories
{
    public interface ICloudTableFactory
    {
        Task<CloudTable> CreateAsync(string tableName);
    }
}
