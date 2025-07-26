import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Scan, Wand2, AlertTriangle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api"

export function PlaygroundSection() {
  const [text, setText] = useState("")
  const [aiScore, setAiScore] = useState<number | null>(null)
  const [highlightedText, setHighlightedText] = useState("")
  const [tone, setTone] = useState("general")
  const [rephrased, setRephrased] = useState("")
  const [isDetecting, setIsDetecting] = useState(false)
  const [isRephrasing, setIsRephrasing] = useState(false)
  const [correctedText, setCorrectedText] = useState("");
  const [isCorrecting, setIsCorrecting] = useState(false);
  const { toast } = useToast()

  

  const handleDetectAI = async () => {
  if (!text.trim()) return;

  setIsDetecting(true);
  setHighlightedText(""); // clear previous
  setAiScore(null); // clear previous

  try {
    const res = await fetch(`${apiBaseUrl}/detect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

    const data = await res.json();

    const score = data.overall_ai_score || 0;
    const percentage = Math.round(score * 100);
    setAiScore(percentage);

    const flaggedSentences: { sentence: string; ai_likelihood: number }[] =
      data.flagged_sentences || [];

    const normalize = (str: string) =>
  str.trim().replace(/[.?!]$/, "").toLowerCase();

const sentenceMap = new Map<string, string>();

flaggedSentences.forEach(({ sentence, ai_likelihood }) => {
  let colorClass = "";

  if (ai_likelihood > 0.7) {
    colorClass = "bg-red-500/20 border-b-2 border-red-500";
  } else if (ai_likelihood > 0.4) {
    colorClass = "bg-yellow-500/20 border-b-2 border-yellow-500";
  }

  const normalized = normalize(sentence);
  const span = `<span class="${colorClass} rounded px-1">${sentence}</span>`; 
  sentenceMap.set(normalized, span);
});

const sentences = text.split(/(?<=[.?!])\s+/);

const highlighted = sentences
  .map((s) => sentenceMap.get(normalize(s)) || s)
  .join(" ");
    setHighlightedText(highlighted);
  } catch (err) {
    console.error("Detection failed:", err);
    toast({
      title: "Error",
      description: "Something went wrong while detecting AI content.",
      variant: "destructive",
    });
  }

  setIsDetecting(false);
};

const handleRephrase = async () => {
  if (!text.trim()) return;
  setIsRephrasing(true);

  try {
    const res = await fetch(`${apiBaseUrl}/rephrase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, tone }),
    });
    const data = await res.json();

    setRephrased(data.rephrased_text || "");
  } catch (err) {
    toast({ title: "Error", description: "Failed to rephrase text." });
  } finally {
    setIsRephrasing(false);
  }
};

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    })
  }

  const handleGrammarCheck = async () => { 
    if (!text.trim()) return; 
    setIsCorrecting(true);
    try {
       const res = await fetch(`${apiBaseUrl}/grammar`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ text }),
     }); 
     
    const data = await res.json();

    setCorrectedText(data.corrected_text || "");

    } catch (err) { 
      toast({ title: "Error", description: "Failed to check grammar." }); 
    } finally { 
      setIsCorrecting(false); 
    } 
  };

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
            Interactive AI Playground
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test our AI detection and rephrasing capabilities instantly. Paste any text below to get started.
          </p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Input Section */}
          <Card className="bg-card/50 backdrop-blur-md border border-white/10 shadow-glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scan className="w-5 h-5 text-primary" />
                <span>Input Text</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Textarea
                placeholder="Paste or type your text here to analyze..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px] bg-background/50 border-muted resize-none font-mono text-sm"
              />
              
              <Button 
                onClick={handleDetectAI}
                disabled={!text.trim() || isDetecting}
                variant="hero"
                size="lg"
                className="w-full"
              >
                {isDetecting ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Scan className="w-5 h-5 mr-2" />
                  </motion.div>
                ) : (
                  <Scan className="w-5 h-5 mr-2" />
                )}
                {isDetecting ? "Analyzing..." : "Detect AI"}
              </Button>

              {aiScore !== null && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">AI Confidence Score:</span>
                    <Badge 
                      variant={aiScore > 70 ? "destructive" : aiScore > 40 ? "secondary" : "default"}
                      className="text-lg px-3 py-1"
                    >
                      {aiScore}%
                      {aiScore > 70 ? <AlertTriangle className="w-4 h-4 ml-1" /> : <CheckCircle className="w-4 h-4 ml-1" />}
                    </Badge>
                  </div>
                  
                  {highlightedText && (
                    <div className="p-4 bg-background/30 rounded-lg border">
                      <p className="text-sm font-medium mb-2 text-muted-foreground">Highlighted Suspicious Text:</p>
                      <div 
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: highlightedText }}
                      />
                    </div>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Rephrasing Section */}
          <Card className="bg-card/50 backdrop-blur-md border border-white/10 shadow-glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wand2 className="w-5 h-5 text-accent" />
                <span>Rephrase & Humanize</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rewrite Tone:</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="polite">Polite</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="witty">Witty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleRephrase}
                  disabled={!text.trim() || isRephrasing}
                  variant="default"
                  size="lg"
                  className="w-full"
                >
                  {isRephrasing ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Wand2 className="w-5 h-5 mr-2" />
                    </motion.div>
                  ) : (
                    <Wand2 className="w-5 h-5 mr-2" />
                  )}
                  {isRephrasing ? "Rephrasing..." : "Rephrase"}
                </Button>
                <Button 
                  onClick={handleGrammarCheck}
                  disabled={!text.trim() || isCorrecting}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  {isCorrecting ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Wand2 className="w-5 h-5 mr-2" />
                    </motion.div>
                  ) : (
                    <Wand2 className="w-5 h-5 mr-2" />
                  )}
                  {isCorrecting ? "Fixing Grammar..." : "Fix Grammar"}
                </Button>
              </div>

              {rephrased && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-sm font-medium mb-2 text-green-400">Rephrased Result:</p>
                    <p className="text-sm leading-relaxed font-mono">{rephrased}</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(text, "Original text")}
                      className="flex-1"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Original
                    </Button>
                    <Button 
                      variant="default"
                      size="sm"
                      onClick={() => copyToClipboard(rephrased, "Rephrased text")}
                      className="flex-1"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Rephrased
                    </Button>
                  </div>
                </motion.div>
              )}

              {correctedText && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm font-medium mb-2 text-blue-400">Grammar Fixed:</p>
                    <p className="text-sm leading-relaxed font-mono">{correctedText}</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="default"
                      size="sm"
                      onClick={() => copyToClipboard(correctedText, "Grammar-fixed text")}
                      className="flex-1"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Fixed
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}