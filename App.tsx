import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ExternalLink, 
  Mail, 
  Award, 
  BookOpen, 
  Palette, 
  Briefcase 
} from 'lucide-react';

/**
 * =================================================================================
 * CONTENT CONFIGURATION
 * Edit the fields below to update the website content without touching the code logic.
 * =================================================================================
 */
const CONTENT = {
  hero: {
    name: "Zixiong Nie (Neo)",
    roles: ["Artist", "Researcher", "Educator"],
    tagline: "Emotion is deeply rooted in the pulse of the times and history will forge its eternity.",
    intro: "Exploring the tension between fragility and resilience through ceramics, painting, and cross-cultural research.",
  },
  about: {
    bio: "Born in 1996 in Nanchang, China, Zixiong Nie (Neo) is a multidisciplinary artist and educator. He currently serves as a Lecturer at the Jingdezhen Vocational University of Art. With a practice deeply rooted in the historic porcelain capital of Jingdezhen, he founded the personal art brand 'ZISION' and the ceramic design brand 'From Clay'.",
    statement: "My artistic research centers on the tension between fragility and resilience. I examine how humans sustain strength amid vulnerability, deriving meaning from cycles of rupture and renewal. This inquiry is grounded in Chinese philosophy—specifically the Buddhist discourse on Avidya (ignorance) and Daoist notions of Qi and transformation—moving beyond personal expression into critical inquiry.",
    education: [
      {
        year: "2018–2021",
        degree: "Master of Arts in Art",
        institution: "Jingdezhen Ceramic University"
      },
      {
        year: "2014–2018",
        degree: "Bachelor of Arts in Animation",
        institution: "Beijing Institute of Graphic Communication"
      }
    ],
    experience: [
      {
        year: "Jan 2025 – Present",
        role: "Full-time Lecturer",
        place: "Jingdezhen Vocational University of Art"
      },
      {
        year: "May 2024",
        role: "Founder",
        place: "ZISION (Personal Art Brand)"
      },
      {
        year: "Nov 2023",
        role: "Founder",
        place: "From Clay (Zhizuowu)"
      }
    ]
  },
  artSeries: [
    {
      id: "series-1",
      title: "Born in Thorns",
      description: "This series addresses spiritual struggle and transcendence. The thorn symbolizes nature's resistance, entwining fragile porcelain like nature's struggle amid industrial onslaught. It becomes an emotionally charged contradiction: through this tension, the porcelain's life continues to unfold.",
      images: [
        { url: "https://picsum.photos/seed/thorns1/800/600", alt: "Folding screen with thorn motifs, ceramic and metal" },
        { url: "https://picsum.photos/seed/thorns2/800/800", alt: "Close up of thorn texture on ceramic tile" }
      ]
    },
    {
      id: "series-2",
      title: "Avidya",
      description: "Reflecting on ignorance and inner struggle through recurring thorn motifs. Inspired by Francis Bacon's expressive language, these works deconstruct identity. The distorted faces and entangled lines evoke both vulnerability and resilience.",
      images: [
        { url: "https://picsum.photos/seed/avidya1/800/1000", alt: "Distorted portrait on ceramic plate" },
        { url: "https://picsum.photos/seed/avidya2/800/600", alt: "Mixed media painting with ceramic elements" },
        { url: "https://picsum.photos/seed/avidya3/800/800", alt: "Abstract ceramic sculpture" }
      ]
    },
    {
      id: "series-3",
      title: "Qi · Flow",
      description: "Capturing the dynamics of life energy through the unpredictability of fire and glaze. The clouds' shifting curves—coalescing into mist, unraveling into strands—evoke the rhythm of endless return.",
      images: [
        { url: "https://picsum.photos/seed/qi1/800/800", alt: "Circular ceramic piece with swirling blue glazes" },
        { url: "https://picsum.photos/seed/qi2/800/600", alt: "Abstract flow patterns in porcelain" }
      ]
    },
    {
      id: "series-4",
      title: "Dreaming Freedom",
      description: "Zhuangzi spoke of 'roaming the mind through things.' Under extreme heat (1300°C), colored glazes vaporize into mist and surge like waves, forming dream-like creatures from flow—freedom materialized through fire, not hand.",
      images: [
        { url: "https://picsum.photos/seed/dream1/600/900", alt: "Tall vase with blue dream-like imagery" },
        { url: "https://picsum.photos/seed/dream2/800/800", alt: "Detail of high-fire glaze texture" }
      ]
    }
  ],
  design: {
    brandName: "From Clay (Zhizuowu)",
    concept: "Derived from Laozi's phrase 'to shape clay into vessels'. Each piece seeks harmony between form, material, and function.",
    collections: [
      {
        title: "Pine Series",
        desc: "Decorative sculptures and incense holders inspired by the resilience of pine trees.",
        image: "https://picsum.photos/seed/pine/800/600"
      },
      {
        title: "Jia Series",
        desc: "Organic forms resembling seeds or pods, functioning as vessels for scent and light.",
        image: "https://picsum.photos/seed/jia/800/600"
      },
      {
        title: "Collaborations",
        desc: "Partnered with TANCHUR to integrate traditional craftsmanship with contemporary luxury.",
        image: "https://picsum.photos/seed/collab/800/600"
      }
    ]
  },
  research: {
    title: "Influence of Chinese Porcelain in Europe: Analysis of Cultural Exchange and Transformation of European Design",
    context: "17th – 19th Century | Focus on Meissen & Sèvres",
    abstract: "Between the 17th and 19th centuries, Chinese porcelain had a profound influence on European design. This research analyzes how the technical and aesthetic elements of Chinese porcelain influenced European innovation. It explores technology transfer in porcelain production, the aesthetic transformation of 'Chinoiserie', and the hybridization of styles in manufactures like Meissen and Sèvres. The study demonstrates that Chinese porcelain was not merely an exotic luxury but a catalyst for technical innovation and cross-cultural dialogue that fundamentally shaped European modern design history.",
    tags: ["Cultural Exchange", "Material Culture", "Design History", "Ceramic Technology"]
  },
  contact: {
    email: "contact@zixiongnie.art",
    location: "Jingdezhen, China",
    copyright: "© 2025 Zixiong Nie. All Rights Reserved."
  }
};

