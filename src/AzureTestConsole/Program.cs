using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using PracticePlans.Common.Azure.Storage.Factories;
using PracticePlans.Common.Azure.Storage.Models;
using PracticePlans.Common.Azure.Storage.Repositories;
using PracticePlans.Common.Options;
using Serilog;
using ILogger = Serilog.ILogger;

namespace AzureTestConsole
{
    internal class Program
    {
        private const string ApplicationTitle = "Azure Test Console";
        private static IServiceCollection services;
        private static IConfigurationRoot configuration;
        private static ConfigurationOptions configOptions;
        private static ILogger logger;

        private static async Task Main(string[] args)
        {
            var exitCode = 0;

            try
            {
                BindConfigurationOptions();
                ConfigureServices();
                ConfigureLogging();

                logger.Information("Starting {applicationTitle}...", ApplicationTitle);

                var serviceProvider = services.BuildServiceProvider();
                var practicePlanRepository = serviceProvider.GetService<IPracticePlanRepository>();

                DateTime startDate = new DateTime(2018, 9, 25);
                var practicePlan = new PracticePlanDto { StartDate = startDate };

                logger.Information("Upserting practice plan with start date {startDate:yyyy-MM-dd}", practicePlan.StartDate);
                await practicePlanRepository.UpsertAsync(practicePlan);

                var fetchedPlan = await practicePlanRepository.GetAsync(startDate);
                logger.Information("Fetched practice plan with start date {startDate:yyyy-MM-dd}", fetchedPlan.StartDate);

                fetchedPlan.StartDate = startDate.AddDays(1);
                logger.Information("Updating the start date to {startDate:yyyy-MM-dd}", fetchedPlan.StartDate);
                await practicePlanRepository.UpsertAsync(fetchedPlan);

                fetchedPlan = await practicePlanRepository.GetAsync(fetchedPlan.StartDate);
                logger.Information("Fetched updated practice plan with start date {startDate:yyyy-MM-dd}", fetchedPlan.StartDate);

                var planToDelete = new PracticePlanDto { StartDate = startDate };
                logger.Information("Deleting the plan with start date {startDate:yyyy-MM-dd}", planToDelete.StartDate);
                await practicePlanRepository.DeleteAsync(planToDelete);

                fetchedPlan = await practicePlanRepository.GetAsync(startDate);
                if (fetchedPlan == null)
                {
                    logger.Information("No practice plan exists with start date {startDate:yyyy-MM-dd}", startDate);
                }
                else
                {
                    logger.Information("Fetched practice plan with start date {startDate:yyyy-MM-dd}", fetchedPlan.StartDate);
                }
            }
            catch (Exception ex)
            {
                logger.Fatal(ex, "An unhandled exception has occurred!");
                exitCode = -1;
            }

            logger.Information("Exiting {applicationTitle} with exit code {exitCode}...", ApplicationTitle, exitCode);
            Log.CloseAndFlush();

            Environment.Exit(exitCode);
        }

        private static void BindConfigurationOptions()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", false)
                .AddUserSecrets<Program>();

            configuration = builder.Build();

            configOptions = new ConfigurationOptions();
            configuration.Bind(configOptions);
        }

        private static void ConfigureLogging()
        {
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .CreateLogger();

            logger = Log.ForContext<Program>();
        }

        private static void ConfigureServices()
        {
            services = new ServiceCollection();

            // logging
            services
                .AddSingleton(new LoggerFactory().AddSerilog())
                .AddLogging();

            // options
            services
                .AddOptions()
                .Configure<ConfigurationOptions>(configuration);

            // // ****************************************************************
            // // services from this layer
            // // ****************************************************************

            // factories
            services
                .AddSingleton<ICloudStorageAccountFactory, CloudStorageAccountFactory>()
                .AddTransient<ICloudTableClientFactory, CloudTableClientFactory>()
                .AddTransient<ICloudTableFactory, CloudTableFactory>();

            // repositories
            services.AddTransient<IPracticePlanRepository, PracticePlanRepository>();
        }
    }
}
