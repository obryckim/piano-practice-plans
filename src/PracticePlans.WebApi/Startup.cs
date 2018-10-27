using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PracticePlans.Common.Azure.Storage;
using PracticePlans.Common.Options;

namespace PracticePlans.WebApi
{
    public class Startup
    {
        private readonly IConfiguration configuration;
        private readonly ConfigurationOptions options;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.options = new ConfigurationOptions();
            this.configuration.Bind(this.options);
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // options
            services
                .AddOptions()
                .Configure<ConfigurationOptions>(this.configuration);

            // mvc
            services
                .AddMvc(ConfigureMvcOptions)
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // cors
            services.AddCors(this.ConfigureCorsOptions);

            //// TODO:: enable swagger
            //// swagger
            //// services.AddSwaggerGen(this.ConfigureSwaggerGenOptions);

            // custom services from layers
            services.AddCommonAzureStorageServices(ServiceLifetime.Scoped);

            //// TODO:: enable authentication
            //// authentication
            //// services
            ////     .AddAuthentication(ConfigureAuthenticationOptions)
            ////     .AddJwtBearer(this.ConfigureJwtBearerOptions);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // exceptions
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            //// TODO:: enable swagger
            //// swagger
            //// app.UseSwagger(ConfigureSwaggerOptions);
            //// app.UseSwaggerUI(this.ConfigureSwaggerUiOptions);

            // static files
            app.UseStaticFiles();

            // cors
            app.UseCors(this.options.WebApi.CorsPolicy.PolicyName);

            //// TODO:: enable authentication
            //// authentication
            //// app.UseAuthentication();

            // mvc
            if (!env.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }

            app.UseMvc();
        }

        //// TODO:: configure authentication
        //// private static void ConfigureAuthenticationOptions(AuthenticationOptions options)
        //// {
        ////     options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        //// }

        private static void ConfigureMvcOptions(MvcOptions options)
        {
            //// var defaultAuthPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
            //// options.Filters.Add(new AuthorizeFilter(defaultAuthPolicy));
            //// options.Filters.Add(new ApiCallLoggingAttribute());
        }

        //// TODO:: configure swagger options
        //// private static void ConfigureSwaggerOptions(SwaggerOptions options)
        //// {
        ////     var schemes = new[] { "https" };

        ////     options.RouteTemplate = "docs/{documentName}/swagger.json";
        ////     options.PreSerializeFilters.Add((swaggerDocument, httpRequest) => swaggerDocument.Host = httpRequest.Host.Value);
        ////     options.PreSerializeFilters.Add((swaggerDocument, httpRequest) => swaggerDocument.Schemes = schemes);
        //// }

        private void ConfigureCorsOptions(CorsOptions options)
        {
            var corsPolicy = this.options.WebApi?.CorsPolicy;

            if (corsPolicy == null)
            {
                return;
            }

            options.AddPolicy(
                corsPolicy.PolicyName,
                builder => builder
                    .SetIsOriginAllowedToAllowWildcardSubdomains()
                    .WithOrigins(corsPolicy.AllowedOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod());
        }

        //// TODO:: configure authentication options
        //// private void ConfigureJwtBearerOptions(JwtBearerOptions options)
        //// {
        ////     var key = Encoding.UTF8.GetBytes(this.configOptions.ApplicationSettings.JwtSigningKey);
        ////     var symmetricSecurityKey = new SymmetricSecurityKey(key);

        ////     options.TokenValidationParameters = new TokenValidationParameters
        ////     {
        ////         RequireExpirationTime = true,
        ////         RequireSignedTokens = true,
        ////         ValidateAudience = false,
        ////         ValidateIssuer = true,
        ////         ValidIssuer = this.configOptions.ApplicationSettings.JwtIssuer,
        ////         ValidateIssuerSigningKey = true,
        ////         IssuerSigningKey = symmetricSecurityKey,
        ////         ValidateLifetime = true,
        ////         ClockSkew = TimeSpan.FromMinutes(5)
        ////     };
        //// }

        //// TODO:: configure swagger options
        //// private void ConfigureSwaggerGenOptions(SwaggerGenOptions options)
        //// {
        ////     var swaggerConfigOptions = this.configOptions.Swagger;

        ////     var docInfo = new Info
        ////     {
        ////         Title = swaggerConfigOptions.Title,
        ////         Version = "v1",
        ////         Contact = new Contact
        ////         {
        ////             Name = swaggerConfigOptions.ContactName,
        ////             Email = swaggerConfigOptions.ContactEmail
        ////         },
        ////         Description = swaggerConfigOptions.Description
        ////     };

        ////     options.SwaggerDoc("v1", docInfo);

        ////     // Set the comments path for the Swagger JSON and UI.
        ////     var basePath = PlatformServices.Default.Application.ApplicationBasePath;
        ////     var xmlPath = Path.Combine(basePath, this.configOptions.ApplicationSettings.XmlDocumentationFileName);
        ////     var jwtScheme = new ApiKeyScheme
        ////     {
        ////         Type = "apiKey",
        ////         Name = "Authorization",
        ////         Description = "JWT Token",
        ////         In = "header"
        ////     };

        ////     options.IncludeXmlComments(xmlPath);
        ////     options.IgnoreObsoleteActions();
        ////     options.IgnoreObsoleteProperties();
        ////     options.DescribeAllEnumsAsStrings();
        ////     options.AddSecurityDefinition("http", jwtScheme);

        ////     options.OperationFilter<K2EntityNameOperationFilter>();
        ////     options.SchemaFilter<K2DisplayNameOperationFilter>();
        //// }

        //// TODO:: configure swagger options
        //// private void ConfigureSwaggerUiOptions(SwaggerUIOptions options)
        //// {
        ////     var title = this.configOptions.Swagger.Title;

        ////     options.RoutePrefix = "docs";
        ////     options.SwaggerEndpoint("v1/swagger.json", $"{title} V1");
        ////     options.DocumentTitle(title);
        //// }
    }
}
