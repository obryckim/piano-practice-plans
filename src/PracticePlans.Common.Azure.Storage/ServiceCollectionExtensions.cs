using Microsoft.Extensions.DependencyInjection;
using PracticePlans.Common.Azure.Storage.Factories;
using PracticePlans.Common.Azure.Storage.Repositories;

namespace PracticePlans.Common.Azure.Storage
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCommonAzureStorageServices(this IServiceCollection services, ServiceLifetime serviceLifetime)
        {
            services.LoadFactories(serviceLifetime);
            services.LoadRepositories(serviceLifetime);

            return services;
        }

        private static IServiceCollection LoadFactories(this IServiceCollection services, ServiceLifetime serviceLifetime)
        {
            services
                .AddSingleton<ICloudStorageAccountFactory, CloudStorageAccountFactory>()
                .Add<ICloudTableClientFactory, CloudTableClientFactory>(serviceLifetime)
                .Add<ICloudTableFactory, CloudTableFactory>(serviceLifetime);

            return services;
        }

        private static IServiceCollection LoadRepositories(this IServiceCollection services, ServiceLifetime serviceLifetime)
        {
            services.Add<IPracticePlanRepository, PracticePlanRepository>(serviceLifetime);

            return services;
        }
    }
}
