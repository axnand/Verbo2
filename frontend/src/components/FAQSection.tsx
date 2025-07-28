import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is Verbo free to use?",
    answer: "Absolutely. Verbo is 100% free—no subscriptions, paywalls, or hidden fees. We believe powerful AI tools should be accessible to everyone."
  },
  {
    question: "Does Verbo store or share my data?",
    answer: "Never. Verbo runs entirely on your device. We do not collect, store, or transmit any of your text data—your privacy is fully protected."
  },
  {
    question: "Is it compatible with all websites?",
    answer: "Yes, Verbo works seamlessly across most websites. Whether it's a blog, email, form, or editor, you can analyze or rephrase text with ease."
  },
  {
    question: "Can I use Verbo offline?",
    answer: "No. Verbo requires an internet connection to function because it sends your input to our secure API for AI detection, rephrasing, and grammar correction. None of the processing happens locally in your browser."
  },
  {
    question: "How accurate is Verbo’s AI detection?",
    answer: "Verbo achieves up to 94% accuracy on standard detection benchmarks. Actual results may vary based on text length, complexity, and the AI model used."
  },
  {
    question: "Which AI models can Verbo detect?",
    answer: "Verbo is trained to detect text from major AI systems like ChatGPT (GPT-3.5, GPT-4), Claude, Bard, and other transformer-based language models. Our detection engine is updated regularly."
  },
  {
    question: "Does Verbo use OpenAI models?",
    answer: "No. Verbo uses open-source Hugging Face models that run directly in your browser, ensuring transparency, control, and full offline functionality."
  },
  {
    question: "Can I use Verbo inside Google Docs or Word?",
    answer: "Not directly. However, you can copy text into the Verbo extension popup for detection and rephrasing. Support for inline tools is coming soon."
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