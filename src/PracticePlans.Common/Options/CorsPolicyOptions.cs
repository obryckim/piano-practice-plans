using System.Collections.Generic;

namespace PracticePlans.Common.Options
{
    public class CorsPolicyOptions
    {
        public string PolicyName { get; set; }

        public string[] AllowedOrigins { get; set; }
    }
}
