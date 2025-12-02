
import React, { useState, useEffect, useRef, ChangeEvent, useCallback } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  BookOpen, 
  Award, 
  Briefcase, 
  Mail,
  Upload,
  Lock,
  Unlock,
  RotateCcw,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X as CloseIcon,
  Plus,
  Trash2,
  ZoomIn
} from 'lucide-react';

/**
 * =================================================================================
 * 初始内容配置 (INITIAL CONTENT)
 * 数据结构已更新支持 Hero 独立图片和缩放
 * =================================================================================
 */
const INITIAL_CONTENT = {
  hero: {
    name: "Profile of Zixiong Nie",
    roles: ["Artist", "Researcher", "Educator"],
    tagline: "Emotion is deeply rooted in the pulse of the times and history will forge its eternity.",
    intro: "Exploring the tension between fragility and resilience through ceramics, painting, and cross-cultural research.",
    // New independent images for the Hero section with scale properties
    images: [
      { 
        url: "https://images.unsplash.com/photo-1614730341194-75c60740a270?q=80&w=2774&auto=format&fit=crop", 
        alt: "Hero Image 1", 
        scale: 1.2 
      },
      { 
        url: "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?q=80&w=2656&auto=format&fit=crop", 
        alt: "Hero Image 2", 
        scale: 1.0 
      },
      { 
        url: "https://images.unsplash.com/photo-1549887552-93f8efb0818e?q=80&w=2670&auto=format&fit=crop", 
        alt: "Hero Image 3", 
        scale: 1.0 
      }
    ]
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
        { url: "https://images.unsplash.com/photo-1614730341194-75c60740a270?q=80&w=2774&auto=format&fit=crop", alt: "Folding screen with thorn motifs, ceramic and metal" },
        { url: "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?q=80&w=2656&auto=format&fit=crop", alt: "Close up of thorn texture on ceramic tile" }
      ]
    },
    {
      id: "series-2",
      title: "Avidya",
      description: "Reflecting on ignorance and inner struggle through recurring thorn motifs. Inspired by Francis Bacon's expressive language, these works deconstruct identity. The distorted faces and entangled lines evoke both vulnerability and resilience.",
      images: [
        { url: "https://images.unsplash.com/photo-1549887552-93f8efb0818e?q=80&w=2670&auto=format&fit=crop", alt: "Distorted portrait on ceramic plate" },
        { url: "https://images.unsplash.com/photo-1515405295579-ba7f9f92f413?q=80&w=2670&auto=format&fit=crop", alt: "Mixed media painting with ceramic elements" },
      ]
    },
    {
      id: "series-3",
      title: "Qi · Flow",
      description: "Capturing the dynamics of life energy through the unpredictability of fire and glaze. The clouds' shifting curves—coalescing into mist, unraveling into strands—evoke the rhythm of endless return.",
      images: [
        { url: "https://images.unsplash.com/photo-1578320339807-7430988a83eb?q=80&w=2574&auto=format&fit=crop", alt: "Circular ceramic piece with swirling blue glazes" },
        { url: "https://images.unsplash.com/photo-1578320339996-5f78238714eb?q=80&w=2574&auto=format&fit=crop", alt: "Abstract flow patterns in porcelain" }
      ]
    },
    {
      id: "series-4",
      title: "Dreaming Freedom",
      description: "Zhuangzi spoke of 'roaming the mind through things.' Under extreme heat (1300°C), colored glazes vaporize into mist and surge like waves, forming dream-like creatures from flow—freedom materialized through fire, not hand.",
      images: [
        { url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2670&auto=format&fit=crop", alt: "Tall vase with blue dream-like imagery" },
        { url: "https://images.unsplash.com/photo-1581345837380-ef2d861d81d2?q=80&w=2670&auto=format&fit=crop", alt: "Detail of high-fire glaze texture" }
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
        images: [
            { url: "https://images.unsplash.com/photo-1596347069151-5b77c5f3e099?q=80&w=2574&auto=format&fit=crop", alt: "Pine Series sculpture" },
            { url: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?q=80&w=2574&auto=format&fit=crop", alt: "Pine Detail" }
        ]
      },
      {
        title: "Jia Series",
        desc: "Organic forms resembling seeds or pods, functioning as vessels for scent and light.",
        images: [
            { url: "https://images.unsplash.com/photo-1605304386419-48283a2183c5?q=80&w=2670&auto=format&fit=crop", alt: "Jia Series organic vessel" },
            { url: "https://images.unsplash.com/photo-1610701596061-2ecf2022f463?q=80&w=2670&auto=format&fit=crop", alt: "Jia Series texture" }
        ]
      },
      {
        title: "Collaborations",
        desc: "Partnered with TANCHUR to integrate traditional craftsmanship with contemporary luxury.",
        images: [
            { url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2670&auto=format&fit=crop", alt: "Collaboration piece" }
        ]
      }
    ]
  },
  research: {
    title: "Influence of Chinese Porcelain in Europe",
    subtitle: "Analysis of Cultural Exchange and Transformation of European Design",
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
 * EDITING & LIGHTBOX CONTEXT
 * =================================================================================
 */

// Context for edit mode and lightbox
const AppContext = React.createContext<{
  content: typeof INITIAL_CONTENT;
  isEditing: boolean;
  updateContent: (path: (string | number)[], value: any) => void;
  addImageToSeries: (path: (string | number)[]) => void;
  removeImageFromSeries: (path: (string | number)[], index: number) => void;
  toggleEditMode: () => void;
  resetContent: () => void;
  openLightbox: (dataPath: (string|number)[], index: number) => void;
}>({
  content: INITIAL_CONTENT,
  isEditing: false,
  updateContent: () => {},
  addImageToSeries: () => {},
  removeImageFromSeries: () => {},
  toggleEditMode: () => {},
  resetContent: () => {},
  openLightbox: () => {}
});

/**
 * =================================================================================
 * HELPER COMPONENTS
 * =================================================================================
 */

// Helper to get nested value from path
const getValueFromPath = (obj: any, path: (string | number)[]) => {
  let current = obj;
  for (let i = 0; i < path.length; i++) {
    if (current === undefined || current === null) return undefined;
    current = current[path[i]];
  }
  return current;
};

const EditableText = ({ 
  path, 
  value: overrideValue,
  multiline = false, 
  className = "",
  as: Component = "span" 
}: { 
  path: (string | number)[], 
  value?: string, 
  multiline?: boolean, 
  className?: string,
  as?: any
}) => {
  const { isEditing, updateContent, content } = React.useContext(AppContext);

  const displayValue = getValueFromPath(content, path) || overrideValue || "";

  if (!isEditing) {
    return <Component className={className}>{displayValue}</Component>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateContent(path, e.target.value);
  };

  const inputStyles = `bg-yellow-50/50 border-b border-yellow-400 text-stone-900 w-full rounded px-1 transition-colors outline-none focus:bg-yellow-100 ${className}`;

  if (multiline) {
    return (
      <textarea 
        className={inputStyles}
        value={displayValue}
        onChange={handleChange}
        rows={4}
      />
    );
  }

  return (
    <input 
      type="text" 
      className={inputStyles}
      value={displayValue}
      onChange={handleChange}
    />
  );
};

// Generic Editable Image (for Standard Squares/Rectangles)
const EditableImage = ({
  path,
  alt,
  className = "",
  onClick
}: {
  path: (string | number)[],
  alt: string,
  className?: string,
  onClick?: () => void
}) => {
  const { isEditing, updateContent, content } = React.useContext(AppContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const src = getValueFromPath(content, path);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image is too large for local storage. Please use an image under 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        updateContent(path, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isEditing) return; 
    if (onClick) onClick();
  };

  return (
    <div className={`relative group ${className}`} onClick={handleClick}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      
      {/* Edit Overlay */}
      {isEditing && (
        <div 
          className="absolute inset-0 bg-black/60 z-30 flex flex-col items-center justify-center cursor-pointer hover:bg-black/70 transition-colors border-4 border-yellow-400"
          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
        >
          <Upload className="text-yellow-400 mb-2" size={32} />
          <span className="text-white font-bold tracking-widest uppercase text-xs">Replace</span>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </div>
      )}
      
      {/* View Overlay (Only when NOT editing and onClick provided) */}
      {!isEditing && onClick && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-20 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100">
           <Maximize2 className="text-white drop-shadow-md" size={32} />
        </div>
      )}
    </div>
  );
};

// Specialized Editable Image for Hero Section (Supports Scaling)
const EditableHeroImage = ({
  imageIndex,
  className = ""
}: {
  imageIndex: number,
  className?: string,
}) => {
  const { isEditing, updateContent, content } = React.useContext(AppContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const basePath = ['hero', 'images', imageIndex];
  const src = getValueFromPath(content, [...basePath, 'url']);
  const scale = getValueFromPath(content, [...basePath, 'scale']) || 1.0;
  const alt = getValueFromPath(content, [...basePath, 'alt']);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image is too large for local storage. Please use an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContent([...basePath, 'url'], reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    updateContent([...basePath, 'scale'], newScale);
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* The Image Itself with Scale Transform */}
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-100" 
        style={{ transform: `scale(${scale})` }}
      />
      
      {/* Edit Overlay */}
      {isEditing && (
        <div className="absolute inset-0 bg-black/60 z-30 flex flex-col items-center justify-center border-4 border-yellow-400 p-2">
          
          {/* Upload Button */}
          <div 
             className="flex flex-col items-center cursor-pointer hover:text-yellow-300 mb-3"
             onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
          >
            <Upload className="text-yellow-400 mb-1" size={24} />
            <span className="text-white font-bold tracking-widest uppercase text-[10px]">Replace</span>
          </div>

          {/* Scale Control */}
          <div className="w-full px-2 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
             <div className="flex items-center gap-1 text-yellow-400 mb-1">
               <ZoomIn size={12} />
               <span className="text-[10px] uppercase font-bold">Zoom</span>
             </div>
             <input 
               type="range" 
               min="0.5" 
               max="3.0" 
               step="0.1" 
               value={scale} 
               onChange={handleScaleChange}
               className="w-full h-1 bg-stone-600 rounded-lg appearance-none cursor-pointer accent-yellow-400"
             />
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </div>
      )}
    </div>
  );
};


/**
 * =================================================================================
 * LIGHTBOX COMPONENT
 * =================================================================================
 */
const Lightbox = ({ 
  isOpen, 
  onClose, 
  dataPath, 
  startIndex 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  dataPath: (string|number)[]; 
  startIndex: number; 
}) => {
  const { content, isEditing, addImageToSeries, removeImageFromSeries } = React.useContext(AppContext);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  
  // Get dynamic images array from content using the base path
  const images = getValueFromPath(content, dataPath) as { url: string, alt: string }[] || [];

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex, isOpen]); // Reset index when opening

  // Ensure index is valid if images are removed
  useEffect(() => {
    if (currentIndex >= images.length && images.length > 0) {
      setCurrentIndex(images.length - 1);
    }
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, images.length]); // Add images.length dependency

  const nextImage = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleWheel = useCallback((e: WheelEvent) => {
     if (e.deltaY > 0) nextImage();
     else if (e.deltaY < 0) prevImage();
  }, [nextImage, prevImage]);

  // Handle mouse wheel with debounce
  useEffect(() => {
    if (!isOpen) return;
    let lastRun = 0;
    const wheelHandler = (e: WheelEvent) => {
        const now = Date.now();
        if (now - lastRun < 300) return;
        lastRun = now;
        handleWheel(e);
    };
    window.addEventListener('wheel', wheelHandler);
    return () => window.removeEventListener('wheel', wheelHandler);
  }, [isOpen, handleWheel]);

  const handleAdd = () => {
      if (images.length >= 10) {
          alert("Maximum 10 images allowed per series.");
          return;
      }
      addImageToSeries(dataPath);
      // Automatically switch to the new (last) image
      setCurrentIndex(images.length); 
  };

  const handleDelete = () => {
      if (images.length <= 1) {
          alert("A series must have at least one image.");
          return;
      }
      if (window.confirm("Delete this image?")) {
          removeImageFromSeries(dataPath, currentIndex);
      }
  };

  if (!isOpen || !images) return null;

  // Fallback if array became empty or invalid
  if (images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
      {/* Controls */}
      <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-50">
        <CloseIcon size={32} />
      </button>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
            <button onClick={prevImage} className="absolute left-6 text-white/50 hover:text-white transition-colors p-2 z-50 hidden md:block">
                <ChevronLeft size={48} />
            </button>
            <button onClick={nextImage} className="absolute right-6 text-white/50 hover:text-white transition-colors p-2 z-50 hidden md:block">
                <ChevronRight size={48} />
            </button>
        </>
      )}

      {/* Main Image Container */}
      <div className="w-full h-full p-4 md:p-12 flex items-center justify-center">
        <div className="relative max-w-full max-h-full flex flex-col items-center">
          
          {/* Main Image */}
          <div className="relative max-h-[85vh] w-auto group">
             <EditableImage 
                path={[...dataPath, currentIndex, 'url']}
                alt={images[currentIndex]?.alt || "Portfolio Image"}
                className="max-h-[85vh] w-auto object-contain shadow-2xl"
             />

             {/* Delete Button (Edit Mode Only) */}
             {isEditing && (
                 <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                    className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-40 hover:bg-red-700"
                    title="Delete Image"
                 >
                     <Trash2 size={20} />
                 </button>
             )}
          </div>
          
          {/* Counters & Info */}
          <div className="mt-4 text-white/70 font-sans text-sm tracking-widest uppercase flex items-center gap-4">
            <span>{currentIndex + 1} / {images.length}</span>
            <span className="w-1 h-1 bg-white/50 rounded-full"></span>
            <span>Scroll to browse series</span>
          </div>

          {/* Add Button (Edit Mode Only) */}
          {isEditing && images.length < 10 && (
              <button 
                onClick={handleAdd}
                className="mt-4 flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-yellow-300 transition-colors"
              >
                  <Plus size={16} /> Add Image to Series
              </button>
          )}

        </div>
      </div>
    </div>
  );
};


