import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Github, Mail, Twitter, MessageCircle, Heart, Sparkles, Linkedin, LinkedinIcon } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-16 px-6 bg-background border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Brand */}
          <div className="space-y-4">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Verbo
              </span>
            </motion.div>
            <p className="text-muted-foreground leading-relaxed">
              Expose AI Content. Rephrase Like a Human. The ultimate Chrome extension for AI detection and text humanization.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/axnand" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:anandmohanjha241@gmail.com" target="_blank" rel="noopener noreferrer">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
              
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/anand-mohan-jha-788507256/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: "Chrome Web Store", href: "/documentation" },
                // { label: "Documentation", href: "/documentation" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-200"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-3">
              <a 
                href="mailto:hello@verbo.ai" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                <span>anandmohanjha241@gmail.com</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/anand-mohan-jha-788507256/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>

            
            
          </div>
        </motion.div>

        <Separator className="my-8 bg-white/10" />

        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>by</span>
            <a 
              href="https://anandmohan.vercel.app" 
              className="font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anand
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2025 Verbo. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  )
}