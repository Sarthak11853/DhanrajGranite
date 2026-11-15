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
  logo: 'assets/img/brand/logo.png',

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
  aboutImage: img('factory/factory'),

  factorySpecs: [
    { label: 'Monthly capacity', value: '180,000 sq.ft' },
    { label: 'Max slab size', value: '3200 × 1000 mm' },
    { label: 'Thickness range', value: '17mm – 100mm' },
    { label: 'Export markets', value: 'USA · EU · UAE · AU' },
  ],

  colors: ['White & Ivory', 'Gold & Beige', 'Pink & Red', 'Black & Grey', 'Brown'],
  finishes: ['Polished', 'Leather', 'Honed', 'Flamed'],
  applications: ['Countertops', 'Flooring', 'Wall Cladding', 'Staircase', 'Exterior'],
  galleryCategories: ['Countertops', 'Flooring', 'Stair & Cladding', 'Exterior', 'Factory'],
  projectTypes: ['Residential', 'Commercial', 'Hospitality', 'Export / Trade', 'Other'],
};

// Product photos live in assets/img/products/. Name and finish come from the
// photo titles supplied by Dhanraj Granite ("Ivory Fantasy: Polished").
// Thickness, density and application are left blank to be filled in from the
// admin panel with the real specifications.
const P = (name, finish, color, image, extra = {}) => ({
  name,
  finish,
  color,
  application: '',
  origin: 'India',
  thickness: '',
  density: '',
  description: '',
  image: img(`products/${image}`),
  photos: [],
  featured: false,
  ...extra,
});

export const COLLECTIONS = {
  products: [
    P('Ivory Fantasy', 'Polished', 'White & Ivory', 'ivory-fantasy-polished', { featured: true }),
    P('Ivory Fantasy', 'Leather', 'White & Ivory', 'ivory-fantasy-leather'),
    P('Kashmiri White', 'Polished', 'White & Ivory', 'kashmiri-white-polished', {
      featured: true,
      photos: [img('products/kashmiri-white-polished-2')],
    }),
    P('Kashmiri White', 'Leather', 'White & Ivory', 'kashmiri-white-leather'),
    P('Colonial White', 'Polished', 'White & Ivory', 'colonial-white-polished'),
    P('Royal White', 'Polished', 'White & Ivory', 'royal-white-polished'),
    P('Russian White', 'Polished', 'White & Ivory', 'russian-white-polished'),
    P('Millenium Creame', 'Polished', 'Gold & Beige', 'millenium-creame-polished'),
    P('Bhama Gold', 'Polished', 'Gold & Beige', 'bhama-gold-polished', { featured: true }),
    P('Ocean Gold', 'Polished', 'Gold & Beige', 'ocean-gold-polished'),
    P('Sivakasi Gold', 'Polished', 'Gold & Beige', 'sivakasi-gold-polished', {
      photos: [img('products/sivakasi-gold-polished-2')],
    }),
    P('Tiger Skin', 'Polished', 'Gold & Beige', 'tiger-skin-polished'),
    P('Colombo Jubrana', 'Polished', 'Pink & Red', 'colombo-jubrana-polished', { featured: true }),
    P('Jiblee Pink', 'Polished', 'Pink & Red', 'jiblee-pink-polished'),
    P('Rawsilk Pink', 'Polished', 'Pink & Red', 'rawsilk-pink-polished'),
    P('Royal Pink', 'Polished', 'Pink & Red', 'royal-pink-polished'),
    P('Satur Pink', 'Polished', 'Pink & Red', 'satur-pink-polished'),
    P('Strawberry Pink', 'Polished', 'Pink & Red', 'strawberry-pink-polished'),
  ],

  capabilities: [
    { step: '01', title: 'Ethical Quarrying', image: img('capabilities/quarry'),
      description: 'Hand-selected blocks extracted from quarries across India, chosen for colour, consistency and soundness.' },
    { step: '02', title: 'MonoWiresaw & Multi-Blade Cutter', image: img('capabilities/multi-blade-cutter'),
      description: 'Precision block dressing followed by multi-blade cutting at 17mm to 100mm — minimal waste, consistent thickness.' },
    { step: '03', title: 'Resin & Line Polishing', image: img('capabilities/line-polishing-machine'),
      description: 'Resin reinforcement and multi-head line polishing (LPM) for a deep, durable, mirror-like finish.' },
    { step: '04', title: 'CNC Edge Profiling', image: img('capabilities/cnc-machine'),
      description: 'CNC bridge cutting carves bullnose, ogee, mitre and chamfer edges and cut-outs to architectural tolerance.' },
    { step: '05', title: 'Quality Inspection', image: img('capabilities/inspection'),
      description: 'Every slab is measured for thickness and checked for tone, flatness and finish before it leaves the factory.' },
  ],

  gallery: [
    { title: 'Gold Granite Kitchen Island', category: 'Countertops', image: img('gallery/gold-granite-countertop') },
    { title: 'Stair & Wall Cladding', category: 'Stair & Cladding', image: img('gallery/stair-and-wall-cladding') },
    { title: 'White Granite Flooring', category: 'Flooring', image: img('gallery/white-granite-flooring') },
    { title: 'Ivory Granite Kitchen', category: 'Countertops', image: img('gallery/ivory-granite-countertop') },
    { title: 'Granite Parking Floor', category: 'Exterior', image: img('gallery/parking-granite') },
    { title: 'Black Granite Countertop', category: 'Countertops', image: img('gallery/black-granite-countertop') },
    { title: 'Anti-Skid Granite Walkway', category: 'Exterior', image: img('gallery/anti-skid-walkway') },
    { title: 'White Granite Countertop', category: 'Countertops', image: img('gallery/white-granite-countertop') },
    { title: 'Our Factory, Madurai', category: 'Factory', image: img('factory/factory') },
    { title: 'Dhanraj Stones Emporium — Entrance', category: 'Factory', image: img('factory/factory-entrance') },
  ],

  milestones: [
    { year: '1991', title: 'Founded as Chaudhary Granite', description: 'Mr. Naresh Chaudhary begins trading premium stone in Rajasthan.', image: '' },
    { year: '1997', title: 'Expansion to Mumbai', description: 'Dhanraj Granite is established as a premier trading hub in Mumbai.', image: '' },
    { year: '2008', title: 'TMT Pvt. Ltd. — Global Reach', description: 'Our export arm takes Dhanraj Granite to the world.', image: '' },
    { year: '2011', title: 'Madurai Manufacturing', description: 'Universal Stone India P. Ltd. opens a state-of-the-art processing facility in Tamil Nadu.', image: img('factory/factory-entrance') },
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
