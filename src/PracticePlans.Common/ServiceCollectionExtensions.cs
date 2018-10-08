using System;
using System.ComponentModel;
using Microsoft.Extensions.DependencyInjection;

namespace PracticePlans.Common
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection Add<TService, TImplementation>(this IServiceCollection services, ServiceLifetime serviceLifetime)
            where TService : class
            where TImplementation : class, TService
        {
            if (services == null)
            {
                throw new ArgumentNullException(nameof(services));
            }

            if (!Enum.IsDefined(typeof(ServiceLifetime), serviceLifetime))
            {
                throw new InvalidEnumArgumentException(nameof(serviceLifetime), (int)serviceLifetime, typeof(ServiceLifetime));
            }

            return Add(services, typeof(TService), typeof(TImplementation), serviceLifetime);
        }

        public static IServiceCollection Add<TService>(this IServiceCollection services, Func<IServiceProvider, TService> implementationFactory, ServiceLifetime serviceLifetime)
            where TService : class
        {
            if (services == null)
            {
                throw new ArgumentNullException(nameof(services));
            }

            if (implementationFactory == null)
            {
                throw new ArgumentNullException(nameof(implementationFactory));
            }

            if (!Enum.IsDefined(typeof(ServiceLifetime), serviceLifetime))
            {
                throw new InvalidEnumArgumentException(nameof(serviceLifetime), (int)serviceLifetime, typeof(ServiceLifetime));
            }

            return Add(services, typeof(TService), implementationFactory, serviceLifetime);
        }

        private static IServiceCollection Add(IServiceCollection services, Type serviceType, Type implementationType, ServiceLifetime lifetime)
        {
            if (services == null)
            {
                throw new ArgumentNullException(nameof(services));
            }

            if (serviceType == null)
            {
                throw new ArgumentNullException(nameof(serviceType));
            }

            if (implementationType == null)
            {
                throw new ArgumentNullException(nameof(implementationType));
            }

            if (!Enum.IsDefined(typeof(ServiceLifetime), lifetime))
            {
                throw new InvalidEnumArgumentException(nameof(lifetime), (int)lifetime, typeof(ServiceLifetime));
            }

            var serviceDescriptor = new ServiceDescriptor(serviceType, implementationType, lifetime);
            services.Add(serviceDescriptor);

            return services;
        }

        private static IServiceCollection Add(IServiceCollection services, Type serviceType, Func<IServiceProvider, object> implementationFactory, ServiceLifetime lifetime)
        {
            if (services == null)
            {
                throw new ArgumentNullException(nameof(services));
            }

            if (serviceType == null)
            {
                throw new ArgumentNullException(nameof(serviceType));
            }

            if (implementationFactory == null)
            {
                throw new ArgumentNullException(nameof(implementationFactory));
            }

            if (!Enum.IsDefined(typeof(ServiceLifetime), lifetime))
            {
                throw new InvalidEnumArgumentException(nameof(lifetime), (int)lifetime, typeof(ServiceLifetime));
            }

            var serviceDescriptor = new ServiceDescriptor(serviceType, implementationFactory, lifetime);
            services.Add(serviceDescriptor);

            return services;
        }
    }
}
