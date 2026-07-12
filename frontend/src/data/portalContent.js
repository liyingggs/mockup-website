export const companyProfile = {
  name: 'CDL Tenant Collaboration Portal',
  tagline: 'Improving the tenant journey with a structured, digital leasing experience.',
  overview:
    'A centralized tenant collaboration portal for prospective occupiers to review leasing requirements, follow each project stage, access technical references, and submit enquiries without relying on long email chains or static manuals.',
};

export const companyValues = [
  {
    title: 'Clarity',
    description: 'Structured guidance removes guesswork from the leasing and fit-out process.',
  },
  {
    title: 'Compliance',
    description: 'Clear standards, templates, and checkpoints support complete submissions.',
  },
  {
    title: 'Collaboration',
    description: 'A shared reference point keeps tenants, consultants, and CDL teams aligned.',
  },
  {
    title: 'Readiness',
    description: 'Progress tracking helps teams prepare the next submission stage with confidence.',
  },
];

export const whyLeaseWithUs = [
  'Single source of truth for tenancy requirements and operational standards.',
  'Faster onboarding with stage-by-stage guidance and submission prompts.',
  'Professional fit-out support for retail, F&B, shopfront, and workplace tenants.',
  'Self-service access to resources, reducing repeated administrative enquiries.',
];

export const quickLinks = [
  {
    title: 'Start Your Tenant Journey',
    description: 'Review all 10 stages, stage requirements, and readiness checkpoints.',
    path: '/journey',
  },
  {
    title: 'Fit-Out Guidelines',
    description: 'Choose the guidance pack that matches your tenancy type.',
    path: '/fit-out',
  },
  {
    title: 'Resources',
    description: 'Search the manual, browse downloads, and access appendices in one place.',
    path: '/resources',
  },
  {
    title: 'Contact CDL',
    description: 'Submit an enquiry for leasing, submissions, technical standards, or operations.',
    path: '/contact',
  },
];