/**
 * =================================================================================
 * UI SECTIONS
 * =================================================================================
 */

// --- UI Primitives ---

const SectionTitle = ({ children, dark = false }: { children?: React.ReactNode, dark?: boolean }) => (
  <div className="mb-12 relative inline-block">
    <h2 className={`text-3xl md:text-5xl font-serif font-medium ${dark ? 'text-white' : 'text-brand-dark'}`}>
      {children}
    </h2>
    <div className={`mt-4 h-1 w-20 ${dark ? 'bg-stone-500' : 'bg-brand-dark'}`}></div>
  </div>
);

const FadeIn = ({ children, delay = 0 }: { children?: React.ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });
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
  const { isEditing } = React.useContext(AppContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#art' },
    { name: 'Design', href: '#design' },
    { name: 'Research', href: '#research' },
  ];

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled || isEditing ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className={`font-serif text-xl tracking-widest font-bold ${scrolled ? 'text-brand-dark' : 'text-brand-dark'}`}>
          ZIXIONG NIE
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-xs uppercase tracking-[0.2em] font-medium hover:text-brand-light transition-colors ${scrolled || isEditing ? 'text-stone-800' : 'text-stone-900'}`}
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
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-8 px-6 flex flex-col space-y-6 border-t border-stone-100">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-serif text-stone-800 border-b border-stone-100 pb-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
      
      {/* Edit Mode Indicator */}
      {isEditing && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-b-lg shadow-sm z-50">
          Editing Mode On
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F5F5F4]">
      
      {/* Aesthetics */}
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-brand-dark transform -translate-x-1/4 translate-y-1/4 rotate-45 z-0"></div>
      <div className="absolute top-0 right-0 w-[70vw] h-[100vh] bg-[#E7E5E4] clip-path-polygon z-0"></div>
      <div className="absolute top-[30%] right-[40%] w-0.5 h-48 bg-brand-light rotate-45 z-10 hidden md:block"></div>
      
      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center h-full pt-20">
        
        {/* Left Content */}
        <div className="text-left relative">
          <FadeIn delay={200}>
            <h1 className="text-6xl md:text-8xl font-serif text-brand-dark leading-none italic drop-shadow-sm">
              <span className="block text-4xl md:text-6xl mb-2 not-italic">Profile of</span>
              <EditableText path={['hero', 'name']} />
            </h1>
          </FadeIn>
          
          <FadeIn delay={400}>
            <div className="mt-12 max-w-lg">
              <div className="font-playfair italic text-stone-600 text-lg md:text-xl border-l-2 border-brand-dark pl-6 py-2">
                <EditableText 
                  path={['hero', 'tagline']} 
                  multiline 
                  as="p"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={600}>
             <RolesList />
          </FadeIn>
        </div>

        {/* Right Content - Diamond Grid - INDEPENDENT HERO IMAGES */}
        <div className="relative hidden md:block h-[600px] w-full pointer-events-none md:pointer-events-auto">
            {/* Image 1 - Hero Top Right */}
            <div className="absolute top-10 right-10 w-64 h-64 overflow-hidden border-4 border-white shadow-2xl rotate-45 z-20 hover:scale-105 transition-transform duration-700">
               <div className="w-full h-full -rotate-45 scale-125">
                  <EditableHeroImage imageIndex={0} />
               </div>
            </div>
            
            {/* Image 2 - Hero Center */}
            <div className="absolute top-48 right-48 w-56 h-56 overflow-hidden border-4 border-white shadow-2xl rotate-45 z-10 hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0">
               <div className="w-full h-full -rotate-45 scale-125">
                  <EditableHeroImage imageIndex={1} />
               </div>
            </div>

            {/* Image 3 - Hero Bottom */}
            <div className="absolute bottom-10 right-20 w-48 h-48 overflow-hidden border-4 border-white shadow-2xl rotate-45 z-30 hover:scale-105 transition-transform duration-700">
               <div className="w-full h-full -rotate-45 scale-125">
                  <EditableHeroImage imageIndex={2} />
               </div>
            </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-stone-400">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

// Helper for Roles List to access content context
const RolesList = () => {
  const { content } = React.useContext(AppContext);
  return (
    <div className="mt-8 flex gap-4 flex-wrap">
      {content.hero.roles.map((role, idx) => (
        <span key={idx} className="text-xs font-bold tracking-widest uppercase text-brand-dark border border-brand-dark/20 bg-white/50 px-3 py-1 rounded-sm">
          <EditableText path={['hero', 'roles', idx]} />
        </span>
      ))}
    </div>
  )
}

const About = () => {
  const { content } = React.useContext(AppContext);

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12">
          
          <div className="md:col-span-7">
            <FadeIn>
              <SectionTitle>About The Artist</SectionTitle>
              <div className="prose prose-stone prose-lg text-stone-600 w-full">
                <div className="leading-loose mb-8 text-lg">
                  <EditableText path={['about', 'bio']} multiline as="p" />
                </div>
                
                <div className="bg-stone-50 p-8 border-l-4 border-brand-dark my-8 shadow-sm">
                  <h3 className="font-serif text-xl text-brand-dark mb-4">Artistic Statement</h3>
                  <div className="italic font-playfair text-stone-700">
                    <EditableText path={['about', 'statement']} multiline as="p" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-5 space-y-12">
            <FadeIn delay={200}>
              <div className="relative">
                <h3 className="flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-stone-400 mb-8">
                  <Award className="text-brand-dark" size={18} /> Education
                </h3>
                <div className="space-y-8 border-l border-stone-200 ml-2 pl-8 py-2">
                  {content.about.education.map((edu, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full border-2 border-brand-dark bg-white"></span>
                      <span className="block text-brand-dark font-bold text-sm mb-1">
                        <EditableText path={['about', 'education', idx, 'year']} />
                      </span>
                      <h4 className="text-lg font-serif text-stone-900 leading-tight">
                        <EditableText path={['about', 'education', idx, 'degree']} />
                      </h4>
                      <span className="text-stone-500 text-sm">
                        <EditableText path={['about', 'education', idx, 'institution']} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="relative">
                <h3 className="flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-stone-400 mb-8">
                  <Briefcase className="text-brand-dark" size={18} /> Experience
                </h3>
                <div className="space-y-8 border-l border-stone-200 ml-2 pl-8 py-2">
                  {content.about.experience.map((exp, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full border-2 border-brand-dark bg-white"></span>
                      <span className="block text-brand-dark font-bold text-sm mb-1">
                        <EditableText path={['about', 'experience', idx, 'year']} />
                      </span>
                      <h4 className="text-lg font-serif text-stone-900 leading-tight">
                        <EditableText path={['about', 'experience', idx, 'role']} />
                      </h4>
                      <span className="text-stone-500 text-sm">
                        <EditableText path={['about', 'experience', idx, 'place']} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

const ArtSeriesCard = ({ series, index }: { series: any, index: number }) => {
  const { openLightbox } = React.useContext(AppContext);
  const isEven = index % 2 === 0;

  // Pass the data path to the series' images array
  const handleImageClick = (imgIndex: number) => {
    const dataPath = ['artSeries', index, 'images'];
    openLightbox(dataPath, imgIndex);
  };
  
  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center mb-40 last:mb-0 group`}>
      
      {/* Image Section - Shows first 2 images as preview */}
      <div className="w-full lg:w-3/5 relative">
        <FadeIn>
           <div className="w-full aspect-[4/3] bg-stone-200 relative overflow-hidden shadow-2xl border-4 border-white cursor-pointer hover:shadow-3xl transition-shadow">
             <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/10 transition-colors duration-500 z-10 pointer-events-none"></div>
             {/* Only rendering the cover image on the main page */}
             {series.images[0] ? (
                 <EditableImage 
                    path={['artSeries', index, 'images', 0, 'url']}
                    alt={series.images[0].alt}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    onClick={() => handleImageClick(0)}
                 />
             ) : (
                 <div className="w-full h-full bg-stone-300 flex items-center justify-center text-stone-500">No Image</div>
             )}
           </div>
           
           {/* Decorative overlapping image (Only if 2nd image exists) */}
           {series.images[1] && (
             <div className={`hidden md:block w-1/2 absolute -bottom-12 ${isEven ? '-right-12' : '-left-12'} aspect-square border-8 border-stone-50 shadow-xl z-20 cursor-pointer hover:scale-105 transition-transform`}>
                <EditableImage 
                  path={['artSeries', index, 'images', 1, 'url']}
                  alt={series.images[1].alt}
                  className="w-full h-full object-cover"
                  onClick={() => handleImageClick(1)}
                />
             </div>
           )}
           
           {/* Decorative Label */}
           <div className={`absolute top-6 ${isEven ? 'left-6' : 'right-6'} bg-brand-dark text-white px-4 py-2 z-20 shadow-md`}>
             <span className="text-xs font-bold tracking-widest uppercase">Series 0{index + 1}</span>
           </div>
        </FadeIn>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-2/5">
        <FadeIn delay={200}>
          <h3 className="text-4xl md:text-5xl font-serif text-brand-dark mb-8 leading-tight">
            <EditableText path={['artSeries', index, 'title']} />
          </h3>
          <div className="w-12 h-1 bg-stone-300 mb-8"></div>
          <div className="text-stone-600 leading-relaxed mb-8 text-lg font-light">
            <EditableText path={['artSeries', index, 'description']} multiline as="p" />
          </div>
          <button 
             onClick={() => handleImageClick(0)}
             className="text-xs font-bold uppercase tracking-widest border-b border-brand-dark pb-1 hover:text-brand-light transition-colors"
          >
              View Full Series
          </button>
        </FadeIn>
      </div>
    </div>
  );
};

