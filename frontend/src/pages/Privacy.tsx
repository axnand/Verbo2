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
                  <CardTitle>Privacy First</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    We value your privacy. This application does not collect, store, or share any personal information.
                  </p>
                  <ul className="space-y-2 text-muted-foreground list-disc pl-4">
                    <li>No account or login is required to use the app</li>
                    <li>No cookies are used for tracking or analytics</li>
                    <li>No personal data is stored on our servers</li>
                    <li>No information is shared with third parties</li>
                  </ul>
                  <p className="text-muted-foreground">
                    Everything you do here is processed on the fly and discarded. You're in full control of your data.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you have any concerns or questions about your privacy, feel free to reach out:
                  </p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="font-semibold">Email:</p>
                    <p className="text-muted-foreground">anandmohanjha241@gmail.com</p>
                    <p className="font-semibold mt-2">LinkedIn:</p>
                    <a
                      className="text-muted-foreground hover:underline"
                      href="https://www.linkedin.com/in/anand-mohan-jha-788507256/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.linkedin.com/in/anand-mohan-jha-788507256/
                    </a>
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