export const journeyStages = [
  {
    id: 'design-excellence',
    number: '01',
    title: 'Design Excellence',
    overview: 'Define the intended customer experience, brand positioning, and quality benchmark for the proposed premises.',
    requirements: [
      'Prepare a concept board and initial space-planning narrative.',
      'Confirm design consultants and project governance contacts.',
      'Align design intent with CDL mall positioning and brand standards.',
    ],
    checklist: [
      'Appointed design lead and project manager',
      'Initial concept pack prepared',
      'Brand intent and material palette reviewed internally',
    ],
    documents: ['Concept submission brief', 'Tenant branding guide'],
    templates: ['Concept presentation template', 'Design intent checklist'],
    manualSections: ['Chapter 1: Design Principles', 'Appendix A: Submission matrix'],
    deadline: 'Week 1-2',
  },
  {
    id: 'sustainability-framework',
    number: '02',
    title: 'Sustainability Framework',
    overview: 'Integrate sustainability commitments early so design and construction decisions support CDL environmental targets.',
    requirements: [
      'Review applicable sustainability documentation and mandatory metrics.',
      'Identify energy, water, and waste reduction opportunities.',
      'Plan evidence required for sustainability review submissions.',
    ],
    checklist: [
      'Sustainability obligations reviewed',
      'Proposed green measures listed',
      'Consultant responsibilities confirmed',
    ],
    documents: ['Sustainability framework overview', 'Environmental data request sheet'],
    templates: ['Sustainability declaration form'],
    manualSections: ['Chapter 2: Sustainability Criteria'],
    deadline: 'Week 2-3',
  },
  {
    id: 'green-lease-framework',
    number: '03',
    title: 'Green Lease Framework',
    overview: 'Review the operational sustainability obligations that will apply during the tenancy term.',
    requirements: [
      'Understand green lease obligations and shared responsibilities.',
      'Confirm operational reporting expectations for utilities and waste.',
      'Acknowledge building-level sustainability initiatives.',
    ],
    checklist: [
      'Green lease clauses reviewed',
      'Operational sustainability contact identified',
      'Reporting expectations acknowledged',
    ],
    documents: ['Green lease framework note'],
    templates: ['Operational sustainability acknowledgement'],
    manualSections: ['Chapter 3: Green Lease Requirements'],
    deadline: 'Week 3',
  },
  {
    id: 'design-submission-requirements',
    number: '04',
    title: 'Design Submission Requirements',
    overview: 'Compile the formal design submission package for CDL review with complete drawings, narratives, and schedules.',
    requirements: [
      'Prepare general arrangement drawings, reflected ceiling plans, and elevations.',
      'Submit material schedules, lighting intent, and signage proposals.',
      'Include authority submission assumptions and design calculations where required.',
    ],
    checklist: [
      'Drawing register completed',
      'Material and finishes schedule attached',
      'Authority and landlord submission assumptions included',
    ],
    documents: ['Design submission checklist', 'Drawing register'],
    templates: ['Submission transmittal', 'Material schedule template'],
    manualSections: ['Chapter 4: Submission Requirements'],
    deadline: 'Week 4-5',
  },
  {
    id: 'technical-standards',
    number: '05',
    title: 'Technical Standards',
    overview: 'Verify the tenancy design against CDL base building and engineering technical standards before approval.',
    requirements: [
      'Review MEP interface points, load requirements, and approved connection methods.',
      'Confirm fire safety, accessibility, and statutory requirements.',
      'Coordinate equipment data sheets and technical calculations.',
    ],
    checklist: [
      'MEP interface review completed',
      'Fire and life safety constraints incorporated',
      'Equipment schedules aligned with landlord standards',
    ],
    documents: ['Technical standards register', 'MEP coordination guide'],
    templates: ['Equipment data sheet template'],
    manualSections: ['Chapter 5: Technical Standards'],
    deadline: 'Week 5-6',
  },
  {
    id: 'construction-management',
    number: '06',
    title: 'Construction Management',
    overview: 'Coordinate site access, contractor onboarding, logistics, and construction-stage governance.',
    requirements: [
      'Submit contractor details, safe work procedures, and site logistics plans.',
      'Confirm work permits, insurance, and induction requirements.',
      'Plan noisy works, deliveries, and protection measures with operations teams.',
    ],
    checklist: [
      'Contractor onboarding package submitted',
      'Insurance and permit records complete',
      'Site logistics and access requests approved',
    ],
    documents: ['Construction management plan', 'Site logistics matrix'],
    templates: ['Contractor onboarding form', 'Permit request form'],
    manualSections: ['Chapter 6: Construction Controls'],
    deadline: 'Pre-site possession',
  },
  {
    id: 'testing-commissioning',
    number: '07',
    title: 'Testing & Commissioning',
    overview: 'Validate installed systems, witness tests, and prepare close-out records before handover.',
    requirements: [
      'Coordinate testing schedules with building representatives.',
      'Provide commissioning reports, certifications, and O&M records.',
      'Track defects, rectification items, and witness sign-offs.',
    ],
    checklist: [
      'Testing calendar confirmed',
      'Commissioning reports compiled',
      'Defects list and rectification plan issued',
    ],
    documents: ['Commissioning witness matrix', 'Defects tracking log'],
    templates: ['Testing sign-off sheet'],
    manualSections: ['Chapter 7: Testing and Commissioning'],
    deadline: '2 weeks before opening',
  },
  {
    id: 'handover-occupation',
    number: '08',
    title: 'Handover & Occupation',
    overview: 'Complete close-out submissions, secure occupation approval, and prepare the store for opening.',
    requirements: [
      'Provide as-built records, warranties, and statutory approvals.',
      'Complete joint inspections and final snag close-out.',
      'Confirm opening-readiness, staff induction, and operational contacts.',
    ],
    checklist: [
      'As-built and warranty pack issued',
      'Final inspection items closed',
      'Occupation and opening approvals confirmed',
    ],
    documents: ['Handover checklist', 'Close-out dossier'],
    templates: ['Opening readiness declaration'],
    manualSections: ['Chapter 8: Handover Procedures'],
    deadline: 'Opening week',
  },
  {
    id: 'operational-requirements',
    number: '09',
    title: 'Operational Requirements',
    overview: 'Understand daily operating expectations covering maintenance, access, housekeeping, and tenant coordination.',
    requirements: [
      'Review operating hours, loading procedures, and after-hours access rules.',
      'Understand preventive maintenance obligations and emergency contacts.',
      'Confirm housekeeping, waste, and service corridor expectations.',
    ],
    checklist: [
      'Operations handbook reviewed',
      'Emergency and maintenance contacts logged',
      'Waste and service procedures briefed to staff',
    ],
    documents: ['Operations guide', 'Emergency contact directory'],
    templates: ['Maintenance contact register'],
    manualSections: ['Chapter 9: Operations'],
    deadline: 'Before trade commencement',
  },
  {
    id: 'reinstatement-guide',
    number: '10',
    title: 'Reinstatement Guide',
    overview: 'Plan for end-of-term obligations early by understanding reinstatement scope, approvals, and handback standards.',
    requirements: [
      'Review reinstatement requirements and approval process.',
      'Understand landlord asset protection and make-good scope.',
      'Plan close-out documentation for eventual handback.',
    ],
    checklist: [
      'Reinstatement obligations reviewed',
      'Asset protection assumptions documented',
      'Future handback records strategy agreed',
    ],
    documents: ['Reinstatement guide note'],
    templates: ['Handback planning checklist'],
    manualSections: ['Chapter 10: Reinstatement'],
    deadline: 'Reference stage',
  },
];

