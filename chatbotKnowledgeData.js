const chatbotKnowledgeData = [
  {
    topic: 'PTW Requirement',
    keywords: 'ptw,permit,work,start construction',
    answer: 'No fit-out works may commence until a written Permit to Work (PTW) approval has been issued by the Building Management Office.',
    priority: 10,
  },
  {
    topic: 'GMI Requirement',
    keywords: 'gmi,green mark,interiors,gold',
    answer: 'All fit-outs shall be designed to achieve at least Green Mark for Interiors (GMI) Gold.',
    priority: 9,
  },
  {
    topic: 'Lighting Power Budget',
    keywords: 'lighting,power,lpb,watt,w/m2',
    answer: 'The lighting power budget for office spaces shall not exceed 5 W/m2 and should achieve at least a 10% improvement over the SS 530:2024 baseline for GMI Gold projects.',
    priority: 8,
  },
  {
    topic: 'Fit-Out Timeline',
    keywords: 'timeline,submission,concept,detailed',
    answer: 'Concept submission is due within 21 days of the Notice of Possession (NOP). Detailed submissions must be submitted at least 21 working days before commencement of works.',
    priority: 8,
  },
  {
    topic: 'Deposit Refund',
    keywords: 'deposit,refund,as-built,manuals',
    answer: 'Deposit release is subject to joint inspection clearance, submission of as-built drawings, O&M manuals, BIM deliverables, and the Green Completion Pack.',
    priority: 7,
  },
  {
    topic: 'Sustainability Liaison Officer',
    keywords: 'slo,sustainability,liaison,officer',
    answer: 'Each tenant must designate a Sustainability Liaison Officer (SLO) responsible for sustainability, Green Mark, Green Lease, and ESG reporting obligations.',
    priority: 7,
  },
  {
    topic: 'Waste Diversion',
    keywords: 'waste,recycling,diversion,landfill',
    answer: 'Major fit-outs and reinstatement works should target a minimum of 75% diversion of construction waste from landfill through reuse, recycling, or recovery.',
    priority: 7,
  },
  {
    topic: 'IAQ Testing',
    keywords: 'iaq,air quality,formaldehyde,tvoc',
    answer: 'For fit-outs larger than 300 m2, IAQ testing must be conducted within 3 months after steady-state occupancy and submitted to the landlord within 30 days.',
    priority: 7,
  },
  {
    topic: 'Acoustic Requirement',
    keywords: 'acoustic,rw,sound,meeting room',
    answer: 'Enclosed offices, meeting rooms, and phone booths should achieve a minimum acoustic separation of Rw >= 40 dB.',
    priority: 6,
  },
  {
    topic: 'Water Efficiency',
    keywords: 'water,wels,3 ticks,meter',
    answer: 'All water fittings must comply with at least 3-tick WELS requirements, and larger tenancies with private toilet facilities should install water sub-meters and leak detection systems.',
    priority: 6,
  },
  {
    topic: 'Emergency Contact',
    keywords: 'emergency,24-hour,bmo,building management',
    answer: 'The Building Management Office is the primary contact for operational, technical, and sustainability matters, including 24-hour emergencies.',
    priority: 5,
  },
  {
    topic: 'No Work Before PTW',
    keywords: 'start work,without ptw,penalty',
    answer: 'Starting work before PTW approval may result in forfeiture of the fit-out deposit and suspension of the contractor.',
    priority: 10,
  },
];

module.exports = chatbotKnowledgeData;