/**
 * =================================================================================
 * COMPONENTS
 * =================================================================================
 */

// --- UI Primitives ---

const SectionTitle = ({ children, dark = false }: { children?: React.ReactNode, dark?: boolean }) => (
  <h2 className={`text-3xl md:text-4xl font-serif mb-12 relative inline-block ${dark ? 'text-white' : 'text-stone-900'}`}>
    {children}
    <span className={`absolute -bottom-4 left-0 w-12 h-1 ${dark ? 'bg-stone-500' : 'bg-brand-dark'}`}></span>
  </h2>
);

const FadeIn = ({ children, delay = 0 }: { children?: React.ReactNode, delay?: number, key?: React.Key }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Main Sections ---

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Fine Art', href: '#art' },
    { name: 'Design', href: '#design' },
    { name: 'Research', href: '#research' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`font-serif text-xl tracking-widest font-bold ${scrolled ? 'text-stone-900' : 'text-stone-900'}`}>
          ZIXIONG NIE
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm uppercase tracking-widest hover:text-brand-dark transition-colors ${scrolled ? 'text-stone-600' : 'text-stone-800'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-stone-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-8 px-6 flex flex-col space-y-6">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-serif text-stone-800"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-100">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-stone-200 opacity-20 transform skew-x-12 translate-x-1/4"></div>
      
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl">
          <FadeIn>
            <p className="text-brand-dark tracking-[0.3em] uppercase text-sm mb-4 font-bold">
              {CONTENT.hero.roles.join("  |  ")}
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-stone-900 leading-tight mb-8">
              {CONTENT.hero.name}
            </h1>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-xl md:text-2xl text-stone-600 font-light italic border-l-4 border-brand-dark pl-6 mb-8">
              "{CONTENT.hero.tagline}"
            </p>
          </FadeIn>
          <FadeIn delay={600}>
            <p className="text-stone-500 max-w-xl mb-10">
              {CONTENT.hero.intro}
            </p>
          </FadeIn>
          <FadeIn delay={800}>
            <a href="#art" className="group inline-flex items-center text-stone-900 border-b border-stone-900 pb-1 hover:text-brand-dark hover:border-brand-dark transition-colors">
              View Portfolio <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          <FadeIn>
            <SectionTitle>About The Artist</SectionTitle>
            <div className="prose prose-stone prose-lg text-stone-600 mb-8">
              <p className="mb-6">{CONTENT.about.bio}</p>
              <h3 className="text-xl font-serif text-stone-800 mb-3 mt-8">Artistic Research Statement</h3>
              <p className="italic text-stone-500 border-l-2 border-brand-light pl-4">
                {CONTENT.about.statement}
              </p>
            </div>
            
            <div className="mt-8 flex gap-4">
               <button className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white hover:bg-brand-dark transition-colors text-sm tracking-widest uppercase">
                  <Mail size={16} /> Contact Me
               </button>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="bg-stone-50 p-8 md:p-12 border border-stone-100">
              <div className="mb-10">
                <h3 className="flex items-center gap-3 text-lg font-bold tracking-widest uppercase text-stone-900 mb-6">
                  <Award className="text-brand-dark" size={20} /> Education
                </h3>
                <ul className="space-y-6">
                  {CONTENT.about.education.map((edu, idx) => (
                    <li key={idx} className="relative pl-6 border-l border-stone-300">
                      <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-stone-400"></span>
                      <span className="block text-sm text-brand-dark font-bold mb-1">{edu.year}</span>
                      <span className="block text-lg font-serif text-stone-900">{edu.degree}</span>
                      <span className="text-stone-500">{edu.institution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center gap-3 text-lg font-bold tracking-widest uppercase text-stone-900 mb-6">
                  <Briefcase className="text-brand-dark" size={20} /> Experience
                </h3>
                <ul className="space-y-6">
                  {CONTENT.about.experience.map((exp, idx) => (
                    <li key={idx} className="relative pl-6 border-l border-stone-300">
                      <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-stone-400"></span>
                      <span className="block text-sm text-brand-dark font-bold mb-1">{exp.year}</span>
                      <span className="block text-lg font-serif text-stone-900">{exp.role}</span>
                      <span className="text-stone-500">{exp.place}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

const ArtSeriesCard = ({ series, index }: { series: typeof CONTENT.artSeries[0], index: number, key?: React.Key }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center mb-32 last:mb-0`}>
      <div className="w-full md:w-1/2 space-y-4">
        <FadeIn>
           <div className="w-full aspect-[4/3] overflow-hidden bg-stone-200 group relative">
             <img 
               src={series.images[0].url} 
               alt={series.images[0].alt}
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 text-xs uppercase tracking-widest">
                Fig. 1
             </div>
           </div>
           {series.images[1] && (
             <div className="w-2/3 ml-auto -mt-12 md:-mt-20 relative z-10 border-8 border-stone-50 shadow-xl aspect-square overflow-hidden bg-stone-200">
                <img 
                  src={series.images[1].url} 
                  alt={series.images[1].alt}
                  className="w-full h-full object-cover"
                />
             </div>
           )}
        </FadeIn>
      </div>

      <div className="w-full md:w-1/2">
        <FadeIn delay={200}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl text-stone-200 font-serif font-bold">0{index + 1}</span>
            <div className="h-px bg-stone-300 flex-grow"></div>
          </div>
          <h3 className="text-3xl font-serif text-stone-900 mb-6">{series.title}</h3>
          <p className="text-stone-600 leading-relaxed mb-6 text-lg">
            {series.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {series.images.map((_, i) => (
              <span key={i} className="text-xs font-bold text-stone-400 uppercase tracking-widest border border-stone-200 px-2 py-1">
                View {i + 1}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const ArtPortfolio = () => {
  return (
    <section id="art" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-20">
            <SectionTitle>Fine Art Portfolio</SectionTitle>
            <p className="text-stone-500 max-w-2xl mx-auto mt-4">
              A curated selection of series works exploring materiality, philosophy, and form.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto">
          {CONTENT.artSeries.map((series, index) => (
            <ArtSeriesCard key={series.id} series={series} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const DesignSection = () => {
  return (
    <section id="design" className="py-24 bg-stone-900 text-stone-100">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-stone-700 pb-8">
            <div>
              <SectionTitle dark>Product Design</SectionTitle>
              <h3 className="text-2xl font-serif text-stone-300 mt-4">{CONTENT.design.brandName}</h3>
            </div>
            <p className="md:w-1/3 text-stone-400 mt-6 md:mt-0 text-right italic">
              "{CONTENT.design.concept}"
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {CONTENT.design.collections.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 200}>
              <div className="group cursor-pointer">
                <div className="overflow-hidden mb-6 aspect-[3/4] bg-stone-800">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                </div>
                <h4 className="text-xl font-serif text-white mb-2 group-hover:text-brand-light transition-colors">
                  {item.title}
                </h4>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ResearchSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="research" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn>
          <div className="text-center mb-12">
            <BookOpen className="w-12 h-12 text-brand-dark mx-auto mb-6" />
            <SectionTitle>Academic Research</SectionTitle>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="bg-stone-50 p-8 md:p-12 border-t-4 border-brand-dark shadow-sm">
            <span className="inline-block bg-brand-dark text-white text-xs font-bold px-3 py-1 mb-6 uppercase tracking-widest">
              PhD Research
            </span>
            <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mb-4 leading-snug">
              {CONTENT.research.title}
            </h3>
            <p className="text-stone-500 font-medium mb-6 uppercase tracking-wider text-sm">
              {CONTENT.research.context}
            </p>
            
            <div className={`prose prose-stone prose-lg max-w-none text-stone-600 transition-all duration-500 overflow-hidden ${expanded ? 'max-h-[1000px]' : 'max-h-40 relative'}`}>
               <p>{CONTENT.research.abstract}</p>
               {!expanded && (
                 <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-stone-50 to-transparent"></div>
               )}
            </div>

            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <button 
                onClick={() => setExpanded(!expanded)}
                className="text-brand-dark font-bold uppercase tracking-widest text-sm hover:underline"
              >
                {expanded ? 'Read Less' : 'Read Abstract'}
              </button>
              
              <div className="flex flex-wrap gap-2">
                {CONTENT.research.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-stone-200 text-stone-600 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-stone-900 text-stone-400 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif text-white mb-8">ZIXIONG NIE</h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={18} />
            <a href={`mailto:${CONTENT.contact.email}`}>{CONTENT.contact.email}</a>
          </div>
          <div className="hidden md:block w-1 h-1 bg-stone-600 rounded-full"></div>
          <div>{CONTENT.contact.location}</div>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          <a href="#" className="p-3 bg-stone-800 rounded-full hover:bg-brand-dark hover:text-white transition-all">
            <Palette size={20} />
          </a>
          <a href="#" className="p-3 bg-stone-800 rounded-full hover:bg-brand-dark hover:text-white transition-all">
            <ExternalLink size={20} />
          </a>
        </div>

        <div className="border-t border-stone-800 pt-8 text-sm">
          <p>{CONTENT.contact.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

/**
 * =================================================================================
 * MAIN APP COMPONENT
 * =================================================================================
 */
export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <ArtPortfolio />
        <DesignSection />
        <ResearchSection />
      </main>
      <Footer />
    </div>
  );
}