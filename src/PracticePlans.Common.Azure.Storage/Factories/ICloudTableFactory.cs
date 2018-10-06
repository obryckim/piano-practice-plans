using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;

namespace PracticePlans.Common.Azure.Storage.Factories
{
    public interface ICloudTableFactory
    {
        Task<CloudTable> CreateAsync(string tableName);
    }
}
