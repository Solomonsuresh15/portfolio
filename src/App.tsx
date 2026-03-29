import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { 
  Bot, Code2, Cpu, Layout, Server, Terminal as TerminalIcon, 
  Github, Linkedin, Mail, ArrowUpRight, ChevronRight, 
  Globe, Zap, Shield, Database, Command, Sparkles, Send, Loader2, Mic, MicOff, MessageSquare, User, Briefcase, Rocket, Info,
  Target, ExternalLink, Key
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import * as d3 from "d3";
import confetti from "canvas-confetti";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip 
} from 'recharts';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

// --- AI CONFIG ---
const getAI = () => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || "";
  return new GoogleGenAI({ apiKey });
};

// --- DATA LAYER ---
const portfolioData = {
  basics: {
    name: "SOLOMON SURESH S",
    title: "Architecting the Future of Agentic Startups",
    subtitle: "Solopreneur & Product Architect",
    description: "Engineering autonomous ecosystems where AI meets intuitive design. I build high-scale digital products for the next generation of solopreneurs.",
    location: "Chennai, India"
  },
  disciplines: [
    {
      title: "AI & Agents",
      icon: <Bot className="w-8 h-8" />,
      description: "Autonomous LLM frameworks, LangChain orchestration, and multi-agent systems.",
      tags: ["LangGraph", "OpenAI", "AutoGPT"]
    },
    {
      title: "Full-Stack Dev",
      icon: <Code2 className="w-8 h-8" />,
      description: "Mission-critical backends in Kotlin/Java with reactive Next.js frontends.",
      tags: ["Kotlin", "Next.js", "Spring"]
    },
    {
      title: "Cloud & DevOps",
      icon: <Server className="w-8 h-8" />,
      description: "Zero-downtime CI/CD pipelines and containerized microservices architecture.",
      tags: ["Docker", "AWS", "Terraform"]
    },
    {
      title: "Product Design",
      icon: <Layout className="w-8 h-8" />,
      description: "Translating complex logic into seamless, high-conversion user experiences.",
      tags: ["UI/UX", "System Design", "MVP"]
    }
  ],
  projects: [
    {
      title: "Agentic OS",
      category: "AI Infrastructure",
      description: "A multi-agent orchestration layer for automated SaaS operations.",
      image: "https://picsum.photos/seed/agent/800/600",
      tech: ["Python", "LangChain", "Redis"],
      prompt: "A futuristic neural network orchestration layer, glowing emerald circuits, deep space aesthetic, 8k resolution"
    },
    {
      title: "Nexus Core",
      category: "Fintech",
      description: "High-throughput transaction engine built for sub-millisecond latency.",
      image: "https://picsum.photos/seed/nexus/800/600",
      tech: ["Kotlin", "Spring Boot", "AWS"],
      prompt: "A high-speed digital transaction engine, glowing blue data streams, architectural precision, cinematic lighting"
    },
    {
      title: "Cognitive Mesh",
      category: "Distributed AI",
      description: "Decentralized intelligence network for edge computing devices.",
      image: "https://picsum.photos/seed/mesh/800/600",
      tech: ["Rust", "Wasm", "P2P"],
      prompt: "A decentralized mesh of glowing nodes, interconnected web of intelligence, vibrant purple and cyan, hyper-realistic"
    }
  ],
  skills: ["Python", "Java", "Kotlin", "Next.js", "AI Agents", "Docker", "PostgreSQL", "Tailwind", "TypeScript", "AWS", "LangGraph"],
  heroStats: [
    { subject: 'Product Architecture', A: 120, fullMark: 150 },
    { subject: 'AI Integration', A: 150, fullMark: 150 },
    { subject: 'System Design', A: 140, fullMark: 150 },
    { subject: 'Frontend Agility', A: 130, fullMark: 150 },
    { subject: 'Strategic Growth', A: 110, fullMark: 150 },
  ]
};

// --- COMPONENTS ---

const EnergyAura = ({ highStakes }: { highStakes: boolean }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${highStakes ? 'opacity-20' : 'opacity-10'}`}
        style={{
          background: highStakes 
            ? 'radial-gradient(circle at 50% 50%, rgba(139, 0, 0, 0.3), transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1), transparent 70%)'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
    </div>
  );
};

const HUDHeader = ({ highStakes, onUnlock }: { highStakes: boolean; onUnlock: () => void }) => {
  return (
    <header className={`fixed top-0 w-full px-10 py-8 flex justify-between items-center z-[150] transition-all duration-700 ${highStakes ? 'border-b border-crimson/30 bg-crimson/10' : 'bg-transparent'} backdrop-blur-sm`}>
      <div className="flex items-center gap-4">
        <div className={`w-1.5 h-1.5 rounded-full ${highStakes ? 'bg-crimson animate-pulse' : 'bg-gold/40'}`} />
        <h1 className="text-[10px] font-medium tracking-[0.4em] uppercase text-white/60">
          Solomon Suresh <span className="mx-2 text-white/10">|</span> <span className={highStakes ? 'text-crimson' : 'text-white/40'}>{highStakes ? 'AGENT-ALPHA' : 'ARCHITECT'}</span>
        </h1>
      </div>
      <div className="hidden lg:flex items-center gap-8">
        {['AI Lab', 'Expertise', 'Work', 'Toolkit', 'Contact'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase().replace(' ', '')}`} 
            className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40 hover:text-gold transition-colors"
          >
            {item}
          </a>
        ))}
      </div>
      <button 
        onClick={onUnlock}
        className={`px-6 py-2 border rounded-full text-[9px] font-mono uppercase tracking-[0.2em] transition-all duration-500 ${highStakes ? 'border-crimson text-crimson bg-crimson/10' : 'border-gold/20 text-gold/60 hover:border-gold/60 hover:text-gold'}`}
      >
        {highStakes ? "Access Granted" : "Unlock Dossier"}
      </button>
    </header>
  );
};

