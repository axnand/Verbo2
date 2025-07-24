import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Cpu, Globe, Zap } from "lucide-react"

const techCategories = [
  {
    icon: Globe,
    title: "Frontend Stack",
    description: "Modern web technologies for seamless user experience",
    technologies: ["Vite", "React", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    description: "Cutting-edge AI models for detection and text processing",
    technologies: ["Hugging Face Transformers", "RoBERTa OpenAI Detector", "RedPajama", "ONNX Runtime"]
  },
  {
    icon: Code,
    title: "Browser Extension",
    description: "Cross-platform extension architecture",
    technologies: ["Chrome Extension API", "WebExtensions", "Content Scripts", "Background Workers"]
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized for speed and efficiency",
    technologies: ["WebAssembly", "Service Workers", "IndexedDB", "Streaming Processing"]
  }
]

export function TechStackSection() {
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
            Built with Modern Tech
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leveraging the latest technologies to deliver fast, accurate, and reliable AI detection and text transformation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-md border border-white/10 shadow-glass hover:shadow-elevated transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl">{category.title}</h3>
                      <p className="text-sm text-muted-foreground font-normal">
                        {category.description}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-background/50 hover:bg-primary/20 transition-colors duration-200"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Performance Stats */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { metric: "Detection Speed", value: "<2s", description: "Average analysis time" },
            { metric: "Accuracy Rate", value: "94%", description: "AI detection precision" },
            { metric: "Bundle Size", value: "~800KB", description: "Lightweight extension" }
          ].map((stat, index) => (
            <motion.div
              key={stat.metric}
              whileHover={{ y: -5 }}
              className="text-center p-6 rounded-xl bg-gradient-card border border-white/10"
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="font-medium mb-1">{stat.metric}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}