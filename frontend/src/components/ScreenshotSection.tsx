import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Chrome, Monitor, Scan, RefreshCw } from "lucide-react"

export function ScreenshotSection() {
  return (
    <section className="py-20 px-6 bg-gradient-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Chrome Extension Preview
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how Verbo integrates seamlessly into your browser workflow for instant AI detection and rephrasing.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Browser Frame */}
          <div className="bg-card/80 backdrop-blur-md rounded-xl border border-white/20 shadow-elevated overflow-hidden">
            {/* Browser Header */}
            <div className="bg-muted/50 px-4 py-3 flex items-center space-x-3 border-b border-white/10">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 bg-background/50 rounded px-3 py-1 text-sm text-muted-foreground flex items-center">
                <Chrome className="w-4 h-4 mr-2" />
                chrome-extension://verbo-ai-detector
              </div>
            </div>

            {/* Extension Interface */}
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Verbo AI Detector</h3>
                    <p className="text-sm text-muted-foreground">Active on this page</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Ready
                </Badge>
              </div>

              {/* Mock Text Analysis */}
              <Card className="bg-background/30 border-dashed border-primary/30">
                <CardContent className="p-4">
                  <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                    <span className="bg-red-500/20 border-b-2 border-red-500 rounded px-1">
                      Artificial intelligence represents a transformative paradigm shift
                    </span> that will fundamentally alter the landscape of human interaction with technology. 
                    <span className="bg-yellow-500/20 border-b-2 border-yellow-500 rounded px-1">
                      This revolutionary advancement promises to optimize and streamline
                    </span> various aspects of our daily lives.
                  </p>
                </CardContent>
              </Card>

              {/* Results */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">AI Confidence</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-background/50 rounded-full h-2">
                      <motion.div 
                        className="bg-red-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "84%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                    <span className="text-sm font-bold text-red-400">84%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Sentences Flagged</p>
                  <p className="text-2xl font-bold text-yellow-400">2/3</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="hero" size="sm" className="w-full">
                  <Scan className="w-4 h-4 mr-2" />
                  Re-analyze
                </Button>
                <Button variant="default" size="sm" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Rephrase
                </Button>
              </div>

              {/* Settings */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Auto-detect on page load</span>
                  <div className="w-10 h-6 bg-primary rounded-full relative">
                    <motion.div 
                      className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm"
                      initial={{ left: 2 }}
                      animate={{ left: 18 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}