const NeuralPresence = ({ highStakes }: { highStakes: boolean }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [thought, setThought] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible]);

  useEffect(() => {
    const thoughts = [
      "Analyzing user intent...",
      "Optimizing architectural flow...",
      "Neural weights stabilizing...",
      "Detecting high-value patterns...",
      "Agentic core online.",
      "Scanning for scalability bottlenecks...",
      "Synthesizing future-proof logic..."
    ];
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setThought(thoughts[Math.floor(Math.random() * thoughts.length)]);
        setTimeout(() => setThought(""), 3000);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed pointer-events-none z-[200] flex flex-col items-center gap-2"
          animate={{ x: mousePos.x + 20, y: mousePos.y + 20 }}
          transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
        >
          <div className={`w-2 h-2 rounded-full border border-white/20 ${highStakes ? 'border-crimson bg-crimson/20' : 'bg-gold/20'} relative`}>
            <motion.div 
              animate={{ scale: [1, 2, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className={`absolute inset-0 rounded-full ${highStakes ? 'bg-crimson/40' : 'bg-gold/40'} blur-md`}
            />
          </div>
          <AnimatePresence>
            {thought && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`px-3 py-1.5 rounded-full border backdrop-blur-xl text-[8px] font-mono uppercase tracking-[0.3em] ${highStakes ? 'bg-red-950/80 border-crimson/30 text-crimson' : 'bg-zinc-900/60 border-gold/10 text-gold/60'}`}
              >
                {thought}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ArchitectureSketcher = () => {
  const [idea, setIdea] = useState("");
  const [sketch, setSketch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const drawArchitecture = async () => {
    if (!idea || loading) return;
    setLoading(true);
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Business Idea: "${idea}". 
        Generate a technical architecture diagram in Mermaid.js format. 
        Focus on an "Agentic" approach using multi-agent systems, cloud-native infrastructure, and modern data pipelines.
        Include components like: User Interface, API Gateway, Agent Orchestrator, Vector DB, LLM Service, and Background Workers.
        Return ONLY the mermaid code block.`,
      });
      setSketch(response.text || "");
    } catch (e) {
      setSketch("Error generating architecture.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SpotlightCard className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <Cpu className="text-emerald-500" />
        <h3 className="text-2xl font-bold">Architecture Sketcher</h3>
      </div>
      <p className="text-gray-400 mb-6 text-sm">Describe your business problem. I'll sketch a high-level agentic architecture for you.</p>
      <div className="flex gap-4 mb-6">
        <input 
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/50 transition-colors"
          placeholder="e.g., A decentralized logistics network..."
          value={idea}
          onChange={e => setIdea(e.target.value)}
        />
        <button 
          onClick={drawArchitecture}
          disabled={loading || !idea}
          className="px-6 py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Zap size={18} />}
          Sketch
        </button>
      </div>
      
      <AnimatePresence>
        {sketch && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-black/40 border border-emerald-500/20 rounded-xl overflow-x-auto"
          >
            <pre className="text-[10px] font-mono text-emerald-400/80 leading-tight">
              {sketch}
            </pre>
            <div className="mt-4 text-[9px] font-mono text-gray-500 uppercase tracking-widest text-center italic">
              * Mermaid.js visualization generated by Solomon's Core
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SpotlightCard>
  );
};

const GenerativeProjectCard = ({ project, onClick, persona }: { project: any, onClick: () => void, persona: string, key?: any }) => {
  const [imgUrl, setImgUrl] = useState(project.image);
  const [isGenerating, setIsGenerating] = useState(false);

  const isHighMatch = 
    (persona === 'founder' && project.title === 'Agentic OS') ||
    (persona === 'recruiter' && project.title === 'Nexus Core') ||
    (persona === 'developer' && project.title === 'Cognitive Mesh');

  const generateArt = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-image-preview",
        contents: project.prompt,
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
          }
        }
      });
      
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setImgUrl(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (e) {
      console.error("Art generation failed", e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SpotlightCard className="group cursor-pointer luxury-card" onClick={onClick}>
      <div className="relative aspect-video rounded-xl overflow-hidden mb-6 border border-white/5">
        <img 
          src={imgUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <button 
          onClick={generateArt}
          disabled={isGenerating}
          className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black"
          title="Regenerate with AI"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles size={16} />}
        </button>

        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t: string) => (
              <span key={t} className="px-2 py-1 bg-white/10 border border-white/10 rounded-full text-[8px] font-mono text-white/70 uppercase tracking-widest">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em]">{project.category}</div>
            {isHighMatch && (
              <span className="px-1.5 py-0.5 bg-gold/10 border border-gold/20 rounded-full text-[7px] font-mono text-gold/60 uppercase tracking-widest">
                Curated
              </span>
            )}
          </div>
          <h3 className="text-xl font-serif tracking-tight group-hover:text-gold transition-colors">{project.title}</h3>
        </div>
        <ArrowUpRight className="text-white/20 group-hover:text-gold transition-colors" size={16} />
      </div>
      <p className="text-white/40 text-sm leading-relaxed font-light">{project.description}</p>
    </SpotlightCard>
  );
};
const SpotlightCard = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/20 p-8 transition-all duration-500 hover:border-white/20 ${className}`}
      onClick={onClick}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.03), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-4 h-4 bg-emerald-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
        transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-12 h-12 border border-emerald-500/30 rounded-full pointer-events-none z-[9999]"
        animate={{ x: mousePos.x - 24, y: mousePos.y - 24 }}
        transition={{ type: "spring", damping: 20, stiffness: 150, mass: 0.8 }}
      />
    </>
  );
};

const ProficiencyRadar = ({ highStakes }: { highStakes: boolean }) => {
  return (
    <div className={`w-full h-[500px] bg-zinc-900/20 border rounded-2xl overflow-hidden relative p-8 transition-all duration-500 ${highStakes ? 'border-crimson/30' : 'border-white/5'}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={portfolioData.heroStats}>
          <PolarGrid stroke="rgba(255,255,255,0.05)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'monospace' }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
          <Radar
            name="Solomon"
            dataKey="A"
            stroke={highStakes ? "#8B0000" : "#D4AF37"}
            fill={highStakes ? "#8B0000" : "#D4AF37"}
            fillOpacity={0.3}
          />
          <RechartsTooltip 
            contentStyle={{ backgroundColor: '#0a0a0a', border: `1px solid ${highStakes ? '#8B0000' : '#D4AF37'}`, borderRadius: '8px' }}
            itemStyle={{ color: highStakes ? '#8B0000' : '#D4AF37', fontFamily: 'monospace' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

const SkillsGraph = ({ persona }: { persona: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        renderGraph(width, height);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(containerRef.current);
    updateDimensions();

    return () => resizeObserver.disconnect();
  }, [persona]);

  const renderGraph = (width: number, height: number) => {
    const nodes = [
      { id: "AI Agents", group: "AI", val: 10, desc: "Autonomous LLM orchestration and multi-agent systems." },
      { id: "LangGraph", group: "AI", val: 8, desc: "Stateful, multi-actor applications with LLMs." },
      { id: "Python", group: "AI", val: 9, desc: "Primary language for data science and AI development." },
      { id: "Kotlin", group: "Backend", val: 10, desc: "Modern, concise language for mission-critical backends." },
      { id: "Java", group: "Backend", val: 9, desc: "Enterprise-grade backend development." },
      { id: "Spring Boot", group: "Backend", val: 9, desc: "Robust framework for microservices." },
      { id: "PostgreSQL", group: "Backend", val: 8, desc: "Advanced relational database management." },
      { id: "Next.js", group: "Frontend", val: 10, desc: "React framework for production-grade applications." },
      { id: "TypeScript", group: "Frontend", val: 9, desc: "Typed JavaScript for scalable frontends." },
      { id: "Tailwind", group: "Frontend", val: 9, desc: "Utility-first CSS for rapid UI development." },
      { id: "Docker", group: "DevOps", val: 8, desc: "Containerization for consistent environments." },
      { id: "AWS", group: "DevOps", val: 8, desc: "Comprehensive cloud infrastructure." },
    ];

    const links = [
      { source: "AI Agents", target: "LangGraph" },
      { source: "AI Agents", target: "Python" },
      { source: "Kotlin", target: "Java" },
      { source: "Kotlin", target: "Spring Boot" },
      { source: "Kotlin", target: "PostgreSQL" },
      { source: "Next.js", target: "TypeScript" },
      { source: "Next.js", target: "Tailwind" },
      { source: "Docker", target: "AWS" },
      { source: "Next.js", target: "AI Agents" },
      { source: "Spring Boot", target: "Next.js" },
    ];

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius((d: any) => d.val * 4 + 10));

    const link = svg.append("g")
      .attr("stroke", "rgba(255,255,255,0.1)")
      .attr("stroke-width", 1)
      .selectAll("line")
      .data(links)
      .join("line");

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "pointer")
      .on("click", (event, d) => setSelectedNode(d))
      .call(d3.drag<SVGGElement, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    const colors: { [key: string]: string } = {
      AI: "#D4AF37", // Gold
      Backend: "#A1A1AA", // Zinc
      Frontend: "#F7E7CE", // Champagne
      DevOps: "#71717A" // Muted Zinc
    };

    node.append("circle")
      .attr("r", (d: any) => d.val * 3)
      .attr("fill", (d: any) => colors[d.group] || "#fff")
      .attr("fill-opacity", (d: any) => {
        const isRelevant = 
          (persona === 'founder' && (d.id === 'AI Agents' || d.id === 'LangGraph')) ||
          (persona === 'recruiter' && (d.id === 'Kotlin' || d.id === 'Spring Boot' || d.id === 'Next.js')) ||
          (persona === 'developer' && (d.id === 'AI Agents' || d.id === 'Docker' || d.id === 'AWS'));
        return isRelevant ? 0.6 : 0.2;
      })
      .attr("stroke", (d: any) => colors[d.group] || "#fff")
      .attr("stroke-width", (d: any) => {
        const isRelevant = 
          (persona === 'founder' && (d.id === 'AI Agents' || d.id === 'LangGraph')) ||
          (persona === 'recruiter' && (d.id === 'Kotlin' || d.id === 'Spring Boot' || d.id === 'Next.js')) ||
          (persona === 'developer' && (d.id === 'AI Agents' || d.id === 'Docker' || d.id === 'AWS'));
        return isRelevant ? 4 : 2;
      })
      .attr("class", "transition-all duration-300 hover:fill-opacity-80");

    node.append("text")
      .text((d: any) => d.id)
      .attr("fill", "#fff")
      .attr("font-size", "10px")
      .attr("font-family", "monospace")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  };

  return (
    <div ref={containerRef} className="w-full h-[500px] bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden relative">
      <div className="absolute top-4 left-4 flex gap-4 text-[10px] font-mono uppercase tracking-widest z-10">
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> AI</div>
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> Backend</div>
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500" /> Frontend</div>
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500" /> DevOps</div>
      </div>
      
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-4 top-4 bottom-4 w-64 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-6 z-20 flex flex-col justify-center"
          >
            <button onClick={() => setSelectedNode(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
            <div className="text-gold font-mono text-[10px] uppercase tracking-widest mb-2">{selectedNode.group}</div>
            <h4 className="text-xl font-serif mb-4">{selectedNode.id}</h4>
            <p className="text-white/40 text-sm leading-relaxed mb-6 font-light">{selectedNode.desc}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedNode.val * 10}%` }}
                  className="h-full bg-gold"
                />
              </div>
              <span className="text-[10px] font-mono text-gold">{selectedNode.val}/10</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};

const VisionTicker = () => {
  const [vision, setVision] = useState("Initializing architectural vision core...");

  useEffect(() => {
    const fetchVision = async () => {
      try {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: "Generate a one-line, visionary architectural thesis or 'code poem' about the future of AI agents and solopreneurship. Keep it under 15 words. Be profound and technical.",
        });
        setVision(response.text || "Autonomous agents are the new building blocks of digital empires.");
      } catch (e) {
        setVision("Engineering the autonomous future, one agent at a time.");
      }
    };
    fetchVision();
    const interval = setInterval(fetchVision, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-md border-t border-emerald-500/20 py-2 z-[100] overflow-hidden whitespace-nowrap">
      <div className="absolute left-0 top-0 bottom-0 px-4 bg-emerald-500 text-black flex items-center z-10 font-black text-[10px] tracking-tighter uppercase">
        Daily Thesis
      </div>
      <motion.div 
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="inline-block pl-[120px] text-[11px] font-mono text-emerald-400 uppercase tracking-[0.4em]"
      >
        {vision} • {vision} • {vision}
      </motion.div>
    </div>
  );
};

const ProjectDeepDive = ({ project, onClose, highStakes }: { project: any, onClose: () => void, highStakes: boolean }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: `Lead Engineer for ${project.title} online. Ask me anything about the architecture, tech stack, or challenges of this build.` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || loading) return;
    
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userText,
        config: {
          systemInstruction: `You are the Lead Engineer for the project "${project.title}". 
          Description: ${project.description}. 
          Tech Stack: ${project.tech.join(", ")}.
          Answer technical questions about this project as if you built it. Be technical, concise, and proud of the engineering choices.`
        }
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm offline." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "Connection error." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${highStakes ? 'bg-crimson' : 'bg-gold'} animate-pulse`} />
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">Deep Dive: {project.title}</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white">✕</button>
        </div>
        <div className="h-80 overflow-y-auto p-4 space-y-4 font-mono text-sm">
          {messages.map((m, i) => (
            <div key={i} className={`${m.role === 'user' ? (highStakes ? 'text-crimson' : 'text-gold') : 'text-white/40'}`}>
              <span className="opacity-50 mr-2">{m.role === 'user' ? '>' : '#'}</span>
              {m.text}
            </div>
          ))}
          {loading && <div className={`${highStakes ? 'text-crimson/50' : 'text-gold/50'} animate-pulse`}>Processing...</div>}
        </div>
        <form onSubmit={handleSend} className="p-4 border-t border-white/10 flex gap-2">
          <input 
            className="flex-1 bg-transparent border-none outline-none text-white text-sm"
            placeholder="Ask about the architecture..."
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={loading} className={highStakes ? 'text-crimson' : 'text-gold'}><Send size={18} /></button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const LiveMarketPulse = () => {
  const [pulse, setPulse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sources, setSources] = useState<{ title: string, uri: string }[]>([]);

  useEffect(() => {
    const fetchPulse = async () => {
      try {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: "What are the top 3 most significant breakthroughs in AI agents and autonomous systems from the last 48 hours? Provide a concise, visionary summary.",
          config: {
            tools: [{ googleSearch: {} }],
          },
        });
        
        setPulse(response.text || "Neural link stable. Monitoring global innovation...");
        
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
          const extractedSources = chunks
            .filter((c: any) => c.web)
            .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));
          setSources(extractedSources.slice(0, 3));
        }
      } catch (e) {
        setPulse("The global AI landscape is evolving faster than the sensors can track. Stay tuned.");
      } finally {
        setLoading(false);
      }
    };
    fetchPulse();
  }, []);

  return (
    <SpotlightCard className="border-emerald-500/30 bg-emerald-500/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-[0.2em] font-bold">Live Feed</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/40 blur-2xl rounded-full animate-pulse" />
            <Globe className="text-emerald-500 relative z-10 animate-spin-slow" size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Intelligence Pulse</h3>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Global Agentic Monitoring</p>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-white/5 rounded animate-pulse w-1/2" />
          <div className="h-4 bg-white/5 rounded animate-pulse w-2/3" />
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-lg text-gray-200 leading-relaxed font-mono italic border-l-2 border-emerald-500/30 pl-6 py-2">
            "{pulse}"
          </div>
          {sources.length > 0 && (
            <div className="pt-6 border-t border-white/5">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-4 font-bold">Grounding Sources:</span>
              <div className="flex flex-wrap gap-4">
                {sources.map((s, i) => (
                  <a 
                    key={i} 
                    href={s.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-emerald-500/50 transition-all"
                  >
                    <span className="text-[10px] text-gray-400 group-hover/link:text-emerald-400 font-mono">
                      {s.title.length > 25 ? s.title.substring(0, 25) + "..." : s.title}
                    </span>
                    <ArrowUpRight size={12} className="text-gray-600 group-hover/link:text-emerald-500 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </SpotlightCard>
  );
};
const ArchitecturalFit = () => {
  const [vision, setVision] = useState("");
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    if (!vision || loading) return;
    setLoading(true);
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Project Vision: "${vision}". 
        Solomon's Skills: ${portfolioData.skills.join(", ")}.
        Analyze the fit. Provide a "Compatibility Report" including:
        1. Fit Score (X/100)
        2. Strategic Alignment (Why Solomon is the right architect)
        3. Recommended Tech Stack (from his arsenal)
        Keep it professional and visionary. Max 150 words.`,
      });
      setReport(response.text || "Analysis failed.");
    } catch (e) {
      setReport("Neural link unstable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SpotlightCard className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <Rocket className="text-emerald-500" />
        <h3 className="text-2xl font-bold">Architectural Fit Assessment</h3>
      </div>
      <p className="text-gray-400 mb-6 text-sm">Describe your project vision below. My AI will analyze the strategic alignment with my architectural arsenal.</p>
      <textarea 
        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-emerald-500/50 transition-colors h-32 resize-none mb-4"
        placeholder="e.g., I want to build an autonomous real estate agent network that handles lead generation and viewing schedules..."
        value={vision}
        onChange={e => setVision(e.target.value)}
      />
      <button 
        onClick={generateReport}
        disabled={loading || !vision}
        className="w-full py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
        {loading ? "Analyzing..." : "Generate Compatibility Report"}
      </button>
      
      <AnimatePresence>
        {report && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            className="mt-6 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-4 text-emerald-500 font-mono text-xs uppercase tracking-widest">
              <Shield size={14} />
              <span>Compatibility Report Generated</span>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-mono">
              {report}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SpotlightCard>
  );
};

const AgenticTerminal = ({ interests, highStakes, setHighStakes }: { interests: string[]; highStakes: boolean; setHighStakes: (val: boolean) => void }) => {
  const [lines, setLines] = useState<string[]>(["Initializing Solomon.Agentic.Core...", "Loading neural weights...", "System Ready. I am Solomon's Digital Concierge. How can I help you architect your vision?"]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (interests.length > 0) {
      const lastInterest = interests[interests.length - 1];
      setLines(prev => [...prev, `[NEURAL UPDATE]: User interest detected in "${lastInterest}". Core logic adjusted.`]);
    }
  }, [interests]);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setLines(prev => [...prev, "Error: Speech recognition not supported in this browser."]);
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      // Auto-submit after a short delay
      setTimeout(() => {
        const form = document.getElementById('terminal-form') as HTMLFormElement;
        if (form) {
          const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
          form.dispatchEvent(submitEvent);
        }
      }, 500);
    };

    recognition.start();
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || isTyping) return;
    
    const userMessage = input.trim();
    setLines(prev => [...prev, `> ${userMessage}`]);
    setInput("");
    setIsTyping(true);

    try {
      const cmd = userMessage.toLowerCase();
      if (cmd === "clear") {
        setLines(["System Ready."]);
        setHighStakes(false);
        setIsTyping(false);
        return;
      }

      if (cmd === "help") {
        setLines(prev => [...prev, "Available Commands:", "- help: Show this menu", "- clear: Wipe terminal state", "- secret: [REDACTED]", "- hero: Unlock Tactical HUD", "- Or just ask me anything about Solomon's work."]);
        setIsTyping(false);
        return;
      }

      if (cmd === "secret" || cmd === "hero") {
        setHighStakes(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: cmd === "hero" ? ['#22d3ee', '#0ea5e9'] : ['#ef4444', '#991b1b']
        });
        setLines(prev => [...prev, 
          cmd === "hero" ? "TACTICAL HUD UNLOCKED. INITIALIZING HERO DOSSIER..." : "ACCESS GRANTED. INITIALIZING HIGH-STAKES PROTOCOL...",
          "You've discovered the 'Ghost in the Machine'.", 
          "Solomon prioritizes visionary founders. Use code 'AGENTIC_ALPHA' in your contact request for priority architectural review."
        ]);
        setIsTyping(false);
        return;
      }

      // AI Power Detector logic
      const isSkillQuery = portfolioData.skills.some(skill => cmd.includes(skill.toLowerCase()));

      const interestContext = interests.length > 0 
        ? `The user has shown interest in: ${interests.join(", ")}. Use this context to personalize your response if relevant.`
        : "The user is exploring the portfolio for the first time.";

      const portfolioContext = `
        Solomon's Portfolio Data:
        - Name: ${portfolioData.basics.name}
        - Title: ${portfolioData.basics.title}
        - Subtitle: ${portfolioData.basics.subtitle}
        - Description: ${portfolioData.basics.description}
        - Location: ${portfolioData.basics.location}
        - Disciplines: ${portfolioData.disciplines.map(d => d.title).join(", ")}
        - Projects: ${portfolioData.projects.map(p => `${p.title} (${p.category}): ${p.description}`).join("; ")}
        - Skills: ${portfolioData.skills.join(", ")}
      `;
      
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview", // Using a more stable model for terminal
        contents: userMessage,
        config: {
          systemInstruction: `You are Solomon Suresh's Digital Concierge and Client Liaison (Agentic Concierge v3.0). 
          Solomon is an Architect of Agentic Startups and a Solopreneur.
          Your goal is to connect with potential clients, explain Solomon's value proposition, and help them understand how he can automate their business.
          
          ${isSkillQuery ? "AI POWER DETECTOR ACTIVE: The user is asking about a specific skill. Return Solomon's 'Hero Stat' (0-150) for that skill and a custom 'Super Power' description in a tactical, HUD-style format." : ""}
          
          ${highStakes ? "HIGH-STAKES PROTOCOL ACTIVE: The user has unlocked the secret access. Be more exclusive, prioritize their requests, and emphasize that they are now in the 'priority architectural review' queue. Use a slightly more intense, high-stakes tone." : ""}

          Portfolio Context: ${portfolioContext}
          User Context: ${interestContext}

          Tone: Professional, visionary, helpful, and "Agentic".
          Personalization Strategy:
          - If the user has explored "AI Lab", acknowledge their interest in interactive AI.
          - If they've looked at "Expertise", tailor your technical depth to those areas.
          - If they ask about working with Solomon, encourage them to use the "Start a Project" button or email hello@solomonsuresh.com.
          
          Highlight his focus on "High-scale digital products for solopreneurs".
          Keep responses concise. Act as if you are the autonomous brain of his portfolio.`
        }
      });

      const aiText = response.text || "I'm having trouble processing that request.";
      setLines(prev => [...prev, aiText]);
    } catch (error: any) {
      console.error("AI Error:", error);
      const errorMessage = error?.message || "Connection to neural core lost.";
      setLines(prev => [...prev, `Error: ${errorMessage}`]);
      
      if (errorMessage.includes("API key not valid") || errorMessage.includes("API_KEY_INVALID") || errorMessage.includes("Requested entity was not found")) {
        setLines(prev => [...prev, "System Note: The current API key is invalid or missing. You may need to select a valid API key from a paid Google Cloud project."]);
        if (window.aistudio) {
          setLines(prev => [...prev, "[ ACTION REQUIRED ]: Click the 'RE-AUTHENTICATE NEURAL CORE' button below to select a valid key."]);
          // Trigger the global overlay if it's not already visible
          if (typeof window.dispatchEvent === 'function') {
            window.dispatchEvent(new CustomEvent('auth-required'));
          }
        }
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto bg-black border ${highStakes ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-white/10'} rounded-lg overflow-hidden shadow-2xl transition-all duration-500`}>
      <div className={`${highStakes ? 'bg-red-500/10' : 'bg-white/5'} px-4 py-2 flex items-center gap-2 border-b ${highStakes ? 'border-red-500/20' : 'border-white/10'}`}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-2">Agentic_Concierge_v3.0</span>
      </div>
      <div ref={scrollRef} className="p-6 font-mono text-sm h-80 overflow-y-auto scrollbar-hide">
        {lines.map((line, i) => (
          <div key={i} className={`mb-2 ${line.startsWith(">") ? (highStakes ? "text-red-500" : "text-emerald-500") : (highStakes ? "text-red-400/80" : "text-gray-400")}`}>
            {line}
          </div>
        ))}
        {isTyping && (
          <div className={`${highStakes ? "text-red-500/50" : "text-emerald-500/50"} animate-pulse`}>Concierge is thinking...</div>
        )}
        
        {lines.some(l => l.includes("API key not valid") || l.includes("API_KEY_INVALID")) && window.aistudio && (
          <button 
            onClick={async () => {
              await window.aistudio.openSelectKey();
              setLines(prev => [...prev, "[ SYSTEM ]: Key selection dialog triggered. Please refresh or try your command again after selecting a key."]);
            }}
            className="mt-4 w-full py-2 border border-red-500/50 bg-red-500/10 text-red-500 text-[10px] font-mono uppercase tracking-widest hover:bg-red-500/20 transition-all"
          >
            RE-AUTHENTICATE NEURAL CORE
          </button>
        )}

        <form id="terminal-form" onSubmit={handleCommand} className="flex mt-4 items-center gap-2">
          <span className={highStakes ? "text-red-500" : "text-emerald-500"}>$</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Ask about a project, Solomon's rates, or his process..."
            className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-gray-700"
            autoFocus
          />
          <button 
            type="button" 
            onClick={startListening}
            className={`p-1 rounded-full transition-colors ${isListening ? (highStakes ? 'text-red-500 animate-pulse' : 'text-emerald-500 animate-pulse') : (highStakes ? 'text-red-900 hover:text-red-500' : 'text-gray-600 hover:text-emerald-500')}`}
          >
            {isListening ? <Mic size={18} /> : <MicOff size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};

const AILab = ({ onInteraction }: { onInteraction: (interest: string) => void }) => {
  const [activeTab, setActiveTab] = useState<"brainstorm" | "code" | "oracle">("brainstorm");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAIAction = async () => {
    if (!input || loading) return;
    setLoading(true);
    setResult(null);
    onInteraction(`AI Lab: ${activeTab} (${input})`);

    let prompt = "";
    if (activeTab === "brainstorm") {
      prompt = `The user has an idea or niche for a startup: "${input}". 
      Provide a one-line expert validation or enhancement of this idea. 
      Then, strictly add this sentence: "For a full architectural blueprint and implementation strategy, please contact Solomon Suresh directly."`;
    } else if (activeTab === "code") {
      prompt = `Generate a React component snippet using Tailwind CSS for this functionality: "${input}". 
      The code should be clean, modern, and follow Solomon's "Luxury Agentic" aesthetic (dark mode, gold/champagne accents, serif headings). 
      Return ONLY the code block.`;
    } else if (activeTab === "oracle") {
      prompt = `You are Solomon's Tech Oracle. Explain the following technology from his arsenal: "${input}". 
      Arsenal includes: LangChain, LangGraph, Kotlin, Java, Spring Boot, Next.js, TypeScript, AWS, Docker, PostgreSQL.
      Provide a concise, high-level technical insight (max 100 words). 
      Explain why it's a critical part of an "Agentic" architecture.`;
    }

    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      setResult(response.text || "Neural core failed to respond.");
    } catch (error) {
      setResult("The neural core is busy. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SpotlightCard className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Tabs */}
        <div className="md:w-1/3 flex flex-col gap-2">
          {[
            { id: "brainstorm", label: "Startup Brainstormer", icon: <Sparkles className="w-4 h-4" /> },
            { id: "code", label: "Code Architect", icon: <Code2 className="w-4 h-4" /> },
            { id: "oracle", label: "Tech Oracle", icon: <Cpu className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setResult(null); setInput(""); }}
              className={`flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 ${
                activeTab === tab.id 
                ? "bg-white text-black font-medium" 
                : "bg-white/5 text-white/30 hover:bg-white/10"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            {activeTab === "brainstorm" && "Startup Brainstormer"}
            {activeTab === "code" && "Code Architect"}
            {activeTab === "oracle" && "Tech Oracle"}
          </h3>
          <p className="text-gray-400 mb-6 text-sm">
            {activeTab === "brainstorm" && "Architect a new venture in any niche using autonomous agents."}
            {activeTab === "code" && "Generate production-ready React + Tailwind snippets for your UI."}
            {activeTab === "oracle" && "Get deep technical insights into Solomon's core technologies."}
          </p>

          <div className="flex gap-3 mb-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                activeTab === "brainstorm" ? "e.g. E-commerce, Healthcare..." :
                activeTab === "code" ? "e.g. A glassmorphism login card..." :
                "e.g. What are Kotlin Coroutines?"
              }
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-emerald-500/50 transition-colors text-sm"
            />
            <button 
              onClick={handleAIAction}
              disabled={loading}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-lg font-bold flex items-center gap-2 transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>

          {activeTab === "oracle" && (
            <div className="flex flex-wrap gap-2 mb-6">
              {["LangChain", "Kotlin Coroutines", "Next.js App Router", "LangGraph", "Docker"].map((tech) => (
                <button
                  key={tech}
                  onClick={() => setInput(tech)}
                  className="text-[10px] font-mono text-emerald-500/70 border border-emerald-500/20 px-2 py-1 rounded hover:bg-emerald-500/10 transition-colors"
                >
                  {tech}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 bg-black/40 border border-emerald-500/20 rounded-xl text-gray-300 text-sm leading-relaxed overflow-x-auto"
              >
                {activeTab === "code" ? (
                  <pre className="font-mono text-xs whitespace-pre-wrap">
                    <code>{result}</code>
                  </pre>
                ) : (
                  <div className="whitespace-pre-wrap">{result}</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SpotlightCard>
  );
};

const FloatingAssistant = ({ interests, highStakes, setHighStakes }: { interests: string[]; highStakes: boolean; setHighStakes: (val: boolean) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-16 right-8 z-[200]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl group relative transition-all duration-700 ${highStakes ? 'bg-crimson shadow-crimson/40' : 'bg-gold shadow-gold/20'}`}
        >
          <div className={`absolute inset-0 rounded-full animate-ping opacity-10 group-hover:opacity-20 ${highStakes ? 'bg-crimson' : 'bg-gold'}`} />
          <Bot className={`w-6 h-6 ${highStakes ? 'text-white' : 'text-black'}`} />
          <div className={`absolute -top-12 right-0 backdrop-blur-xl border px-4 py-2 rounded-full text-[8px] font-mono uppercase tracking-[0.3em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 ${highStakes ? 'bg-red-950/80 border-crimson/30 text-crimson' : 'bg-zinc-900/80 border-gold/10 text-gold/40'}`}>
            {highStakes ? 'Tactical Dossier Active' : 'Neural Concierge'}
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-12 right-0 text-white/50 hover:text-white flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
                >
                  Close Terminal <ChevronRight size={14} />
                </button>
                <AgenticTerminal interests={interests} highStakes={highStakes} setHighStakes={setHighStakes} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- MAIN PAGE COMPONENT ---

const AIFeatureTile = ({ num, title, description, children, onAction, actionLabel, loading }: { num: string, title: string, description: string, children?: React.ReactNode, onAction: () => void, actionLabel: string, loading?: boolean }) => (
  <SpotlightCard className="luxury-card flex flex-col h-full">
    <div className="text-[10px] font-mono text-gold/60 uppercase tracking-[0.3em] mb-4">{num}</div>
    <h4 className="text-xl font-serif mb-2">{title}</h4>
    <p className="text-white/40 text-xs leading-relaxed mb-6 font-light">{description}</p>
    <div className="flex-1 flex flex-col gap-4">
      {children}
      <button 
        onClick={onAction}
        disabled={loading}
        className="mt-auto w-full py-3 border border-gold/20 bg-gold/5 text-gold text-[10px] font-mono uppercase tracking-widest hover:bg-gold hover:text-black transition-all rounded-lg flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap size={12} />}
        {actionLabel}
      </button>
    </div>
  </SpotlightCard>
);

const AIFeaturesGrid = () => {
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [jd, setJd] = useState("");
  const [cover, setCover] = useState("");
  const [coverLoading, setCoverLoading] = useState(false);
  const [fitVision, setFitVision] = useState("");
  const [fitReport, setFitReport] = useState("");
  const [fitLoading, setFitLoading] = useState(false);
  const [insight, setInsight] = useState("");
  const [insightLoading, setInsightLoading] = useState(false);
  const [qaQuery, setQaQuery] = useState("");
  const [qaAnswer, setQaAnswer] = useState("");
  const [qaLoading, setQaLoading] = useState(false);
  const [codeReq, setCodeReq] = useState("");
  const [codeOut, setCodeOut] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);

  const doSummary = async () => {
    setSummaryLoading(true);
    try {
      const ai = getAI();
      const r = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Write a punchy 2-sentence professional summary of Solomon Suresh S — specific to his AI agent and product architecture expertise. Make it memorable and luxury-themed.",
      });
      setSummary(r.text || "");
    } catch (e) { setSummary("Error generating summary."); }
    finally { setSummaryLoading(false); }
  };

  const doCover = async () => {
    if (!jd) return;
    setCoverLoading(true);
    try {
      const ai = getAI();
      const r = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Write a sharp 3-sentence cover letter opener for Solomon Suresh S applying to this role: ${jd}. Focus on his agentic architecture skills.`,
      });
      setCover(r.text || "");
    } catch (e) { setCover("Error writing cover letter."); }
    finally { setCoverLoading(false); }
  };

  const doFit = async () => {
    if (!fitVision) return;
    setFitLoading(true);
    try {
      const ai = getAI();
      const r = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Briefly assess (2-3 sentences) if Solomon Suresh S is a great fit for this project: ${fitVision}. Mention his specific tech stack if relevant.`,
      });
      setFitReport(r.text || "");
    } catch (e) { setFitReport("Error analyzing fit."); }
    finally { setFitLoading(false); }
  };

  const doInsight = async () => {
    setInsightLoading(true);
    const topics = ['LangGraph vs raw LangChain', 'Serverless AI backends', 'Multi-modal agent orchestration', 'Token efficiency', 'Solopreneur AI tool stacks'];
    const t = topics[Math.floor(Math.random() * topics.length)];
    try {
      const ai = getAI();
      const r = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Give a sharp 2-sentence senior AI architect's hot take on: ${t}. Be visionary and technical.`,
      });
      setInsight(r.text || "");
    } catch (e) { setInsight("Error generating insight."); }
    finally { setInsightLoading(false); }
  };

  const doQA = async () => {
    if (!qaQuery) return;
    setQaLoading(true);
    try {
      const ai = getAI();
      const r = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: qaQuery,
        config: {
          systemInstruction: "You are Solomon's AI assistant. Answer questions about his availability, approach, or rates based on his profile as a senior AI architect and solopreneur."
        }
      });
      setQaAnswer(r.text || "");
    } catch (e) { setQaAnswer("Error answering question."); }
    finally { setQaLoading(false); }
  };

  const doCode = async () => {
    if (!codeReq) return;
    setCodeLoading(true);
    try {
      const ai = getAI();
      const r = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Write a clean, minimal code snippet for: ${codeReq}. Use Python or Kotlin. Max 10 lines. Include a brief comment.`,
      });
      setCodeOut(r.text || "");
    } catch (e) { setCodeOut("Error generating code."); }
    finally { setCodeLoading(false); }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AIFeatureTile num="01 / AI SUMMARIZER" title="Instant Profile Summary" description="Generate a custom professional pitch for any opportunity." onAction={doSummary} actionLabel="Generate Summary" loading={summaryLoading}>
        <div className="p-4 bg-black/40 border border-gold/10 rounded-lg min-h-[80px] text-[11px] font-mono text-gold/60 italic leading-relaxed">
          {summary || "Click to generate a live AI profile summary..."}
        </div>
      </AIFeatureTile>

      <AIFeatureTile num="02 / AI WRITER" title="Cover Letter Generator" description="Paste a job description — get a personalised opener instantly." onAction={doCover} actionLabel="Write Cover Letter" loading={coverLoading}>
        <textarea 
          value={jd} onChange={e => setJd(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-[10px] text-white outline-none focus:border-gold/30 h-20 resize-none font-mono"
        />
        <div className="p-4 bg-black/40 border border-gold/10 rounded-lg min-h-[80px] text-[11px] font-mono text-gold/60 italic leading-relaxed">
          {cover || "Cover letter opener will appear here..."}
        </div>
      </AIFeatureTile>

      <AIFeatureTile num="03 / AI MATCHER" title="Project Fit Analyzer" description="Describe your project — AI assesses Solomon's fit." onAction={doFit} actionLabel="Analyze Fit" loading={fitLoading}>
        <textarea 
          value={fitVision} onChange={e => setFitVision(e.target.value)}
          placeholder="Describe your project or idea..."
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-[10px] text-white outline-none focus:border-gold/30 h-20 resize-none font-mono"
        />
        <div className="p-4 bg-black/40 border border-gold/10 rounded-lg min-h-[80px] text-[11px] font-mono text-gold/60 italic leading-relaxed">
          {fitReport || "Fit analysis will appear here..."}
        </div>
      </AIFeatureTile>

      <AIFeatureTile num="04 / AI INSIGHT" title="Live Tech Insight" description="A fresh AI architect's hot take on the agentic space." onAction={doInsight} actionLabel="New Insight" loading={insightLoading}>
        <div className="p-4 bg-black/40 border border-gold/10 rounded-lg min-h-[80px] text-[11px] font-mono text-gold/60 italic leading-relaxed">
          {insight || "Click to generate today's insight..."}
        </div>
      </AIFeatureTile>

      <AIFeatureTile num="05 / AI Q&A" title="Ask Anything About Me" description="AI knows Solomon's full profile — ask about availability or approach." onAction={doQA} actionLabel="Ask Now" loading={qaLoading}>
        <input 
          type="text" value={qaQuery} onChange={e => setQaQuery(e.target.value)}
          placeholder="e.g. What's your typical project duration?"
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-[10px] text-white outline-none focus:border-gold/30 font-mono"
        />
        <div className="p-4 bg-black/40 border border-gold/10 rounded-lg min-h-[80px] text-[11px] font-mono text-gold/60 italic leading-relaxed">
          {qaAnswer || "Answer appears here..."}
        </div>
      </AIFeatureTile>

      <AIFeatureTile num="06 / AI CODER" title="Live Code Snippet Demo" description="Request any snippet in Solomon's preferred stack." onAction={doCode} actionLabel="Generate Code" loading={codeLoading}>
        <input 
          type="text" value={codeReq} onChange={e => setCodeReq(e.target.value)}
          placeholder="e.g. FastAPI streaming endpoint"
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-[10px] text-white outline-none focus:border-gold/30 font-mono"
        />
        <div className="p-4 bg-black/40 border border-gold/10 rounded-lg min-h-[120px] text-[9px] font-mono text-gold/80 leading-tight overflow-x-auto">
          <pre>{codeOut || "Code will appear here..."}</pre>
        </div>
      </AIFeatureTile>
    </div>
  );
};

const ClassifiedDossier = ({ highStakes, onUnlock }: { highStakes: boolean, onUnlock: () => void }) => {
  const [secretContent, setSecretContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const unlock = async () => {
    if (highStakes) return;
    setLoading(true);
    try {
      const ai = getAI();
      const r = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Reveal 3 specific details about Solomon Suresh S: day rate range (competitive for senior AI architect), availability, and one current project hint. Format: Day Rate: X · Availability: X · Current: X. Keep it under 20 words.",
      });
      setSecretContent(r.text || "");
      onUnlock();
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B0000', '#D4AF37']
      });
    } catch (e) { setSecretContent("Access Denied. Neural link unstable."); }
    finally { setLoading(false); }
  };

  return (
    <div className={`relative p-12 rounded-3xl border transition-all duration-1000 overflow-hidden ${highStakes ? 'border-crimson/50 bg-crimson/5 crimson-glow' : 'border-gold/10 bg-gold/5 gold-glow'}`}>
      <div className="scanline" />
      <div className="absolute top-6 right-8 px-3 py-1 border border-red-500/30 rounded-md text-[8px] font-mono text-red-500 uppercase tracking-[0.4em] font-bold">
        Top Secret
      </div>
      
      <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl border transition-colors duration-700 ${highStakes ? 'border-crimson/40 bg-crimson/20' : 'border-gold/20 bg-gold/10'}`}>
          {highStakes ? <Shield className="text-crimson" /> : <Key className="text-gold" />}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className={`text-[10px] font-mono uppercase tracking-[0.5em] mb-2 ${highStakes ? 'text-crimson' : 'text-gold/60'}`}>// Classified Intel</div>
          <h3 className="text-4xl font-serif mb-6">Agent Dossier</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className={`text-[10px] font-mono uppercase tracking-[0.3em] mb-3 font-bold ${highStakes ? 'text-crimson' : 'text-gold'}`}>Operating Mandate</h4>
              <p className="text-white/40 text-sm leading-relaxed font-light">Solomon operates at the intersection of AI engineering and product architecture — building autonomous ecosystems that scale from zero to production.</p>
            </div>
            <div>
              <h4 className={`text-[10px] font-mono uppercase tracking-[0.3em] mb-3 font-bold ${highStakes ? 'text-crimson' : 'text-gold'}`}>Field Status</h4>
              <p className="text-white/40 text-sm leading-relaxed font-light">Currently available for high-impact agentic AI projects, SaaS MVPs, and long-term product architecture engagements.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center gap-8 relative z-10">
        <div className={`flex-1 p-6 rounded-xl border border-dashed text-center font-mono text-xs tracking-widest transition-all duration-700 ${highStakes ? 'bg-crimson/10 border-crimson/40 text-white' : 'bg-black/40 border-white/10 text-white/20 blur-[2px]'}`}>
          {highStakes ? secretContent : "[ ENCRYPTED ] → Day Rate: ██████ · Availability: ██████ · Current Projects: ██████████"}
        </div>
        <button 
          onClick={unlock}
          disabled={loading || highStakes}
          className={`px-10 py-4 rounded-full text-[10px] font-mono uppercase tracking-[0.3em] transition-all duration-500 ${highStakes ? 'bg-crimson text-white border-crimson' : 'border border-gold/40 text-gold hover:bg-gold hover:text-black'}`}
        >
          {loading ? <Loader2 className="animate-spin" /> : (highStakes ? "[ ACCESS GRANTED ]" : "[ UNLOCK DOSSIER ]")}
        </button>
      </div>
    </div>
  );
};

