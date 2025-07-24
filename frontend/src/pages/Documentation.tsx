import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Documentation = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navigation />
        
        {/* Main Content */}
        <main className="pt-36 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 text-foreground">
                Documentation
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to get started with our platform. Find guides, API references, and tutorials.
              </p>
            </div>

            {/* Quick Start Guide */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Quick Start Guide
                  <Badge variant="secondary">Popular</Badge>
                </CardTitle>
                <CardDescription>
                  Get up and running in minutes with our step-by-step guide.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Installation</h4>
                      <p className="text-muted-foreground">Install our package using npm or yarn</p>
                      <code className="block bg-muted p-2 rounded mt-2 text-sm">
                        npm install our-package
                      </code>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Configuration</h4>
                      <p className="text-muted-foreground">Set up your configuration file</p>
                      <code className="block bg-muted p-2 rounded mt-2 text-sm">
                        {`// config.js
export default {
  apiKey: 'your-api-key',
  environment: 'development'
}`}
                      </code>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Usage</h4>
                      <p className="text-muted-foreground">Start using our API in your application</p>
                      <code className="block bg-muted p-2 rounded mt-2 text-sm">
                        {`import { initialize } from 'our-package';

const client = initialize(config);
const result = await client.getData();`}
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Reference */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>API Reference</CardTitle>
                <CardDescription>
                  Complete reference for all available endpoints and methods.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn how to authenticate your API requests
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Data Endpoints</h4>
                    <p className="text-sm text-muted-foreground">
                      Access and manipulate your data through our REST API
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Webhooks</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up real-time notifications for your application
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Rate Limits</h4>
                    <p className="text-sm text-muted-foreground">
                      Understand our rate limiting policies and best practices
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SDK Documentation */}
            <Card>
              <CardHeader>
                <CardTitle>SDK Documentation</CardTitle>
                <CardDescription>
                  Language-specific guides and examples for our SDKs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">JavaScript/Node.js</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete guide for JavaScript developers
                    </p>
                    <Badge variant="outline">Popular</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Python</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Python SDK with examples and best practices
                    </p>
                    <Badge variant="outline">New</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Go</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      High-performance Go SDK for enterprise use
                    </p>
                    <Badge variant="outline">Enterprise</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Documentation;