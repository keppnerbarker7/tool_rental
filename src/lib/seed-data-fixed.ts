import { Tool, ToolCategory, ToolStatus } from '@/types'

// Seed data for tool catalog
export const seedTools: Tool[] = [
  // Pressure Washers
  {
    id: 'pw-001',
    name: 'Commercial Electric Pressure Washer 2000 PSI',
    slug: 'commercial-electric-pressure-washer-2000-psi',
    description: 'Heavy-duty electric pressure washer perfect for cleaning driveways, decks, siding, and vehicles. Features adjustable pressure settings and multiple nozzle attachments.',
    category: ToolCategory.PRESSURE_WASHERS,
    brand: 'PowerClean Pro',
    model: 'PC-2000E',
    dailyRate: 29.99,
    weeklyRate: 149.95,
    monthlyRate: 449.85,
    deposit: 75.00,
    status: ToolStatus.AVAILABLE,
    condition: 'Excellent',
    location: 'Utah County - Provo',
    images: ['/images/placeholder-tool.jpg'],
    specifications: {
      pressure: '2000 PSI',
      flowRate: '1.6 GPM',
      powerSource: 'Electric (120V)',
      weight: '32 lbs',
      hoseLength: '25 ft',
      nozzles: ['0°', '15°', '25°', '40°', 'Soap']
    },
    replacementCost: 299.99,
    trainingRequired: false,
    policies: [
      'Must be returned clean and dry',
      'Customer responsible for extension cord',
      'Use only with cold water',
      'No hot water or chemicals in tank'
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-10-01')
  },
  {
    id: 'pw-002',
    name: 'Gas Powered Pressure Washer 3000 PSI',
    slug: 'gas-powered-pressure-washer-3000-psi',
    description: 'Professional-grade gas pressure washer for heavy-duty cleaning projects. Ideal for large driveways, commercial cleaning, and tough stains.',
    category: ToolCategory.PRESSURE_WASHERS,
    brand: 'ProForce',
    model: 'PF-3000G',
    dailyRate: 45.99,
    weeklyRate: 229.95,
    monthlyRate: 689.85,
    deposit: 125.00,
    status: ToolStatus.AVAILABLE,
    condition: 'Good',
    location: 'Utah County - Orem',
    images: ['/images/placeholder-tool.jpg'],
    specifications: {
      pressure: '3000 PSI',
      flowRate: '2.5 GPM',
      powerSource: 'Gas (Honda Engine)',
      weight: '75 lbs',
      hoseLength: '50 ft',
      fuelCapacity: '0.9 gallons'
    },
    replacementCost: 599.99,
    trainingRequired: false,
    policies: [
      'Must be returned with fuel tank empty',
      'Customer provides gasoline',
      'Requires outdoor use only',
      'Oil check required before each use'
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-09-15')
  },

  // Carpet Cleaners
  {
    id: 'cc-001',
    name: 'Commercial Carpet Extractor',
    slug: 'commercial-carpet-extractor',
    description: 'Professional-grade carpet cleaning machine for deep extraction cleaning. Perfect for large areas and commercial applications.',
    category: ToolCategory.CARPET_CLEANERS,
    brand: 'CleanMaster',
    model: 'CM-500',
    dailyRate: 35.99,
    weeklyRate: 179.95,
    monthlyRate: 539.85,
    deposit: 100.00,
    status: ToolStatus.AVAILABLE,
    condition: 'Very Good',
    location: 'Utah County - Lehi',
    images: ['/images/placeholder-tool.jpg'],
    specifications: {
      suctionPower: '150 CFM',
      heatedCleaning: 'Yes',
      pathWidth: '12 inches',
      weight: '45 lbs',
      cordLength: '25 ft'
    },
    replacementCost: 899.99,
    trainingRequired: false,
    policies: [
      'Must be returned clean and empty',
      'Customer provides cleaning solution',
      'Indoor use only',
      'Test in inconspicuous area first'
    ],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-09-20')
  },
  {
    id: 'cc-002',
    name: 'Portable Spot Cleaner',
    slug: 'portable-spot-cleaner',
    description: 'Compact spot cleaner for upholstery, stairs, and small areas. Great for pet stains and quick touch-ups.',
    category: ToolCategory.CARPET_CLEANERS,
    brand: 'SpotAway',
    model: 'SA-200',
    dailyRate: 19.99,
    weeklyRate: 99.95,
    monthlyRate: 299.85,
    deposit: 50.00,
    status: ToolStatus.RENTED,
    condition: 'Excellent',
    location: 'Utah County - American Fork',
    images: ['/images/placeholder-tool.jpg'],
    specifications: {
      weight: '12 lbs',
      hoseLength: '6 ft',
      powerRating: '500W',
      attachments: ['Upholstery tool', 'Crevice tool', 'Stair tool']
    },
    replacementCost: 199.99,
    trainingRequired: false,
    policies: [
      'Perfect for stairs and upholstery',
      'Lightweight and portable',
      'Includes cleaning attachments',
      'Must be returned clean'
    ],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-10-05')
  },

  // Lawn & Garden
  {
    id: 'lg-001',
    name: 'Zero Turn Riding Mower 42"',
    slug: 'zero-turn-riding-mower-42',
    description: 'Commercial-grade zero-turn mower for efficient lawn maintenance. Perfect for large properties and professional landscaping.',
    category: ToolCategory.LAWN_GARDEN,
    brand: 'TurfMaster',
    model: 'TM-42Z',
    dailyRate: 89.99,
    weeklyRate: 449.95,
    monthlyRate: 1349.85,
    deposit: 200.00,
    status: ToolStatus.MAINTENANCE,
    condition: 'Good',
    location: 'Utah County - Spanish Fork',
    images: ['/images/placeholder-tool.jpg'],
    specifications: {
      engine: '24HP Kawasaki',
      fuelCapacity: '5.5 gallons',
      groundSpeed: '8 mph',
      turningRadius: '0 degrees',
      weight: '800 lbs'
    },
    replacementCost: 8999.99,
    trainingRequired: true,
    policies: [
      'Training required before use',
      'Fuel included in rental',
      'Commercial insurance required',
      'Operator must be 18+',
      'Safety equipment provided'
    ],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-10-10')
  },
  {
    id: 'lg-002',
    name: 'Professional Chainsaw 18"',
    slug: 'professional-chainsaw-18',
    description: 'Professional-grade chainsaw for tree trimming, firewood cutting, and storm cleanup. Includes safety equipment.',
    category: ToolCategory.LAWN_GARDEN,
    brand: 'ForestPro',
    model: 'FP-18CS',
    dailyRate: 45.99,
    weeklyRate: 229.95,
    monthlyRate: 689.85,
    deposit: 150.00,
    status: ToolStatus.AVAILABLE,
    condition: 'Excellent',
    location: 'Utah County - Payson',
    images: ['/images/placeholder-tool.jpg'],
    specifications: {
      engine: '50.2cc 2-stroke',
      weight: '12.3 lbs',
      fuelCapacity: '20.3 fl oz',
      oilCapacity: '9.5 fl oz',
      safety: ['Chain brake', 'Throttle lock', 'Anti-vibration']
    },
    replacementCost: 499.99,
    trainingRequired: true,
    policies: [
      'Safety training mandatory',
      'Protective equipment required',
      'Fuel and oil included',
      'Must be 21+ to rent',
      'Sharpening service available'
    ],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-09-30')
  },
  {
    id: 'lg-003',
    name: 'Core Aerator Walk-Behind',
    slug: 'core-aerator-walk-behind',
    description: 'Professional walk-behind core aerator for lawn renovation. Creates optimal growing conditions for grass.',
    category: ToolCategory.LAWN_GARDEN,
    brand: 'LawnPro',
    model: 'LP-24CA',
    dailyRate: 65.99,
    weeklyRate: 329.95,
    monthlyRate: 989.85,
    deposit: 125.00,
    status: ToolStatus.AVAILABLE,
    condition: 'Very Good',
    location: 'Utah County - Springville',
    images: ['/images/placeholder-tool.jpg'],
    specifications: {
      coreSize: '0.75 inches',
      engine: '6HP Briggs & Stratton',
      weight: '250 lbs',
      productivity: '1 acre/hour'
    },
    replacementCost: 2199.99,
    trainingRequired: false,
    policies: [
      'Best used on moist soil',
      'Mark sprinkler heads before use',
      'Fuel included in rental',
      'Delivery available for additional fee'
    ],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-09-25')
  },

  // Power Tools
  {
    id: 'pt-001',
    name: 'Electric Demolition Hammer',
    slug: 'electric-demolition-hammer',
    description: 'Heavy-duty electric demolition hammer for breaking concrete, tile removal, and renovation work.',
    category: ToolCategory.POWER_TOOLS,
    brand: 'BreakForce',
    model: 'BF-1500',
    dailyRate: 55.99,
    weeklyRate: 279.95,
    monthlyRate: 839.85,
    deposit: 100.00,
    status: ToolStatus.AVAILABLE,
    condition: 'Good',
    location: 'Utah County - Orem',
    images: ['/images/placeholder-tool.jpg'],
    specifications: {
      impactRate: '1,400 BPM',
      impactEnergy: '25 Joules',
      powerRating: '15 Amp',
      chuckType: 'SDS-Max',
      vibration: 'Anti-vibration handle'
    },
    replacementCost: 899.99,
    trainingRequired: true,
    policies: [
      'Safety training required',
      'Eye and ear protection mandatory',
      'Dust mask recommended',
      'Chisels included',
      'Professional use only'
    ],
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-10-01')
  },
  {
    id: 'pt-002',
    name: 'Professional Wet Tile Saw',
    slug: 'professional-wet-tile-saw',
    description: 'Precision wet tile saw for ceramic, porcelain, and stone cutting. Perfect for bathroom and kitchen renovations.',
    category: ToolCategory.POWER_TOOLS,
    brand: 'CutMaster',
    model: 'CM-10TS',
    dailyRate: 39.99,
    weeklyRate: 199.95,
    monthlyRate: 599.85,
    deposit: 75.00,
    status: ToolStatus.AVAILABLE,
    condition: 'Excellent',
    location: 'Utah County - Provo',
    images: ['/images/placeholder-tool.jpg'],
    specifications: {
      maxCutCapacity: '24 x 24 inches',
      tableSize: '26 x 20 inches',
      motorPower: '1.5 HP',
      waterSystem: 'Recirculating pump',
      weight: '69 lbs'
    },
    replacementCost: 599.99,
    trainingRequired: false,
    policies: [
      'Diamond blade included',
      'Water reservoir must be filled',
      'Clean thoroughly after use',
      'Suitable for all tile types',
      'Extension cord required'
    ],
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date('2024-09-28')
  },
  {
    id: 'pt-003',
    name: 'Portable Concrete Mixer',
    slug: 'portable-concrete-mixer',
    description: 'Electric concrete mixer for small to medium concrete projects. Perfect for walkways, patios, and repairs.',
    category: ToolCategory.POWER_TOOLS,
    brand: 'MixPro',
    model: 'MP-3.5',
    dailyRate: 42.99,
    weeklyRate: 214.95,
    monthlyRate: 644.85,
    deposit: 100.00,
    status: ToolStatus.AVAILABLE,
    condition: 'Very Good',
    location: 'Utah County - Lehi',
    images: ['/images/placeholder-tool.jpg'],
    specifications: {
      drumSpeed: '28 RPM',
      motorPower: '1/2 HP',
      wheelbarrowCompatible: 'Yes',
      weight: '85 lbs',
      powerRequirement: '115V'
    },
    replacementCost: 449.99,
    trainingRequired: false,
    policies: [
      'Clean thoroughly after each use',
      'Suitable for 3.5 cubic feet batches',
      'Wheels for easy transport',
      'Mixing paddle included',
      'Electrical outlet required'
    ],
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-10-02')
  },
  {
    id: 'pt-004',
    name: 'Floor Drum Sander',
    slug: 'floor-drum-sander',
    description: 'Professional drum sander for hardwood floor refinishing. Includes dust collection system and various grits.',
    category: ToolCategory.POWER_TOOLS,
    brand: 'FloorPro',
    model: 'FP-8DS',
    dailyRate: 75.99,
    weeklyRate: 379.95,
    monthlyRate: 1139.85,
    deposit: 150.00,
    status: ToolStatus.AVAILABLE,
    condition: 'Good',
    location: 'Utah County - American Fork',
    images: ['/images/placeholder-tool.jpg'],
    specifications: {
      motorPower: '1.5 HP',
      sandingRate: '800 sq ft/hr',
      dustCollection: 'Built-in system',
      weight: '95 lbs',
      sandpaperSizes: ['36', '60', '80', '100', '120 grit']
    },
    replacementCost: 1299.99,
    trainingRequired: true,
    policies: [
      'Demonstration required before use',
      'Dust collection bags included',
      'Various grits available',
      'Professional refinishing only',
      'Safety equipment mandatory'
    ],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-09-22')
  }
]

// Category metadata for display
export const categoryMetadata = {
  [ToolCategory.PRESSURE_WASHERS]: {
    name: 'Pressure Washers',
    description: 'High-pressure cleaning equipment for outdoor surfaces',
    count: seedTools.filter(tool => tool.category === ToolCategory.PRESSURE_WASHERS).length,
    icon: 'spray-can'
  },
  [ToolCategory.CARPET_CLEANERS]: {
    name: 'Carpet Cleaners',
    description: 'Professional carpet and upholstery cleaning equipment',
    count: seedTools.filter(tool => tool.category === ToolCategory.CARPET_CLEANERS).length,
    icon: 'vacuum'
  },
  [ToolCategory.LAWN_GARDEN]: {
    name: 'Lawn & Garden',
    description: 'Outdoor maintenance and landscaping equipment',
    count: seedTools.filter(tool => tool.category === ToolCategory.LAWN_GARDEN).length,
    icon: 'leaf'
  },
  [ToolCategory.POWER_TOOLS]: {
    name: 'Power Tools',
    description: 'Electric and pneumatic construction tools',
    count: seedTools.filter(tool => tool.category === ToolCategory.POWER_TOOLS).length,
    icon: 'wrench'
  }
}