// Starter content. Used in demo mode, and offered as a one-click import the
// first time the admin panel connects to an empty Supabase database.

const img = (n) => `assets/img/${n}.jpg`;
const q = (s) => `https://www.google.com/search?q=${encodeURIComponent(s)}`;

export const SETTINGS = {
  brand: 'Dhanraj Granite',
  established: '1991',
  phone: '+91 93925 37240',
  phone2: '+91 98201 20856',
  whatsapp: '919392537240',
  email: 'dhanrajstones@gmail.com',
  cities: 'Mumbai · Madurai',
  instagram: '',
  facebook: '',

  heroEyebrow: 'Est. 1991 · Granite Atelier',
  heroLine1: 'Quarried with care.',
  heroAccent: 'Finished',
  heroLine2: 'with precision.',
  heroText:
    'From monolithic quarry blocks to mirror-polished architectural slabs — Dhanraj crafts granite surfaces for homes, hotels, and landmarks across four continents.',
  heroImage: img('hero'),

  stats: [
    { value: '35+', label: 'Years of craft' },
    { value: '80+', label: 'Granite varieties' },
    { value: '2M+', label: 'Sq.ft processed / year' },
    { value: '1,200+', label: 'Projects delivered' },
  ],

  collectionEyebrow: 'Signature collection',
  collectionTitle: 'Granite, selected by hand.',

  ctaTitle: 'Ready to specify your project?',
  ctaText: 'Share your drawings, finishes, and timeline. We’ll return a precise quote within 24 hours.',

  footerText:
    'Quarried with care. Finished with precision. Crafting architectural stone surfaces across residences, offices, and monumental projects since 1991.',

  aboutTitle: 'Rooted in stone,',
  aboutAccent: 'since 1991.',
  aboutStory:
    'Founded in 1991 by Mr. Naresh Chaudhary, Dhanraj Stones Emporium began as Chaudhary Granite in Rajasthan. With a vision to offer premium stones, Mr. Chaudhary expanded to Mumbai in 1997, establishing Dhanraj Granite as a premier trading hub. Our global reach grew through TMT Pvt. Ltd., reflecting our commitment to excellence. In 2011, we opened a state-of-the-art manufacturing facility in Madurai, Tamil Nadu — Universal Stone India P. Ltd.',
  aboutEssence:
    'We are a family of innovators, led by Mr. Chaudhary’s vision. Our journey is marked by dedication, excellence, and a passion for perfection.',
  aboutCraft:
    'We create high-quality granite that exceeds expectations. Our advanced processing ensures each piece is crafted with precision and care.',
  aboutImage: img('stone-5'),

  factorySpecs: [
    { label: 'Monthly capacity', value: '180,000 sq.ft' },
    { label: 'Max slab size', value: '3200 × 1000 mm' },
    { label: 'Thickness range', value: '17mm – 100mm' },
    { label: 'Export markets', value: 'USA · EU · UAE · AU' },
  ],

  colors: ['White & Ivory', 'Gold & Beige', 'Pink & Red', 'Black & Grey', 'Brown'],
  finishes: ['Polished', 'Honed', 'Leathered', 'Flamed'],
  applications: ['Countertops', 'Flooring', 'Wall Cladding', 'Staircase', 'Exterior'],
  galleryCategories: ['Countertops', 'Stair & Cladding', 'Flooring', 'Exterior', 'Commercial'],
  projectTypes: ['Residential', 'Commercial', 'Hospitality', 'Export / Trade', 'Other'],
};

const P = (name, color, finish, application, image, extra = {}) => ({
  name,
  color,
  finish,
  application,
  thickness: '18mm',
  density: '2.79 g/cm³',
  origin: 'India',
  description: '',
  image: img(image),
  featured: false,
  ...extra,
});

