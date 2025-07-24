import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is Verbo free to use?",
    answer: "Yes! Verbo is completely free to use. We believe in making AI detection and text humanization accessible to everyone. There are no hidden fees, subscriptions, or usage limits."
  },
  {
    question: "Do you store any of my data?",
    answer: "Absolutely not. Verbo processes all text locally in your browser. Your content never leaves your device, ensuring complete privacy and security. We don't collect, store, or transmit any of your text data."
  },
  {
    question: "Does it work on all websites?",
    answer: "Yes, Verbo works on virtually any website. Our Chrome extension can analyze text from any webpage, form field, or text editor. Simply highlight text or paste it into our popup interface."
  },
  {
    question: "Can I use it offline?",
    answer: "Yes! Once installed, Verbo works completely offline. All AI models are downloaded and run locally in your browser, so you don't need an internet connection to detect AI content or rephrase text."
  },
  {
    question: "How accurate is the AI detection?",
    answer: "Our AI detection model achieves approximately 94% accuracy on standard benchmarks. However, accuracy can vary depending on text length, writing style, and the AI model that generated the content."
  },
  {
    question: "What AI models does it detect?",
    answer: "Verbo can detect content from most major AI models including ChatGPT, GPT-4, Claude, Bard, and other transformer-based language models. Our detection model is regularly updated to stay current with new AI systems."
  }
]

export function FAQSection() {
  return (
    <section className="py-20 px-6 bg-gradient-secondary/30">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Verbo and how it works.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-card/50 backdrop-blur-md border border-white/10 rounded-lg px-6 shadow-glass"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="text-lg font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}