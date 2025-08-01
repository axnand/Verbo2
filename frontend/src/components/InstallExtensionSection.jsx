import { motion } from "framer-motion"
import { Download, ToggleLeft, Upload, CheckCircle, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const installSteps = [
  {
    number: "01",
    title: "Download the Extension",
    description: "Click the button above to download the ZIP file containing the Verbo extension.",
    icon: Download,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    number: "02", 
    title: "Extract the ZIP",
    description: "Unzip the downloaded file to a folder on your computer.",
    icon: Upload,
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2070&auto=format&fit=crop"
  },
  {
    number: "03",
    title: "Go to Extensions Page", 
    description: "Open Chrome and navigate to chrome://extensions in the address bar.",
    icon: ToggleLeft,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    number: "04",
    title: "Enable Developer Mode",
    description: "Turn on Developer Mode using the toggle at the top right corner.",
    icon: ToggleLeft,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    number: "05",
    title: "Load Unpacked Extension",
    description: "Click 'Load unpacked' and select the extracted folder to install Verbo.",
    icon: Upload,
    image: "https://images.unsplash.com/photo-1600267165860-eb6e5547b336?q=80&w=2070&auto=format&fit=crop"
  },
  {
    number: "06",
    title: "You're All Set!",
    description: "Verbo is now active in your browser and ready to assist you.",
    icon: CheckCircle,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop"
  }
];


export function InstallExtensionSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="install-extension" className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className=" mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Install Extension in Developer Mode
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Follow these simple steps to install Verbo as a developer extension
          </motion.p>
        </motion.div>

        {/* Installation Steps */}
        <div className="grid gap-8 md:gap-12">
          {installSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}  gap-8 lg:gap-12`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-white font-bold text-xl sm:text-xs"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {step.number}
                  </motion.div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                <motion.div 
                  className="flex items-center gap-3 text-primary"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <step.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">Step {step.number}</span>
                </motion.div>
              </div>

              
            </motion.div>
          ))}
        </div>

        {/* Success Message */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="inline-block bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-foreground">Extension Installed!</h4>
                  <p className="text-sm text-muted-foreground">You can now use Verbo on any webpage</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        
      </div>
    </section>
  )
}