export const COLLECTIONS = {
  products: [
    P('Ivory Fantasy', 'White & Ivory', 'Polished', 'Countertops', 'ivory-fantasy', {
      featured: true,
      description: 'Soft ivory ground with flowing taupe and rose movement. A warm, versatile classic for kitchens and vanities.',
    }),
    P('Kashmiri White', 'White & Ivory', 'Leathered', 'Countertops', 'kashmiri-white', {
      featured: true,
      description: 'Bright white base scattered with garnet and charcoal crystals. Clean, airy and timeless.',
    }),
    P('Colonial White', 'White & Ivory', 'Polished', 'Countertops', 'colonial-white', {
      featured: true,
      description: 'Pearl-grey whites with gentle veining — understated elegance for large surfaces.',
    }),
    P('Royal White', 'White & Ivory', 'Polished', 'Flooring', 'royal-white', {
      featured: true,
      description: 'A quiet, even-toned white with fine grain. Ideal for expansive floors.',
    }),
    P('Colombo Juparana', 'Gold & Beige', 'Polished', 'Countertops', 'colombo-juparana', {
      description: 'Dramatic waves of caramel, cream and smoke. Every slab is one of a kind.',
    }),
    P('Bhama Gold', 'Gold & Beige', 'Polished', 'Countertops', 'bhama-gold', {
      description: 'Sun-warmed gold with dense crystal pattern — rich and inviting.',
    }),
    P('Ocean Gold', 'Gold & Beige', 'Polished', 'Countertops', 'ocean-gold'),
    P('Millennium Cream', 'Gold & Beige', 'Polished', 'Countertops', 'millennium-cream'),
    P('Jiblee Pink', 'Pink & Red', 'Polished', 'Countertops', 'jiblee-pink'),
    P('Royal Pink', 'Pink & Red', 'Polished', 'Flooring', 'royal-pink'),
    P('Rawsilk Pink', 'Pink & Red', 'Polished', 'Flooring', 'rawsilk-pink'),
    P('Russian White', 'White & Ivory', 'Polished', 'Wall Cladding', 'russian-white'),
    P('Absolute Black', 'Black & Grey', 'Polished', 'Countertops', 'absolute-black', {
      thickness: '20mm',
      density: '2.95 g/cm³',
      description: 'Deep, uniform black that takes a mirror polish. The architect’s favourite.',
    }),
    P('Black Galaxy', 'Black & Grey', 'Polished', 'Countertops', 'black-galaxy', {
      thickness: '20mm',
      density: '2.90 g/cm³',
      description: 'Jet black flecked with golden bronzite — like a night sky in stone.',
    }),
    P('Steel Grey', 'Black & Grey', 'Leathered', 'Exterior', 'steel-grey'),
    P('Tan Brown', 'Brown', 'Polished', 'Staircase', 'tan-brown'),
  ],

  capabilities: [
    { step: '01', title: 'Ethical Quarrying', image: img('stone-5'),
      description: 'Hand-selected blocks extracted from certified quarries across India with full traceability.' },
    { step: '02', title: 'MonoWiresaw & Multi-Blade Cutter', image: img('stone-6'),
      description: 'Precision block dressing on a MonoWiresaw followed by multi-blade cutting at 17mm to 100mm — zero kerf-waste, consistent thickness.' },
    { step: '03', title: 'Resin & Polishing', image: img('stone-2'),
      description: 'Vacuum resin reinforcement and 16-head line polishing for a deep, durable, mirror-like finish.' },
    { step: '04', title: 'CNC Edge Profiling', image: img('stone-3'),
      description: '5-axis CNC and waterjet systems carve bullnose, ogee, mitre and chamfer edges to architectural tolerance.' },
    { step: '05', title: 'Spectro QC Inspection', image: img('stone-4'),
      description: 'Every slab is checked under calibrated light for tone, flatness and finish before it leaves the factory.' },
  ],

  gallery: [
    { title: 'Illuminated Granite Staircase', category: 'Stair & Cladding', image: img('stone-1') },
    { title: 'Warm Gold Kitchen Island', category: 'Countertops', image: img('stone-2') },
    { title: 'Classic White Kitchen', category: 'Countertops', image: img('stone-3') },
    { title: 'Black Granite Island', category: 'Countertops', image: img('stone-4') },
    { title: 'Ivory Granite Alcove', category: 'Stair & Cladding', image: img('stone-5') },
    { title: 'Courtyard Paving', category: 'Exterior', image: img('stone-6') },
    { title: 'Hotel Lobby Floor', category: 'Commercial', image: img('stone-7') },
    { title: 'Living Room Flooring', category: 'Flooring', image: img('stone-8') },
  ],

  milestones: [
    { year: '1991', title: 'Founded as Chaudhary Granite', description: 'Mr. Naresh Chaudhary begins trading premium stone in Rajasthan.', image: '' },
    { year: '1997', title: 'Expansion to Mumbai', description: 'Dhanraj Granite is established as a premier trading hub in Mumbai.', image: '' },
    { year: '2008', title: 'TMT Pvt. Ltd. — Global Reach', description: 'Our export arm takes Dhanraj Granite to the world.', image: '' },
    { year: '2011', title: 'Madurai Manufacturing', description: 'Universal Stone India P. Ltd. opens a state-of-the-art processing facility in Tamil Nadu.', image: img('stone-6') },
  ],

  testimonials: [
    { name: 'Ar. Vikram Shah', role: 'Hospitality Project', location: 'Udaipur', rating: 5,
      quote: 'From quarry selection to CNC edge finishing, every detail was handled by craftspeople who clearly care. Our lobby cladding turned out stunning.' },
    { name: 'Rajesh Mehta', role: 'Residential Client', location: 'Mumbai', rating: 5,
      quote: 'Exceptional quality and craftsmanship. The Ivory Fantasy slabs transformed our villa — the finish is flawless and the team delivered on time.' },
    { name: 'Priya Sharma', role: 'Interior Designer', location: 'Delhi', rating: 5,
      quote: 'The range is wonderful and the team understands what designers need — consistent tones, clean edges, honest advice.' },
  ],

  outlets: [
    { name: 'Universal Stone India P. Ltd', type: 'Manufacturing Unit',
      address: '30/2B & 37/2B, Sivaganga Main Rd, Poovanthi, Madurai, Tamil Nadu 630611',
      phone: '+91 93925 37240', hours: 'Mon–Sun · 8:00 AM – 8:00 PM', mapsUrl: '' },
    { name: 'Dhanraj Granite – Dahisar', type: 'Corporate Office',
      address: 'Shukla Compound, near Gokul Anand Hotel, Shailendra Nagar, Ganesh Nagar, Dahisar East, Mumbai, Maharashtra 400068',
      phone: '+91 98201 20856', hours: 'Mon–Sun · 9:00 AM – 6:00 PM', mapsUrl: '' },
    { name: 'Dhanraj Granite – Mira Road', type: 'Warehouse',
      address: 'Mira Road East, Munshi Compound, National Highway, Kashimira Flyover, Ag Nagar, MIDC, Mira Bhayandar, Mumbai, Maharashtra 401107',
      phone: '+91 98201 20856', hours: 'Mon–Sun · 9:00 AM – 6:00 PM', mapsUrl: '' },
  ],

  resources: [
    { title: 'The Complete Guide to Choosing Granite Countertops', source: 'Architectural Digest', category: 'Buying guide', url: q('complete guide to choosing granite countertops') },
    { title: 'Granite vs. Quartz vs. Marble — Which Stone Wins?', source: 'Houzz', category: 'Comparison', url: q('granite vs quartz vs marble') },
    { title: 'How to Care for and Clean Granite Surfaces', source: 'The Spruce', category: 'Care', url: q('how to care for and clean granite surfaces') },
    { title: 'Granite Thickness Explained: 2cm vs 3cm', source: 'Marble Institute of America', category: 'Specification', url: q('granite thickness 2cm vs 3cm') },
    { title: 'Design Inspiration: Granite in Modern Architecture', source: 'Dezeen', category: 'Inspiration', url: q('granite in modern architecture') },
    { title: 'Natural Stone Finishes — Polished, Honed, Leathered', source: 'Stone World', category: 'Finishes', url: q('natural stone finishes polished honed leathered') },
  ],
};