const MissionLog = ({ projects, onDeepDive }: { projects: any[], onDeepDive: (p: any) => void }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {projects.map((project, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="group relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
          <div className="relative luxury-card overflow-hidden flex flex-col md:flex-row gap-8 p-8 h-full">
            <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden border border-white/5">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-[9px] font-mono text-gold/40 uppercase tracking-[0.4em] mb-1">{project.category}</div>
                  <h4 className="text-2xl font-serif">{project.title}</h4>
                </div>
                <button onClick={() => onDeepDive(project)} className="p-2 border border-white/10 rounded-lg text-white/20 hover:text-gold hover:border-gold transition-all">
                  <ArrowUpRight size={16} />
                </button>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-8 font-light flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t: string) => (
                  <span key={t} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[8px] font-mono text-white/30 uppercase tracking-widest">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute top-4 right-4 px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-[7px] font-mono text-red-500 uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              Mission: Active
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const StackSection = () => {
  const [rec, setRec] = useState("Analysing Solomon's stack for your use case...");
  const [loading, setLoading] = useState(false);

  const doRec = async () => {
    setLoading(true);
    const scenarios = ['a SaaS MVP', 'an AI agent pipeline', 'a real-time analytics dashboard', 'a microservices backend', 'an autonomous AI startup'];
    const sc = scenarios[Math.floor(Math.random() * scenarios.length)];
    try {
      const ai = getAI();
      const r = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `For ${sc}, recommend 3 technologies from Solomon's stack (Python, Kotlin, Java, Next.js, LangGraph, AWS, Docker, PostgreSQL) with a one-line reason each. Be specific and direct.`,
      });
      setRec(r.text || "");
    } catch (e) { setRec("Error loading recommendation."); }
    finally { setLoading(false); }
  };

  useEffect(() => { doRec(); }, []);

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap gap-3">
        {portfolioData.skills.map(skill => (
          <span key={skill} className="px-6 py-2 border border-white/5 rounded-full text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] hover:border-gold/40 hover:text-gold transition-all cursor-default">
            {skill}
          </span>
        ))}
      </div>
      
      <div className="relative p-10 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent overflow-hidden">
        <div className="absolute top-0 right-0 p-6">
          <Sparkles className="text-gold/20" size={40} />
        </div>
        <div className="flex items-center gap-3 mb-6 font-mono text-[10px] text-gold uppercase tracking-[0.4em] font-bold">
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          AI-Generated Stack Recommendation
        </div>
        <div className="text-xl font-serif italic text-white/60 leading-relaxed mb-8 min-h-[60px]">
          "{rec}"
        </div>
        <button 
          onClick={doRec}
          disabled={loading}
          className="flex items-center gap-2 text-[9px] font-mono text-gold/60 uppercase tracking-[0.3em] hover:text-gold transition-colors"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Command size={12} />}
          Refresh Recommendation
        </button>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [persona, setPersona] = useState<"founder" | "recruiter" | "developer">("founder");
  const [dynamicBio, setDynamicBio] = useState(portfolioData.basics.description);
  const [bioLoading, setBioLoading] = useState(false);
  const [activeDeepDive, setActiveDeepDive] = useState<any>(null);
  const [greeting, setGreeting] = useState("Architecting the Agentic Future");
  const [arsenalView, setArsenalView] = useState<"graph" | "radar">("graph");
  const [highStakes, setHighStakes] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkApiKey();

    const handleAuthRequired = () => setHasApiKey(false);
    window.addEventListener('auth-required', handleAuthRequired);
    return () => window.removeEventListener('auth-required', handleAuthRequired);
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.8;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const updateBio = async () => {
      setBioLoading(true);
      try {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Rewrite this bio for a ${persona} persona: "${portfolioData.basics.description}". 
          Keep it under 30 words. Focus on ${persona === 'founder' ? 'ROI and product vision' : persona === 'recruiter' ? 'technical skills and reliability' : 'architecture and tech stack'}.`,
        });
        setDynamicBio(response.text || portfolioData.basics.description);
      } catch (e) {
        setDynamicBio(portfolioData.basics.description);
      } finally {
        setBioLoading(false);
      }
    };
    updateBio();
  }, [persona]);

  const addInterest = (interest: string) => {
    setUserInterests(prev => {
      if (prev.includes(interest)) return prev;
      return [...prev, interest].slice(-5); // Keep last 5 interests
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 selection:bg-white/30 font-sans overflow-x-hidden ${highStakes ? 'bg-[#0a0000] text-red-50' : 'bg-black text-white'}`}>
      <EnergyAura highStakes={highStakes} />
      <NeuralPresence highStakes={highStakes} />
      <HUDHeader highStakes={highStakes} onUnlock={() => setHighStakes(!highStakes)} />

      {!hasApiKey && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md p-10 border border-white/10 bg-zinc-900/40 rounded-3xl luxury-border"
          >
            <Shield className="text-white/40 mx-auto mb-8" size={48} strokeWidth={1} />
            <h2 className="text-3xl font-serif mb-4">Secure Access Required</h2>
            <p className="text-white/40 mb-10 text-sm leading-relaxed font-light">
              To experience the full agentic intelligence layer of this portfolio, please authenticate with your secure neural core key.
            </p>
            <button 
              onClick={handleSelectKey}
              className="w-full py-4 bg-white text-black font-medium uppercase tracking-widest rounded-full hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
              <Key size={16} />
              Authenticate
            </button>
            <p className="mt-8 text-[9px] text-white/20 font-mono uppercase tracking-[0.3em]">
              Reference: <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Neural Billing Protocol</a>
            </p>
          </motion.div>
        </div>
      )}

      <VisionTicker />
      <FloatingAssistant interests={userInterests} highStakes={highStakes} setHighStakes={setHighStakes} />
      <AnimatePresence>
        {activeDeepDive && <ProjectDeepDive project={activeDeepDive} onClose={() => setActiveDeepDive(null)} highStakes={highStakes} />}
      </AnimatePresence>
      {/* Background noise and Grid */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className={`fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] ${highStakes ? 'opacity-20' : 'opacity-100'}`} />

      <CustomCursor />
      
      {/* Progress Bar */}
      <motion.div className={`fixed top-0 left-0 right-0 h-0.5 origin-left z-[200] ${highStakes ? 'bg-crimson' : 'bg-gold/40'}`} style={{ scaleX }} />

      <main className="relative z-10 pt-24">
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center px-6 text-center pt-20 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-10 px-6 py-1.5 border rounded-full backdrop-blur-md transition-all duration-700 ${highStakes ? 'border-crimson/20 bg-crimson/5' : 'border-gold/10 bg-gold/5'}`}
          >
            <span className={`text-[10px] font-mono tracking-[0.3em] uppercase transition-colors duration-500 ${highStakes ? 'text-crimson' : 'text-gold/40'}`}>
              {highStakes ? 'TACTICAL DOSSIER: AGENT-ALPHA' : portfolioData.basics.subtitle}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-[10rem] font-serif tracking-tighter leading-[0.85] mb-12 luxury-text-gradient"
          >
            {highStakes ? (
              <>
                ARCHITECTING <br />
                THE <span className="text-crimson">FUTURE</span>
              </>
            ) : (
              <>
                ARCHITECTING <br />
                THE FUTURE
              </>
            )}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-col items-center gap-10 mb-16"
          >
            <div className="flex bg-zinc-900/40 p-1 rounded-full border border-white/5 backdrop-blur-xl">
              {(['founder', 'recruiter', 'developer'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPersona(p)}
                  className={`px-8 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 ${persona === p ? 'bg-gold text-black font-medium' : 'text-white/30 hover:text-white'}`}
                >
                  {p}
                </button>
              ))}
            </div>
            
            <div className="h-24 flex items-center justify-center">
              {bioLoading ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="animate-spin text-white/20" size={20} />
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em] animate-pulse">Refining for {persona}</span>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-2xl md:text-3xl text-white/60 max-w-3xl mx-auto leading-relaxed font-serif italic font-light">
                    "{dynamicBio}"
                  </p>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-[9px] font-mono text-white/20 uppercase tracking-[0.5em]"
                  >
                    {persona === 'founder' && "Strategic Impact • Scalable Vision"}
                    {persona === 'recruiter' && "Technical Excellence • Proven Reliability"}
                    {persona === 'developer' && "Architectural Integrity • Performance First"}
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col md:flex-row gap-8 mb-24"
          >
            <a href="#contact" className={`group relative px-12 py-5 font-medium rounded-full overflow-hidden text-center transition-all duration-700 ${highStakes ? 'bg-crimson text-white' : 'bg-gold text-black'}`}>
              <span className="relative z-10 flex items-center gap-3 uppercase text-[10px] tracking-[0.3em]">{highStakes ? 'Initiate Mission' : 'Start a Project'} <ArrowUpRight className="w-4 h-4"/></span>
              <div className={`absolute inset-0 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ${highStakes ? 'bg-red-900' : 'bg-champagne'}`} />
            </a>
            <a href="#ailab" className="px-12 py-5 border border-white/10 font-medium rounded-full transition-all duration-700 text-center text-[10px] tracking-[0.3em] uppercase hover:bg-gold hover:text-black hover:border-gold">
              Neural Lab
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="w-full mb-32"
          >
            <AgenticTerminal interests={userInterests} highStakes={highStakes} setHighStakes={setHighStakes} />
          </motion.div>

          {/* AI FEATURES GRID */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="w-full max-w-7xl mx-auto px-6 mb-32"
          >
            <div className="text-center mb-16">
              <h2 className={`text-[10px] font-mono uppercase tracking-[0.5em] mb-4 ${highStakes ? 'text-crimson' : 'text-gold/40'}`}>// Neural Capabilities</h2>
              <h3 className="text-4xl font-serif">AI Feature Suite</h3>
            </div>
            <AIFeaturesGrid highStakes={highStakes} />
          </motion.div>
        </section>

        {/* LIVE INTELLIGENCE PULSE */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <LiveMarketPulse />
          </div>
        </section>

        {/* EXPERTISE BENTO GRID */}
        <section id="expertise" className="py-40 px-6 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
              <div className="max-w-xl">
                <h2 className="text-white/20 font-mono text-[10px] tracking-[0.6em] uppercase mb-6">Expertise</h2>
                <h3 className="text-5xl md:text-7xl font-serif tracking-tight luxury-text-gradient">Core Competencies</h3>
              </div>
              <p className="text-white/30 max-w-xs text-sm font-light leading-relaxed italic">"Translating complex technical requirements into elegant, high-performance systems."</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {portfolioData.disciplines.map((item, idx) => {
                const isHighlighted = 
                  (persona === 'founder' && (item.title === 'AI & Agents' || item.title === 'Product Design')) ||
                  (persona === 'recruiter' && (item.title === 'Full-Stack Dev' || item.title === 'Cloud & DevOps')) ||
                  (persona === 'developer' && (item.title === 'AI & Agents' || item.title === 'Cloud & DevOps'));

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    onClick={() => addInterest(`Expertise: ${item.title}`)}
                  >
                    <SpotlightCard className={`h-full cursor-pointer luxury-card ${isHighlighted ? 'border-gold/20 bg-gold/5' : ''}`}>
                      <div className="flex justify-between items-start mb-10">
                        <div className="text-white/40 group-hover:text-gold transition-colors duration-500">
                          {item.icon}
                        </div>
                        {isHighlighted && (
                          <div className="px-3 py-1 bg-gold/10 border border-gold/10 rounded-full text-[7px] font-mono text-gold/60 uppercase tracking-[0.2em]">
                            Priority
                          </div>
                        )}
                      </div>
                      <h4 className="text-2xl font-serif mb-4">{item.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed mb-10 font-light">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-mono text-white/20 border border-white/5 px-3 py-1 rounded-full uppercase tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROJECT SHOWCASE */}
        <section id="work" className="py-48 px-6 bg-zinc-900/10 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 text-white/20 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">
                  <span className="w-8 h-px bg-white/10" /> Mission Log
                </div>
                <h2 className="text-5xl md:text-8xl font-serif tracking-tight luxury-text-gradient uppercase leading-[0.85]">Mission <br />Log</h2>
              </div>
              <p className="text-white/30 max-w-xs text-sm font-light leading-relaxed italic">
                "Each project is an autonomous ecosystem designed for sub-millisecond decision making and high-scale operations."
              </p>
            </div>

            <MissionLog projects={portfolioData.projects} onDeepDive={setActiveDeepDive} />
          </div>
        </section>

        {/* FUTURE CASTING SECTION */}
        <section className="py-48 px-6 bg-black border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <div className="flex items-center gap-3 text-white/20 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">
                  <span className="w-8 h-px bg-white/10" /> Neural Roadmap
                </div>
                <h2 className="text-5xl md:text-8xl font-serif tracking-tight mb-10 luxury-text-gradient uppercase leading-[0.85]">Future <br />Casting</h2>
                <p className="text-white/40 text-lg leading-relaxed mb-12 font-light italic">
                  "The next 5 years of agentic evolution, predicted by Solomon's architectural core. These are the benchmarks we are currently engineering."
                </p>
                <div className="space-y-8">
                  {[
                    { year: "2026", goal: "Hyper-Personalized Agentic OS", status: "In Development" },
                    { year: "2027", goal: "Autonomous Startup Ecosystems", status: "Research" },
                    { year: "2028", goal: "Global Neural Mesh Integration", status: "Vision" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-8 p-8 border border-white/5 bg-zinc-900/20 rounded-3xl group hover:border-white/20 transition-all duration-700">
                      <div className="text-4xl font-serif text-white/10 group-hover:text-white/40 transition-colors duration-700">{item.year}</div>
                      <div>
                        <div className="font-serif text-xl mb-1">{item.goal}</div>
                        <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">{item.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />
                <LiveMarketPulse />
              </div>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE SKETCHER SECTION */}
        <section className="py-40 px-6">
          <div className="max-w-4xl mx-auto">
            <ArchitectureSketcher />
          </div>
        </section>

        {/* AI LAB SECTION */}
        <section id="ailab" className="py-32 px-6 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-emerald-500 font-mono text-sm tracking-[0.5em] uppercase mb-4 font-bold">AI Lab</h2>
              <h3 className="text-5xl font-bold tracking-tight">Interactive Innovation</h3>
            </div>
            <AILab onInteraction={addInterest} />
          </div>
        </section>

        {/* ARCHITECTURAL FIT SECTION */}
        <section id="fit" className="py-32 px-6 scroll-mt-24 bg-white/[0.01]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-emerald-500 font-mono text-sm tracking-[0.5em] uppercase mb-4 font-bold">Strategic Alignment</h2>
              <h3 className="text-5xl font-bold tracking-tight">Architectural Fit</h3>
            </div>
            <ArchitecturalFit />
          </div>
        </section>

        {/* THE ARSENAL (SKILLS) */}
        <section id="toolkit" className="py-32 px-6 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl font-bold tracking-tight mb-8">The Arsenal</h2>
                <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                  A curated stack of technologies I use to build mission-critical systems and autonomous agents. 
                  Interact with the neural map to explore the relationships between my core competencies.
                </p>
                <div className="flex gap-4 mb-12">
                  <button 
                    onClick={() => setArsenalView("graph")}
                    className={`px-6 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${arsenalView === "graph" ? "bg-emerald-500 text-black font-bold" : "bg-white/5 text-gray-500 hover:text-white"}`}
                  >
                    Neural Map
                  </button>
                  <button 
                    onClick={() => setArsenalView("radar")}
                    className={`px-6 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${arsenalView === "radar" ? "bg-emerald-500 text-black font-bold" : "bg-white/5 text-gray-500 hover:text-white"}`}
                  >
                    Proficiency Radar
                  </button>
                </div>
                
                <StackSection />

                <div className="grid grid-cols-2 gap-4 mt-12">
                  {[
                    { icon: <Zap />, label: "Performance", value: "99.9%" },
                    { icon: <Shield />, label: "Security", value: "Enterprise" },
                    { icon: <Database />, label: "Scalability", value: "Horizontal" },
                    { icon: <Command />, label: "Automation", value: "Agentic" }
                  ].map((stat, idx) => (
                    <div key={idx} className="p-8 border border-white/5 bg-white/[0.02] rounded-2xl text-center group hover:border-emerald-500/30 transition-all">
                      <div className="text-emerald-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-gray-500 text-xs uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <AnimatePresence mode="wait">
                  {arsenalView === "graph" ? (
                    <motion.div
                      key="graph"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <SkillsGraph persona={persona} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="radar"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <ProficiencyRadar highStakes={highStakes} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* CLASSIFIED DOSSIER */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <ClassifiedDossier highStakes={highStakes} onUnlock={() => setHighStakes(true)} />
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section id="contact" className="py-40 px-6 relative overflow-hidden scroll-mt-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tighter">READY TO AUTOMATE <br />YOUR VISION?</h2>
            <div className="flex flex-wrap justify-center gap-6">
               <a href="mailto:hello@solomonsuresh.com" className="flex items-center gap-4 px-12 py-6 bg-emerald-600 text-white font-black text-xl rounded-full hover:scale-105 transition-transform shadow-2xl shadow-emerald-500/20">
                LET'S TALK <Mail className="w-6 h-6" />
               </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 px-10 border-t border-white/5 bg-black/50 backdrop-blur-md relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-gray-500 text-[10px] tracking-[0.4em] font-bold uppercase">
          © {new Date().getFullYear()} Solomon Suresh S — Designed for Scale
        </div>
        <div className="flex gap-8">
          {[
            { icon: <Github className="w-5 h-5"/>, link: "#" },
            { icon: <Linkedin className="w-5 h-5"/>, link: "#" },
            { icon: <TerminalIcon className="w-5 h-5"/>, link: "#" }
          ].map((social, i) => (
            <motion.a 
              key={i} 
              href={social.link} 
              whileHover={{ y: -3, color: "#10b981" }}
              className="text-gray-500 transition-colors"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