export const fitOutGuides = [
  {
    id: 'retail',
    title: 'Retail Fit-Out',
    audience: 'Fashion, lifestyle, specialty retail',
    overview: 'Guidance for front-of-house presentation, merchandising visibility, and customer circulation.',
    standards: [
      'Interior design requirements and approved finish quality.',
      'Shop layout strategy for circulation, cashier placement, and sightlines.',
      'Display standards for window merchandising and fixture density.',
      'Lighting guidelines for ambient, feature, and merchandise illumination.',
    ],
    submissions: ['Concept visuals', 'Storefront elevations', 'Lighting layout', 'Fixture schedule'],
  },
  {
    id: 'fnb',
    title: 'Food & Beverage (F&B)',
    audience: 'Restaurants, cafes, kiosks',
    overview: 'Enhanced controls for kitchen planning, ventilation interfaces, and hygiene-sensitive back-of-house functions.',
    standards: [
      'Kitchen zoning and workflow planning.',
      'Ventilation and exhaust coordination with base building infrastructure.',
      'Grease trap, drainage, and wash-up requirements.',
      'Hygiene standards, cleanability, and food-safe finishes.',
    ],
    submissions: ['Kitchen equipment schedule', 'Exhaust and duct layout', 'Hygiene workflow narrative', 'Grease management details'],
  },
  {
    id: 'shopfront',
    title: 'Shopfront Fit-Out',
    audience: 'Tenants prioritizing brand visibility and facade expression',
    overview: 'Rules governing signage, facade articulation, transparency, and storefront lighting.',
    standards: [
      'Signage sizing, positioning, and approved materials.',
      'Facade design coordination with neighboring tenancies.',
      'Branding guidelines and logo placement limitations.',
      'Lighting requirements for signage and display frontage.',
    ],
    submissions: ['Signage shop drawings', 'Facade material board', 'Brand application visuals'],
  },
  {
    id: 'workplace',
    title: 'Flexible Workplace & Fitted Suites',
    audience: 'Office occupiers and fitted workspace operators',
    overview: 'Standards for office planning, furniture layout, amenities, and shared support spaces.',
    standards: [
      'Office layout standards with circulation and collaboration zones.',
      'Furniture requirements and shared amenities planning.',
      'Shared facilities coordination for pantry, meeting, and support areas.',
      'Workspace guidelines for acoustics, power, and staff wellbeing.',
    ],
    submissions: ['Workplace planning pack', 'Furniture schedule', 'Shared facilities matrix'],
  },
];

export const manualChapters = [
  {
    id: 'chapter-1',
    title: '01. Leasing Overview',
    summary: 'Introduces the CDL leasing process, key approvals, and expected tenant roles.',
    sections: [
      'Leasing workflow and approval gates',
      'Roles of landlord, tenant, consultants, and contractors',
      'Core submission milestones and review timings',
    ],
  },
  {
    id: 'chapter-2',
    title: '02. Design & Brand Standards',
    summary: 'Explains design quality expectations, concept alignment, and brand presentation requirements.',
    sections: [
      'Concept quality benchmark',
      'Storefront and visibility expectations',
      'Materiality, lighting, and customer experience principles',
    ],
  },
  {
    id: 'chapter-3',
    title: '03. Sustainability & Green Lease',
    summary: 'Covers sustainability criteria, reporting expectations, and green lease coordination points.',
    sections: [
      'Sustainability objectives and minimum controls',
      'Operational reporting expectations',
      'Green lease coordination requirements',
    ],
  },
  {
    id: 'chapter-4',
    title: '04. Technical Standards',
    summary: 'Summarizes base building interfaces, engineering constraints, and equipment documentation requirements.',
    sections: [
      'MEP connection rules',
      'Fire safety and statutory compliance requirements',
      'Equipment schedules, data sheets, and calculations',
    ],
  },
  {
    id: 'chapter-5',
    title: '05. Construction & Site Controls',
    summary: 'Details contractor onboarding, site logistics, permits, and on-site conduct requirements.',
    sections: [
      'Site possession and access controls',
      'Insurance, permits, and safety documentation',
      'Noisy work restrictions, deliveries, and protection measures',
    ],
  },
  {
    id: 'chapter-6',
    title: '06. Testing, Handover & Operations',
    summary: 'Combines commissioning, close-out, opening readiness, and ongoing operational responsibilities.',
    sections: [
      'Testing and witness requirements',
      'Handover records and final approvals',
      'Operations, maintenance, and emergency coordination',
    ],
  },
];

