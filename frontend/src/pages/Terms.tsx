import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
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
                Terms of Service
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Terms Content */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    By accessing and using our service, you accept and agree to be bound by the terms 
                    and provision of this agreement. If you do not agree to abide by the above, please 
                    do not use this service.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Use License</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Permission is granted to temporarily download one copy of our service for personal, 
                    non-commercial transitory viewing only. This is the grant of a license, not a transfer 
                    of title, and under this license you may not:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-4">
                    <li>• Modify or copy the materials</li>
                    <li>• Use the materials for any commercial purpose or for any public display</li>
                    <li>• Attempt to reverse engineer any software contained in our service</li>
                    <li>• Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                  
                  <Separator />
                  
                  <p className="text-muted-foreground">
                    This license shall automatically terminate if you violate any of these restrictions 
                    and may be terminated by us at any time. Upon terminating your viewing of these 
                    materials or upon the termination of this license, you must destroy any downloaded 
                    materials in your possession whether in electronic or printed format.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Accounts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Account Creation</h4>
                    <p className="text-muted-foreground">
                      To access certain features of our service, you may be required to create an account. 
                      You must provide accurate and complete information and keep your account information updated.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-2">Account Security</h4>
                    <p className="text-muted-foreground">
                      You are responsible for safeguarding the password and for all activities that occur 
                      under your account. You agree to immediately notify us of any unauthorized use of your account.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-2">Account Termination</h4>
                    <p className="text-muted-foreground">
                      We reserve the right to terminate or suspend your account immediately, without prior 
                      notice or liability, for any reason whatsoever, including breach of the Terms.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prohibited Uses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    You may not use our service:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>• To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>• To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>• To submit false or misleading information</li>
                    <li>• To upload or transmit viruses or any other type of malicious code</li>
                    <li>• To collect or track the personal information of others</li>
                    <li>• To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                    <li>• For any obscene or immoral purpose</li>
                    <li>• To interfere with or circumvent the security features of our service</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We reserve the right to withdraw or amend our service, and any service or material we 
                    provide, in our sole discretion without notice. We will not be liable if for any reason 
                    all or any part of our service is unavailable at any time or for any period.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Disclaimer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The information on this service is provided on an 'as is' basis. To the fullest extent 
                    permitted by law, this Company excludes all representations, warranties, conditions and 
                    terms relating to our service and the use of this service.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Limitations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    In no event shall our Company or its suppliers be liable for any damages (including, 
                    without limitation, damages for loss of data or profit, or due to business interruption) 
                    arising out of the use or inability to use our service, even if we or our authorized 
                    representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Governing Law</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    These terms and conditions are governed by and construed in accordance with the laws of 
                    [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts 
                    in that state or location.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="font-semibold">Email:</p>
                    <p className="text-muted-foreground">legal@yourcompany.com</p>
                    <p className="font-semibold mt-2">Address:</p>
                    <p className="text-muted-foreground">
                      123 Legal Street<br />
                      Legal City, LC 12345<br />
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

export default Terms;