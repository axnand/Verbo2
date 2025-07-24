import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ClipboardPaste, Search, RefreshCw, Copy } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: ClipboardPaste,
    title: "Paste or Highlight",
    description: "Simply paste any text into the extension or highlight text directly on any webpage."
  },
  {
    step: "02", 
    icon: Search,
    title: "AI Detection",
    description: "Our advanced algorithms analyze the text and provide confidence scores with highlighted suspicious areas."
  },
  {
    step: "03",
    icon: RefreshCw,
    title: "Choose Your Tone",
    description: "Select from professional, casual, polite, or witty tones to rephrase the content naturally."
  },
  {
    step: "04",
    icon: Copy,
    title: "Copy & Replace",
    description: "Copy the humanized text and seamlessly replace the original content anywhere you need it."
  }
]

export function HowItWorksSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform AI content into authentic, human-like text.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-3 w-6 h-px bg-gradient-to-r from-primary to-accent z-10" />
              )}
              
              <Card className="relative bg-card/50 backdrop-blur-md border border-white/10 shadow-glass hover:shadow-elevated transition-all duration-300 overflow-hidden group-hover:border-primary/50">
                <CardContent className="p-6 text-center">
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <step.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.description}
                  </p>
                </CardContent>
                
                {/* Hover Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  initial={false}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}