export const documentResources = [
  {
    id: 'manual',
    name: 'Tenancy Manual Register',
    category: 'Manual',
    type: 'Reference',
    stage: 'All stages',
    access: 'Digital manual in portal',
    description: 'Structured reference to all leasing, technical, and operational requirements.',
  },
  {
    id: 'application-forms',
    name: 'Application Forms',
    category: 'Forms',
    type: 'Submission',
    stage: 'Pre-lease',
    access: 'Request pack via CDL team',
    description: 'Core tenant onboarding forms and declarations for initial review.',
  },
  {
    id: 'design-templates',
    name: 'Design Submission Templates',
    category: 'Templates',
    type: 'Design',
    stage: 'Design submission',
    access: 'Portal-issued template set',
    description: 'Drawing register, transmittal, and material schedule templates.',
  },
  {
    id: 'technical-standards',
    name: 'Technical Standards Package',
    category: 'Technical',
    type: 'Engineering',
    stage: 'Technical review',
    access: 'Controlled reference document',
    description: 'Engineering interfaces, equipment requirements, and base building constraints.',
  },
  {
    id: 'sustainability',
    name: 'Sustainability Documents',
    category: 'Sustainability',
    type: 'Compliance',
    stage: 'Sustainability review',
    access: 'Portal issue',
    description: 'Environmental targets, reporting templates, and supporting references.',
  },
  {
    id: 'green-lease',
    name: 'Green Lease Framework',
    category: 'Sustainability',
    type: 'Operational',
    stage: 'Lease coordination',
    access: 'Portal issue',
    description: 'Shared obligations for efficient operations and environmental reporting.',
  },
  {
    id: 'sample-drawings',
    name: 'Sample Drawings',
    category: 'Appendices',
    type: 'Reference',
    stage: 'Design development',
    access: 'Illustrative reference set',
    description: 'Indicative examples of required drawing types and detailing depth.',
  },
  {
    id: 'construction-forms',
    name: 'Construction Forms',
    category: 'Forms',
    type: 'Site access',
    stage: 'Construction management',
    access: 'Operations release',
    description: 'Permits, contractor onboarding, and site logistics submission forms.',
  },
];

export const appendices = [
  'Sample floor plans',
  'Technical drawings',
  'Submission templates',
  'Regulatory references',
  'Glossary of terms',
  'Contact directory',
  'Revision history',
];

export const readinessTasks = [
  { id: 'task-1', stage: 'Design Excellence', title: 'Confirm design consultant and project lead', deadline: 'Week 1' },
  { id: 'task-2', stage: 'Sustainability Framework', title: 'Review sustainability obligations', deadline: 'Week 2' },
  { id: 'task-3', stage: 'Green Lease Framework', title: 'Acknowledge operational sustainability requirements', deadline: 'Week 3' },
  { id: 'task-4', stage: 'Design Submission Requirements', title: 'Submit drawings, finishes schedule, and narrative', deadline: 'Week 5' },
  { id: 'task-5', stage: 'Technical Standards', title: 'Coordinate MEP interfaces and equipment data', deadline: 'Week 6' },
  { id: 'task-6', stage: 'Construction Management', title: 'Complete contractor onboarding pack', deadline: 'Pre-possession' },
  { id: 'task-7', stage: 'Testing & Commissioning', title: 'Issue testing calendar and witness matrix', deadline: '2 weeks before opening' },
  { id: 'task-8', stage: 'Handover & Occupation', title: 'Complete handover dossier and approvals', deadline: 'Opening week' },
  { id: 'task-9', stage: 'Operational Requirements', title: 'Brief operating contacts and emergency procedures', deadline: 'Before trade' },
  { id: 'task-10', stage: 'Reinstatement Guide', title: 'Record make-good obligations for future handback', deadline: 'Reference only' },
];

