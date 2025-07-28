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
                  <CardTitle>Use at Your Own Risk</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This application uses artificial intelligence models hosted via Hugging Face. The outputs may be inaccurate, biased, or misleading. You are responsible for verifying any content generated before using it in any context.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>No Liability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We do not guarantee the accuracy, reliability, or legality of any AI-generated content. You agree not to hold us liable for any damages, losses, or consequences resulting from the use of this application.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Third-Party Model Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The AI models used in this service are hosted on Hugging Face and developed by third-party contributors. We do not claim ownership of these models or their outputs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Changes to Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    These terms may be updated at any time. By continuing to use this service, you agree to the most recent version.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    For questions or concerns, feel free to contact us:
                  </p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="font-semibold">Email:</p>
                    <p className="text-muted-foreground">anandmohanjha241@gmail.com</p>
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