using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Routing;
using System.Web.Security;
using WebRole1;

namespace WebRole1
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            AuthConfig.RegisterOpenAuth();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        void Application_End(object sender, EventArgs e)
        {
            //  Code that runs on application shutdown

        }

        void Application_Error(object sender, EventArgs e)
        {
            // Code that runs when an unhandled error occurs

        }
    }
}
