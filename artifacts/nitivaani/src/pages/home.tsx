import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Globe, ArrowRight, ShieldCheck, Zap, 
  Activity, CheckCircle2, MessageSquare, Mic, 
  FileText, Smartphone, Users, MapPin, BarChart3,
  Building, Eye, Play, Sparkles, Database, Server, ServerCrash, 
  ChevronRight, Network
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TRANSLATIONS = {
  en: {
    nav: {
      features: "Features",
      howItWorks: "How It Works",
      vision: "Vision",
      impact: "Impact",
      track: "Track Submission",
      login: "Login",
      join: "Waitlist",
      submit: "Submit Grievance"
    },
    hero: {
      headline: "Your Voice Can Shape India's Future",
      subheadline: "Nitivaani uses advanced AI to instantly route your grievances to the exact right government department and track resolution publicly.",
      primaryCta: "Submit a Grievance",
      secondaryCta: "Track Submission",
      demoCta: "Request Demo"
    },
    trust: {
      aiPowered: "AI-Powered Routing",
      secure: "Secure Infrastructure",
      accessible: "Accessible-First",
      multilingual: "Multilingual",
      transparent: "Transparent Tracking"
    }
  },
  hi: {
    nav: {
      features: "विशेषताएं",
      howItWorks: "यह कैसे काम करता है",
      vision: "दृष्टिकोण",
      impact: "प्रभाव",
      track: "स्थिति ट्रैक करें",
      login: "लॉग इन करें",
      join: "प्रतीक्षा सूची",
      submit: "शिकायत दर्ज करें"
    },
    hero: {
      headline: "आपकी आवाज़ भारत का भविष्य तय कर सकती है",
      subheadline: "नीतिवाणी आपकी शिकायतों को तुरंत सही सरकारी विभाग तक पहुंचाने और समाधान को सार्वजनिक रूप से ट्रैक करने के लिए उन्नत AI का उपयोग करती है।",
      primaryCta: "शिकायत दर्ज करें",
      secondaryCta: "स्थिति ट्रैक करें",
      demoCta: "डेमो का अनुरोध करें"
    },
    trust: {
      aiPowered: "AI-संचालित रूटिंग",
      secure: "सुरक्षित अवसंरचना",
      accessible: "सुलभ-प्रथम",
      multilingual: "बहुभाषी",
      transparent: "पारदर्शी ट्रैकिंग"
    }
  }
};

const STATS = [
  { label: "Projected Resolutions", value: "10M+", prefix: "" },
  { label: "AI Routing Accuracy", value: "99.8", prefix: "%" },
  { label: "Response Speed", value: "12", prefix: "x Faster" },
  { label: "Departments", value: "500+", prefix: "" }
];

