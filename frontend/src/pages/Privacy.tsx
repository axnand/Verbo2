import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
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
                Privacy Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Privacy Policy Content */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Personal Information</h4>
                    <p className="text-muted-foreground">
                      We collect information you provide directly to us, such as when you create an account, 
                      subscribe to our service, or contact us for support. This may include your name, email 
                      address, phone number, and payment information.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-2">Usage Information</h4>
                    <p className="text-muted-foreground">
                      We automatically collect certain information about your use of our service, including 
                      your IP address, browser type, operating system, access times, and the pages you view.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-2">Cookies and Tracking</h4>
                    <p className="text-muted-foreground">
                      We use cookies and similar tracking technologies to collect and use personal information 
                      about you. For more information about our use of cookies, please see our Cookie Policy.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Provide, maintain, and improve our services</li>
                    <li>• Process transactions and send related information</li>
                    <li>• Send technical notices, updates, and support messages</li>
                    <li>• Respond to your comments, questions, and customer service requests</li>
                    <li>• Communicate with you about products, services, and events</li>
                    <li>• Monitor and analyze trends, usage, and activities</li>
                    <li>• Detect, investigate, and prevent fraudulent transactions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Information Sharing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    We do not sell, trade, or otherwise transfer your personal information to third parties 
                    without your consent, except as described in this Privacy Policy:
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Service Providers</h4>
                    <p className="text-muted-foreground">
                      We may share your information with third-party service providers who perform services 
                      on our behalf, such as payment processing, data analysis, and customer service.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-2">Legal Requirements</h4>
                    <p className="text-muted-foreground">
                      We may disclose your information if required to do so by law or in response to valid 
                      requests by public authorities.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We implement appropriate technical and organizational security measures to protect your 
                    personal information against unauthorized access, alteration, disclosure, or destruction. 
                    However, no method of transmission over the internet is 100% secure.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Rights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Access and receive a copy of your personal information</li>
                    <li>• Rectify inaccurate personal information</li>
                    <li>• Request deletion of your personal information</li>
                    <li>• Object to processing of your personal information</li>
                    <li>• Request restriction of processing</li>
                    <li>• Data portability</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="font-semibold">Email:</p>
                    <p className="text-muted-foreground">privacy@yourcompany.com</p>
                    <p className="font-semibold mt-2">Address:</p>
                    <p className="text-muted-foreground">
                      123 Privacy Street<br />
                      Privacy City, PC 12345<br />
                      United States
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Privacy;