import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Chrome, Download, HelpCircle, Sparkles } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export function HeroSection() {

  const scrollToInstall = () => {
    const installSection = document.getElementById('install-extension')
    installSection?.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-accent/5" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1s' }} />
      
      {/* Header */}
      

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          
            
            <motion.div
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent flex items-center space-x-4 justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <span>Verbo</span>
            </motion.div>

          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Expose AI Content. Rephrase Like a Human.
          </motion.p>
          
          <motion.p 
            className="text-lg text-muted-foreground/80 mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Instantly detect AI-generated text and transform it into authentic, human-like content with our powerful Chrome extension.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
             <Button 
              variant="glass" 
              size="xl"
              onClick={scrollToInstall}
              className="group"
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              How to Install
            </Button>
            <Button 
              variant="chrome" 
              size="xl" 
              className="group"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Add to Chrome
              <motion.div
                className="ml-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Download className="w-4 h-4" />
              </motion.div>
            </Button>
            
            <Button variant="glass" size="xl" onClick={() => {
              document.getElementById("playground")?.scrollIntoView({ behavior: "smooth" });
            }}>
              Try Demo Below
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-8 flex items-center justify-center space-x-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>No data stored</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>Works offline</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}