export default function Home() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDemoAction = (action: string) => {
    toast({
      title: "Coming Soon",
      description: `${action} feature is currently in closed beta.`,
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-nitivaani-emerald/30 selection:text-nitivaani-navy">
      
      {/* Top Language Bar */}
      <div className="bg-nitivaani-navy text-white text-xs font-medium py-1.5 px-4 flex justify-between items-center z-50 relative">
        <div className="flex items-center gap-2 text-slate-300">
          <Globe className="w-3 h-3" />
          <span>Select Language / भाषा चुनें</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang("en")} 
            className={`transition-colors ${lang === "en" ? "text-nitivaani-saffron font-bold" : "text-slate-400 hover:text-white"}`}
          >
            English
          </button>
          <button 
            onClick={() => setLang("hi")} 
            className={`transition-colors ${lang === "hi" ? "text-nitivaani-saffron font-bold" : "text-slate-400 hover:text-white"}`}
          >
            हिन्दी
          </button>
          <span className="text-slate-500 hidden sm:inline-block ml-2 border-l border-slate-700 pl-4">
            More languages coming soon
          </span>
        </div>
      </div>

      {/* Navigation */}
      <header className={`sticky top-0 w-full z-40 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm" : "bg-transparent absolute"}`}>
        <div className="container mx-auto px-4 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm overflow-hidden flex items-center justify-center p-1">
              <img src="/nitivaani-logo.png" alt="Nitivaani Logo" className="w-full h-full object-contain" />
            </div>
            <span className={`font-display font-bold text-xl tracking-tight ${isScrolled ? "text-nitivaani-navy" : "text-white"}`}>
              Nitivaani
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {["features", "howItWorks", "vision", "impact"].map((item) => (
              <a 
                key={item} 
                href={`#${item}`}
                className={`text-sm font-medium transition-colors hover:text-nitivaani-saffron ${isScrolled ? "text-slate-600" : "text-slate-300"}`}
              >
                {t.nav[item as keyof typeof t.nav]}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => handleDemoAction("Login")}
              className={`text-sm font-medium transition-colors ${isScrolled ? "text-slate-600 hover:text-nitivaani-navy" : "text-slate-300 hover:text-white"}`}
            >
              {t.nav.login}
            </button>
            <Button 
              onClick={() => handleDemoAction("Track")}
              variant="outline" 
              className={`border-nitivaani-emerald/30 text-nitivaani-emerald hover:bg-nitivaani-emerald/10 ${!isScrolled && "bg-transparent border-white/20 text-white hover:bg-white/10"}`}
            >
              {t.nav.track}
            </Button>
            <Button 
              onClick={() => handleDemoAction("Submit")}
              className="bg-nitivaani-navy text-white hover:bg-nitivaani-navy/90 shadow-lg shadow-nitivaani-navy/20"
            >
              {t.nav.submit}
            </Button>
          </div>

          <button 
            className={`lg:hidden p-2 ${isScrolled ? "text-nitivaani-navy" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl lg:hidden"
            >
              <div className="flex flex-col p-4 gap-4">
                {["features", "howItWorks", "vision", "impact"].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-medium text-slate-700 py-2 border-b border-slate-100"
                  >
                    {t.nav[item as keyof typeof t.nav]}
                  </a>
                ))}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button variant="outline" onClick={() => handleDemoAction("Track")} className="w-full">
                    {t.nav.track}
                  </Button>
                  <Button onClick={() => handleDemoAction("Submit")} className="w-full bg-nitivaani-navy">
                    {t.nav.submit}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cinematic Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 overflow-hidden bg-nitivaani-navy dark-section">
        <div className="absolute inset-0 z-0">
          <img src="/hero-bg.png" alt="Abstract India Digital Infrastructure" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-nitivaani-navy/80 via-nitivaani-navy/60 to-nitivaani-navy"></div>
          
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nitivaani-saffron/20 rounded-full blur-[120px] mix-blend-screen"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-nitivaani-emerald/20 rounded-full blur-[120px] mix-blend-screen"></div>
          
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Sparkles className="w-4 h-4 text-nitivaani-saffron" />
              <span className="text-sm font-mono text-white/80 tracking-wide uppercase">V1.0 Closed Beta</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-[1.1] mb-8 text-balance">
              {t.hero.headline}
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t.hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Button 
                size="lg" 
                onClick={() => handleDemoAction("Submit Grievance")}
                className="h-14 px-8 text-base bg-white text-nitivaani-navy hover:bg-slate-100 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all hover:scale-105"
              >
                {t.hero.primaryCta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-14 px-8 text-base border-white/20 text-white hover:bg-white/10 rounded-full backdrop-blur-sm"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {t.hero.demoCta}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-nitivaani-navy border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-display">Request Institutional Demo</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Nitivaani is currently onboarding pilot departments and municipalities.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="dept">Department / Organization</Label>
                      <Input id="dept" placeholder="e.g. BBMP, Ministry of..." className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Official Email</Label>
                      <Input id="email" type="email" placeholder="name@gov.in" className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <Button onClick={() => handleDemoAction("Demo Request")} className="w-full bg-nitivaani-emerald hover:bg-nitivaani-emerald/90 text-white">
                      Request Access
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>
      </section>

      {/* Trust Strip */}
      <div className="bg-slate-50 py-8 border-b border-slate-200 relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-70">
            {[
              { icon: Zap, label: t.trust.aiPowered },
              { icon: ShieldCheck, label: t.trust.secure },
              { icon: Smartphone, label: t.trust.accessible },
              { icon: MessageSquare, label: t.trust.multilingual },
              { icon: Eye, label: t.trust.transparent },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-600 uppercase tracking-wider font-mono">
                <item.icon className="w-4 h-4 text-nitivaani-emerald" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-mono font-bold text-nitivaani-navy mb-2 flex items-center justify-center">
                  {stat.value}
                  <span className="text-nitivaani-saffron ml-1">{stat.prefix}</span>
                </div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="howItWorks" className="py-32 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-mono font-bold text-nitivaani-saffron uppercase tracking-widest mb-4">The Operating System</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">How Nitivaani Works</h3>
            <p className="text-lg text-slate-600">A seamless pipeline from a citizen's phone directly to the responsible official's dashboard, powered by multi-modal AI.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-slate-200 via-nitivaani-emerald/40 to-slate-200 -z-10"></div>

            {[
              {
                step: "01",
                title: "Citizen Submits",
                desc: "Send a voice note in Hindi, a photo of a broken pipe, or a text message. Nitivaani understands intent and urgency natively.",
                icon: Mic,
                color: "bg-blue-100 text-blue-600"
              },
              {
                step: "02",
                title: "AI Routes Intelligently",
                desc: "Our models parse the grievance, map it to the correct municipal or state department, and generate a standardized brief for officials.",
                icon: Activity,
                color: "bg-emerald-100 text-nitivaani-emerald"
              },
              {
                step: "03",
                title: "Transparent Tracking",
                desc: "Citizens get a live tracking link. Departments get SLA alerts. Everything is logged immutably for accountability.",
                icon: CheckCircle2,
                color: "bg-saffron-100 text-nitivaani-saffron"
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative group hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-nitivaani-navy" />
                </div>
                <div className="absolute top-8 right-8 font-mono text-4xl font-black text-slate-100">
                  {step.step}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Previews */}
      <section className="py-32 bg-nitivaani-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-nitivaani-emerald/10 rounded-full blur-[150px]"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-mono font-bold text-nitivaani-emerald uppercase tracking-widest mb-4">Command Center</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Institutional Grade UI.</h3>
              <p className="text-lg text-slate-300">Beautiful, accessible interfaces designed for both the mobile-first citizen and the data-driven official.</p>
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full">
              Explore Interfaces <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm p-2"
            >
              <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden relative group">
                <img src="/mock-routing.png" alt="AI Routing System" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-nitivaani-navy/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-nitivaani-emerald animate-pulse"></span>
                    <span className="text-xs font-mono text-white/80 uppercase">System View</span>
                  </div>
                  <h4 className="text-white font-medium text-xl">AI Routing Confidence Engine</h4>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm p-2"
            >
              <div className="w-full aspect-[3/4] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden relative group">
                <img src="/mock-chat.png" alt="Citizen Chat Interface" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-nitivaani-navy/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-nitivaani-saffron"></span>
                    <span className="text-xs font-mono text-white/80 uppercase">Citizen Portal</span>
                  </div>
                  <h4 className="text-white font-medium text-xl">Multilingual AI Assistant</h4>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Built for scale.</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[
              { icon: Mic, title: "Voice First", desc: "Submit complaints purely via voice in 12+ Indian languages. Automatically transcribed and translated." },
              { icon: Activity, title: "Smart Routing", desc: "LLMs identify the exact sub-department responsible, bypassing bureaucratic red tape." },
              { icon: FileText, title: "Automated Briefs", desc: "Unstructured citizen input is converted into structured, standardized briefs for officials." },
              { icon: BarChart3, title: "Department Analytics", desc: "Real-time dashboards for officials to track resolution times, bottlenecks, and citizen satisfaction." },
              { icon: ShieldCheck, title: "Anonymous Reporting", desc: "Secure whistles-blower mode for sensitive civic issues with guaranteed privacy." },
              { icon: MapPin, title: "Geospatial Heatmaps", desc: "Visualize civic issues across wards and municipalities to allocate resources effectively." }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-nitivaani-emerald/30 group-hover:bg-emerald-50 transition-colors">
                  <feature.icon className="w-6 h-6 text-slate-600 group-hover:text-nitivaani-emerald" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Transparency */}
      <section id="impact" className="py-32 bg-slate-50 relative overflow-hidden border-y border-slate-200">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[500px] w-full rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-200">
              <div className="absolute inset-0 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-display font-bold text-xl text-slate-900">National Reach</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-nitivaani-emerald animate-pulse"></span>
                    <span className="text-xs font-mono text-slate-500 uppercase">Live Network</span>
                  </div>
                </div>
                
                <div className="flex-1 relative bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
                  
                  {/* Abstract India Map visualization */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Network className="w-64 h-64 text-nitivaani-navy/10 absolute" />
                    
                    {/* Data nodes */}
                    {[
                      { top: '30%', left: '40%', size: 'w-4 h-4', label: 'Delhi', delay: 0 },
                      { top: '60%', left: '35%', size: 'w-6 h-6', label: 'Mumbai', delay: 1 },
                      { top: '65%', left: '45%', size: 'w-8 h-8', label: 'Bengaluru', delay: 2 },
                      { top: '45%', left: '60%', size: 'w-3 h-3', label: 'Kolkata', delay: 0.5 },
                      { top: '55%', left: '50%', size: 'w-5 h-5', label: 'Hyderabad', delay: 1.5 },
                      { top: '40%', left: '30%', size: 'w-3 h-3', label: 'Ahmedabad', delay: 0.8 },
                    ].map((node, i) => (
                      <motion.div 
                        key={i}
                        className="absolute flex flex-col items-center"
                        style={{ top: node.top, left: node.left }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: node.delay, duration: 0.5 }}
                      >
                        <div className={`${node.size} rounded-full bg-nitivaani-emerald/80 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse`}></div>
                        <span className="text-[10px] font-mono text-slate-500 mt-1 bg-white/80 px-1 rounded backdrop-blur-sm">{node.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-mono font-bold text-nitivaani-emerald uppercase tracking-widest mb-4">Radical Transparency</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Open Data by Default.</h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We believe that trust is built on visibility. Nitivaani operates on an open-data protocol where aggregate civic resolution metrics are available to the public, journalists, and policy makers in real-time.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Live Resolution Trackers",
                    desc: "Citizens can see average resolution times for their specific ward or municipality.",
                  },
                  {
                    title: "Immutable Logs",
                    desc: "Every grievance state-change is securely logged. No complaint can be quietly deleted.",
                  },
                  {
                    title: "Department Leaderboards",
                    desc: "Healthy competition between municipal departments drives faster response times.",
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-nitivaani-saffron mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-slate-900">{feature.title}</h4>
                      <p className="text-sm text-slate-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scalability Architecture */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-mono font-bold text-nitivaani-navy uppercase tracking-widest mb-4">Architecture</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Engineered for a Billion People.</h3>
            <p className="text-lg text-slate-600">Nitivaani's infrastructure is designed to scale horizontally across states, supporting localized language models and multi-tenant department routing.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Edge Processing", icon: Smartphone, desc: "Lightweight audio transcription running at the edge minimizes bandwidth." },
                { title: "Distributed AI Nodes", icon: Server, desc: "State-specific LLM clusters trained on regional civic taxonomies." },
                { title: "Secure Gov-Cloud", icon: Database, desc: "Data residency compliance with MeitY empanelled secure enclaves." }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all text-center">
                  <div className="w-12 h-12 mx-auto bg-nitivaani-navy text-white rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity / Vision */}
      <section id="vision" className="py-32 bg-slate-900 text-white relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-mono font-bold text-nitivaani-saffron uppercase tracking-widest mb-4">The Vision</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Upgrading India's Civic Bandwidth.
              </h3>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                India has world-class digital infrastructure for payments (UPI) and identity (Aadhaar). Yet, citizen-to-government communication remains fragmented, slow, and opaque.
              </p>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Nitivaani is building the missing layer: an intelligent, scalable routing protocol for civic engagement. We reduce resolution times from months to days, saving millions of hours for both citizens and officials.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Integration with existing state portals",
                  "WhatsApp and SMS bot interfaces",
                  "Open APIs for civic tech developers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-nitivaani-emerald" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button onClick={() => handleDemoAction("Read Whitepaper")} variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full">
                Read the Whitepaper
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-nitivaani-emerald/20 to-nitivaani-saffron/20 rounded-3xl blur-3xl mix-blend-screen"></div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative z-10">
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                  <div>
                    <div className="text-sm text-slate-400 font-mono mb-1">Total Addressable Market</div>
                    <div className="text-3xl font-display font-bold">1.4B+ Citizens</div>
                  </div>
                  <Users className="w-10 h-10 text-slate-500" />
                </div>
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                  <div>
                    <div className="text-sm text-slate-400 font-mono mb-1">Local Bodies & Depts</div>
                    <div className="text-3xl font-display font-bold">250,000+</div>
                  </div>
                  <Building className="w-10 h-10 text-slate-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-400 font-mono mb-1">Annual Grievances</div>
                    <div className="text-3xl font-display font-bold">400M+</div>
                  </div>
                  <Activity className="w-10 h-10 text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-mono font-bold text-nitivaani-navy uppercase tracking-widest mb-4">Voices</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Designed for Every Indian.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I just recorded a voice message in Bhojpuri about the broken transformer in our village. Three days later, the department fixed it. I didn't have to fill a single form.",
                name: "Ramesh Singh",
                role: "Farmer",
                location: "Bihar",
                initials: "RS"
              },
              {
                quote: "As a municipal commissioner, my team used to spend 60% of our time just sorting and assigning complaints. Nitivaani's AI routes them perfectly so we can focus on actual execution.",
                name: "Priya Sharma",
                role: "Municipal Official",
                location: "Bengaluru",
                initials: "PS"
              },
              {
                quote: "The transparency is revolutionary. Our NGO can finally track the lifecycle of civic issues across different wards and hold local representatives accountable with hard data.",
                name: "Anand Desai",
                role: "Civic Rights Activist",
                location: "Mumbai",
                initials: "AD"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative">
                <div className="text-nitivaani-emerald mb-6">
                  <svg className="w-10 h-10 opacity-30" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                </div>
                <p className="text-slate-700 text-lg leading-relaxed mb-8">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-nitivaani-navy text-white flex items-center justify-center font-display font-bold text-lg">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}, {testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-nitivaani-emerald relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-nitivaani-navy mb-6">Ready to shape the future?</h2>
          <p className="text-xl text-nitivaani-navy/80 max-w-2xl mx-auto mb-10">Whether you're a citizen wanting to report an issue, or a government body looking to modernize.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={() => handleDemoAction("Submit")} className="bg-nitivaani-navy text-white hover:bg-slate-800 rounded-full h-14 px-8 text-base">
              Submit a Grievance
            </Button>
            <Button size="lg" onClick={() => handleDemoAction("Partnership")} variant="outline" className="border-nitivaani-navy text-nitivaani-navy hover:bg-nitivaani-navy/10 rounded-full h-14 px-8 text-base">
              Request Government Partnership
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nitivaani-navy pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white rounded-lg p-1">
                  <img src="/nitivaani-logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-display font-bold text-xl text-white">Nitivaani</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-xs">
                The AI-powered operating system for citizen-to-government communication in India.
              </p>
              <div className="text-slate-500 font-mono text-sm">
                © {new Date().getFullYear()} Nitivaani Technologies
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Platform</h4>
              <ul className="space-y-3">
                {["Citizen Portal", "Department Dashboard", "AI Infrastructure", "API Documentation"].map(item => (
                  <li key={item}><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-3">
                {["Vision", "Careers", "Press", "Government Partnerships"].map(item => (
                  <li key={item}><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-3">
                {["Privacy Policy", "Terms of Service", "Accessibility", "Security"].map(item => (
                  <li key={item}><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-500 text-sm">
              Designed & Built in Bengaluru
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