export const fallbackAnnouncements = [
  {
    id: 'notice-1',
    title: 'Design submission cut-off for August review panel',
    body: 'Submit complete design packs by 12 August to secure review in the next landlord coordination session.',
    publishedAt: '2026-07-10T09:00:00.000Z',
    tag: 'Submission deadline',
  },
  {
    id: 'notice-2',
    title: 'Updated sustainability reporting requirements issued',
    body: 'The sustainability checklist now includes tenant lighting density and equipment efficiency declarations.',
    publishedAt: '2026-07-06T09:00:00.000Z',
    tag: 'Sustainability',
  },
  {
    id: 'notice-3',
    title: 'Construction access notice for after-hours deliveries',
    body: 'All after-hours deliveries must be pre-cleared with building operations at least 48 hours in advance.',
    publishedAt: '2026-07-02T09:00:00.000Z',
    tag: 'Operations',
  },
];

export const fallbackContacts = [
  {
    id: 'contact-1',
    name: 'Leasing Management Team',
    role: 'Leasing enquiries and premise matching',
    department: 'Leasing',
    email: 'leasing@cdl-portal.example',
    phone: '+65 6800 1001',
  },
  {
    id: 'contact-2',
    name: 'Design Review Desk',
    role: 'Design submissions and fit-out coordination',
    department: 'Design Review',
    email: 'designreview@cdl-portal.example',
    phone: '+65 6800 1002',
  },
  {
    id: 'contact-3',
    name: 'Operations Control',
    role: 'Construction access, handover, and operating procedures',
    department: 'Operations',
    email: 'operations@cdl-portal.example',
    phone: '+65 6800 1003',
  },
  {
    id: 'contact-4',
    name: 'Sustainability Office',
    role: 'Green lease and sustainability framework support',
    department: 'Sustainability',
    email: 'sustainability@cdl-portal.example',
    phone: '+65 6800 1004',
  },
];

export const fallbackFaqs = [
  {
    id: 'faq-1',
    category: 'Leasing Process',
    question: 'How do I start the tenant journey?',
    answer: 'Start with the Tenant Journey page, review the Design Excellence stage, and use the readiness tracker to understand the first submission set.',
  },
  {
    id: 'faq-2',
    category: 'Design Submission',
    question: 'What do I need to include in my design submission?',
    answer: 'A complete design pack typically includes layout drawings, elevations, finishes, signage intent, consultant details, and supporting narratives.',
  },
  {
    id: 'faq-3',
    category: 'Construction',
    question: 'Can my contractor access the site before approvals are complete?',
    answer: 'No. Contractor onboarding, permit approval, and construction access clearances must be completed before site possession or active works.',
  },
  {
    id: 'faq-4',
    category: 'Technical Standards',
    question: 'Where can I review technical standards for MEP works?',
    answer: 'Use the Technical Standards stage in the Tenant Journey and the Digital Tenancy Manual chapter dedicated to engineering interfaces.',
  },
  {
    id: 'faq-5',
    category: 'Operations',
    question: 'When will I receive operating procedures for deliveries and housekeeping?',
    answer: 'Operational requirements are summarized in the portal and should be reviewed before trade commencement during the handover stage.',
  },
  {
    id: 'faq-6',
    category: 'Reinstatement',
    question: 'Why is the reinstatement guide shown before the tenancy ends?',
    answer: 'Early visibility helps tenants and consultants protect landlord assets and maintain accurate close-out records throughout the tenancy lifecycle.',
  },
];

export const assistantPrompts = [
  'How do I submit my design drawings?',
  'Where can I find the Green Lease Framework?',
  'What documents are needed before construction begins?',
];

export const assistantKnowledge = [
  {
    keywords: ['design', 'drawing', 'submission'],
    answer:
      'Use Stage 04 on the Tenant Journey. The portal expects your drawing register, material schedule, key elevations, and supporting narratives before formal review.',
    links: ['/journey', '/resources'],
  },
  {
    keywords: ['green lease', 'sustainability'],
    answer:
      'The Green Lease Framework sits alongside the Sustainability Framework. Review the Fit-Out and Manual sections for operational obligations and supporting references.',
    links: ['/journey', '/resources'],
  },
  {
    keywords: ['construction', 'before construction', 'contractor'],
    answer:
      'Before construction begins, contractor onboarding, permits, logistics planning, and operations clearances should all be in place. The Construction Management stage lists the required items.',
    links: ['/journey', '/resources', '/contact'],
  },
];

export const serviceMetrics = [
  { value: '10', label: 'Tenant journey stages' },
  { value: '24/7', label: 'Always-available digital reference' },
  { value: '1', label: 'Central platform for resources and enquiries' },
  { value: '3 days', label: 'Target response window for enquiries' },
];