const ArtPortfolio = () => {
  const { content } = React.useContext(AppContext);
  return (
    <section id="art" className="py-32 bg-stone-100">
      <div className="container mx-auto px-6">
        <div className="mb-24 text-center">
          <SectionTitle>Selected Works</SectionTitle>
        </div>

        <div className="max-w-7xl mx-auto">
          {content.artSeries.map((series, index) => (
            <ArtSeriesCard key={series.id} series={series} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const DesignSection = () => {
  const { content, openLightbox } = React.useContext(AppContext);

  const handleImageClick = (collectionIndex: number) => {
    // Open lightbox for THIS specific collection's images
    const dataPath = ['design', 'collections', collectionIndex, 'images'];
    openLightbox(dataPath, 0); // Start at first image
  };

  return (
    <section id="design" className="py-24 bg-brand-dark text-white overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 mb-20 items-end border-b border-white/20 pb-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif mb-2 text-white">Product Design</h2>
              <div className="text-stone-300 text-xl font-serif">
                <EditableText path={['design', 'brandName']} />
              </div>
            </div>
            <div className="font-playfair italic text-white/80 text-lg md:text-right">
              "<EditableText path={['design', 'concept']} multiline as="span" />"
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12">
          {content.design.collections.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 200}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden mb-8 aspect-[3/4] bg-stone-900 border border-white/10">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10 pointer-events-none"></div>
                  
                  {/* Show only the first image of the collection as cover */}
                  {item.images && item.images[0] ? (
                      <EditableImage 
                        path={['design', 'collections', idx, 'images', 0, 'url']}
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        onClick={() => handleImageClick(idx)}
                      />
                  ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30">No Images</div>
                  )}

                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent z-20 translate-y-4 group-hover:translate-y-0 transition-transform pointer-events-none">
                     <span className="text-xs font-bold uppercase tracking-widest text-white">
                        {item.images ? item.images.length : 0} Items
                     </span>
                  </div>
                </div>
                <h4 className="text-2xl font-serif text-white mb-3 group-hover:text-stone-300 transition-colors">
                  <EditableText path={['design', 'collections', idx, 'title']} />
                </h4>
                <div className="text-white/60 text-sm leading-relaxed font-light">
                  <EditableText path={['design', 'collections', idx, 'desc']} multiline as="p" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      
      {/* Background decoration - diagonal */}
      <div className="absolute top-0 right-0 w-[50vw] h-full bg-black/10 -skew-x-12 pointer-events-none"></div>
    </section>
  );
};

const ResearchSection = () => {
  const { content } = React.useContext(AppContext);
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="research" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <FadeIn>
          <div className="text-center mb-16">
            <BookOpen className="w-10 h-10 text-brand-dark mx-auto mb-6" />
            <SectionTitle>Academic Research</SectionTitle>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="bg-stone-50 p-8 md:p-16 border border-stone-200 relative overflow-hidden shadow-xl">
            {/* Decorative Corner */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-brand-dark transform -translate-x-12 -translate-y-12 rotate-45"></div>

            <div className="flex flex-col md:flex-row gap-4 mb-8 text-xs font-bold tracking-widest uppercase text-stone-500">
               <span className="text-brand-dark">PhD Research Focus</span>
               <span className="hidden md:inline text-stone-300">|</span>
               <span>
                  <EditableText path={['research', 'context']} />
               </span>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4 leading-tight">
              <EditableText path={['research', 'title']} />
            </h3>
            <h4 className="text-xl text-stone-600 mb-8 font-light italic">
              <EditableText path={['research', 'subtitle']} />
            </h4>
            
            <div className="w-full h-px bg-stone-200 mb-8"></div>

            <div className={`prose prose-stone prose-lg max-w-none text-stone-600 transition-all duration-700 overflow-hidden ${expanded ? 'max-h-[1000px] opacity-100' : 'max-h-24 opacity-60'}`}>
               <div className="leading-relaxed">
                  <EditableText path={['research', 'abstract']} multiline as="p" />
               </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <button 
                onClick={() => setExpanded(!expanded)}
                className="group flex items-center gap-2 text-brand-dark font-bold uppercase tracking-widest text-xs hover:bg-brand-dark hover:text-white px-6 py-3 border border-brand-dark transition-all"
              >
                {expanded ? 'Read Less' : 'Read Abstract'} 
                <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
              
              <div className="flex flex-wrap gap-2">
                {content.research.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-wider bg-white border border-stone-200 text-stone-500 px-3 py-1">
                    <EditableText path={['research', 'tags', i]} />
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

/**
 * =================================================================================
 * EDIT TOGGLE BUTTON (Inconspicuous in Footer)
 * =================================================================================
 */
const EditToggleButton = () => {
   const { toggleEditMode, isEditing, resetContent } = React.useContext(AppContext);
   
   return (
     <div className="flex gap-2 ml-4 items-center">
        <button 
           onClick={toggleEditMode}
           className={`p-1.5 rounded-full transition-all duration-300 outline-none
             ${isEditing 
               ? 'bg-yellow-400 text-stone-900 shadow-md ring-2 ring-yellow-200' 
               : 'bg-transparent text-stone-800/40 hover:text-stone-800 hover:bg-stone-200'}`}
           title={isEditing ? "Save & Lock Editing" : "Unlock Editing Mode"}
        >
           {isEditing ? <Unlock size={14} /> : <Lock size={14} />}
        </button>

        {isEditing && (
           <button 
              onClick={resetContent}
              className="p-1.5 rounded-full bg-red-800 text-red-200 hover:bg-red-700 transition-all shadow-md animate-pulse"
              title="Reset Content to Default"
           >
              <RotateCcw size={14} />
           </button>
        )}
     </div>
   )
}

const Footer = () => {
  const { content } = React.useContext(AppContext);
  return (
    <footer id="contact" className="bg-[#1C1917] text-stone-400 py-20 border-t border-stone-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-serif text-white mb-10 tracking-wider">ZIXIONG NIE</h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-16 text-sm tracking-widest uppercase">
          <a href={`mailto:${content.contact.email}`} className="hover:text-brand-light transition-colors flex items-center gap-2">
            <Mail size={16} /> 
            <EditableText path={['contact', 'email']} />
          </a>
          <span className="hidden md:inline text-stone-700">|</span>
          <span>
            <EditableText path={['contact', 'location']} />
          </span>
        </div>

        <div className="max-w-md mx-auto h-px bg-stone-800 mb-10"></div>

        <div className="text-xs text-stone-600 font-medium flex items-center justify-center">
          <p>
             <EditableText path={['contact', 'copyright']} />
          </p>
          {/* Edit Button next to Copyright as requested */}
          <EditToggleButton />
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
  // 1. Initialize State with LocalStorage check
  // Key bumped to v3 to force data structure update for Hero Images independence
  const STORAGE_KEY = 'neo_portfolio_content_v3';
  
  const [content, setContent] = useState(() => {
    try {
      const savedContent = localStorage.getItem(STORAGE_KEY);
      return savedContent ? JSON.parse(savedContent) : INITIAL_CONTENT;
    } catch (e) {
      console.error("Failed to load from local storage", e);
      return INITIAL_CONTENT;
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  // Lightbox State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    dataPath: (string|number)[]; // stores the path to the array of images
    startIndex: number;
  }>({
    isOpen: false,
    dataPath: [],
    startIndex: 0
  });

  // 2. Persist to LocalStorage whenever content changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.warn("Quota exceeded likely. Image might be too big.");
    }
  }, [content]);

  // Deep update function
  const updateContent = (path: (string | number)[], value: any) => {
    setContent((prev: typeof INITIAL_CONTENT) => {
      const newContent = JSON.parse(JSON.stringify(prev));
      let current = newContent;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newContent;
    });
  };

  const addImageToSeries = (path: (string | number)[]) => {
      setContent((prev: typeof INITIAL_CONTENT) => {
          const newContent = JSON.parse(JSON.stringify(prev));
          let current = newContent;
          for (let i = 0; i < path.length; i++) {
              current = current[path[i]];
          }
          if (Array.isArray(current)) {
              current.push({ url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop", alt: "New Image" });
          }
          return newContent;
      });
  };

  const removeImageFromSeries = (path: (string | number)[], index: number) => {
      setContent((prev: typeof INITIAL_CONTENT) => {
          const newContent = JSON.parse(JSON.stringify(prev));
          let current = newContent;
          for (let i = 0; i < path.length; i++) {
              current = current[path[i]];
          }
          if (Array.isArray(current)) {
              current.splice(index, 1);
          }
          return newContent;
      });
  };

  const toggleEditMode = () => setIsEditing(!isEditing);
  
  const resetContent = () => {
    if(window.confirm("Warning: This will erase all your customizations and restore the original template. Continue?")) {
      setContent(INITIAL_CONTENT);
      setIsEditing(false);
    }
  };

  const openLightbox = (dataPath: (string|number)[], index: number) => {
    setLightbox({
      isOpen: true,
      dataPath,
      startIndex: index
    });
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <AppContext.Provider value={{ content, isEditing, updateContent, addImageToSeries, removeImageFromSeries, toggleEditMode, resetContent, openLightbox }}>
      <div className="min-h-screen font-sans">
        <Navigation />
        <main>
          <Hero />
          <About />
          <ArtPortfolio />
          <DesignSection />
          <ResearchSection />
        </main>
        <Footer />
        
        <Lightbox 
           isOpen={lightbox.isOpen} 
           onClose={closeLightbox} 
           dataPath={lightbox.dataPath} 
           startIndex={lightbox.startIndex}
        />
      </div>
    </AppContext.Provider>
  );
}
