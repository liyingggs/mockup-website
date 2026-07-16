-- =====================================================
-- TENANT FIT-OUT KNOWLEDGE BASE (SQLite)
-- Based on the Tenant Fitting Out Manual v1.0
-- =====================================================

DROP TABLE IF EXISTS knowledge_base;

CREATE TABLE knowledge_base (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    keywords TEXT NOT NULL
);

-- =====================================================
-- FIT-OUT PROCESS
-- =====================================================

INSERT INTO knowledge_base (category, question, answer, keywords) VALUES
('Fit-Out Process',
'What are the first steps after receiving possession of the premises?',
'Register on the Tenant Portal immediately, attend the kick-off meeting within 5 days, appoint your designer, QP, LEW and Fire Safety Engineer, and begin concept design submissions.',
'NOP, tenant portal, kick-off, designer, QP, LEW, FSE'),

('Fit-Out Process',
'When must the concept submission be submitted?',
'The concept submission must be submitted within 21 days of the Notice of Possession.',
'concept submission, 21 days, NOP'),

('Fit-Out Process',
'When must detailed drawings be submitted?',
'Detailed drawings must be submitted at least 21 working days before the intended commencement of works.',
'detailed drawings, 21 working days, submission');

-- =====================================================
-- PERMIT TO WORK
-- =====================================================

INSERT INTO knowledge_base (category, question, answer, keywords) VALUES
('Permit to Work',
'Can I start work before the Permit to Work is approved?',
'No. No fit-out work may commence until written Permit to Work approval has been issued.',
'PTW, start work, commencement'),

('Permit to Work',
'What is required before PTW approval?',
'Landlord drawing acceptance, statutory approvals where applicable, fit-out deposit, insurance, risk assessment, method statement, contractor registration, hoarding plan, Green Form G1, and designation of the Sustainability Liaison Officer using Form G2.',
'PTW requirements, G1, G2, insurance, deposit'),

('Permit to Work',
'How long does PTW processing take?',
'The service commitment is less than 3 working days from a complete application.',
'PTW processing time');

-- =====================================================
-- SUSTAINABILITY
-- =====================================================

INSERT INTO knowledge_base (category, question, answer, keywords) VALUES
('Sustainability',
'What Green Mark standard applies to all fit-outs?',
'All fit-outs must be designed to achieve at least BCA Green Mark for Interiors (GMI) Gold.',
'GMI Gold, Green Mark'),

('Sustainability',
'What is the maximum lighting power budget for office areas?',
'The maximum lighting power budget is 5 W/m² or a minimum 60% improvement over the SS 530:2014 reference, whichever is stricter.',
'lighting power budget, 5 W/m², SS 530'),

('Sustainability',
'Are occupancy sensors mandatory?',
'Yes. Occupancy or vacancy sensors are mandatory for enclosed spaces such as meeting rooms, phone booths, private offices and toilets.',
'occupancy sensors, mandatory'),

('Sustainability',
'What materials are restricted?',
'PVC flooring, carpet tiles with bitumen backing, solvent-based paints and adhesives, urea-formaldehyde adhesives in MDF or particleboard, ozone-depleting refrigerants, and refrigerants with GWP above 750 are restricted unless approved.',
'restricted materials, PVC, solvent-based, refrigerants'),

('Sustainability',
'What VOC limits apply?',
'Paints must be below 50 g/L VOC, adhesives below 100 g/L, and sealants and primers below 50 g/L unless stricter limits apply in the Building Addendum.',
'VOC limits, paints, adhesives, sealants');

-- =====================================================
-- FIRE PROTECTION
-- =====================================================

INSERT INTO knowledge_base (category, question, answer, keywords) VALUES
('Fire Protection',
'How much clearance is required below sprinkler heads?',
'A minimum of 600 mm clearance must be maintained below sprinkler heads.',
'sprinkler clearance, 600 mm'),

('Fire Protection',
'Can return-air grilles be sealed or blocked?',
'No. Return-air grilles must never be sealed or blocked.',
'return-air grille, blocked, sealed'),

('Fire Protection',
'Are fire protection tests required before occupation?',
'Yes. Fire alarm, PA and other fire protection systems must be tested and commissioned before handover and occupation.',
'fire testing, PA testing, commissioning');

-- =====================================================
-- ACMV
-- =====================================================

INSERT INTO knowledge_base (category, question, answer, keywords) VALUES
('ACMV',
'What temperature setpoint is required?',
'ACMV zone temperature setpoints must not be below 24°C.',
'temperature setpoint, 24°C'),

('ACMV',
'What is required for supplementary cooling below 10 kW?',
'Supplementary cooling systems below 10 kW must have a minimum NEA 5-tick rating.',
'supplementary cooling, 5-tick'),

('ACMV',
'Is an air balancing report required?',
'Yes. An air balancing report certified by the QP must be submitted at completion.',
'air balancing report, QP');

-- =====================================================
-- WATER & METERING
-- =====================================================

INSERT INTO knowledge_base (category, question, answer, keywords) VALUES
('Water',
'What WELS rating is required for water fittings?',
'All water fittings must have a minimum WELS 3-tick rating.',
'WELS, 3-tick'),

('Water',
'When is private water sub-metering required?',
'For tenancies larger than 500 m² with private toilet facilities.',
'water sub-metering, 500 m²'),

('Water',
'Is leak detection required?',
'Yes. Leak detection with alert capability is required for major water installations and wet areas.',
'leak detection, water');

-- =====================================================
-- CONSTRUCTION & WASTE
-- =====================================================

INSERT INTO knowledge_base (category, question, answer, keywords) VALUES
('Construction',
'What waste diversion target applies to major fit-outs?',
'Major fit-outs must target at least 75% diversion of construction waste from landfill by weight.',
'waste diversion, 75%'),

('Construction',
'What waste streams must be segregated?',
'Clean timber, metal, concrete, gypsum board, plastics, cardboard, e-waste, hazardous waste and general refuse.',
'waste segregation, timber, metal, e-waste'),

('Construction',
'Can contractors work outside approved hours?',
'No. All works must be carried out within approved working hours.',
'working hours, approved hours');

-- =====================================================
-- HANDOVER
-- =====================================================

INSERT INTO knowledge_base (category, question, answer, keywords) VALUES
('Handover',
'What documents are required for handover?',
'As-built drawings, O&M manuals, BIM deliverables, meter schedules and the Green Completion Pack.',
'handover documents, as-built, O&M, BIM'),

('Handover',
'What is included in the Green Completion Pack?',
'Energy records, carbon information, materials register, IAQ evidence where required, and waste management records.',
'Green Completion Pack, energy, carbon, IAQ, waste'),

('Handover',
'When can the fit-out deposit be released?',
'After joint inspection, defect clearance and submission of all required close-out documents.',
'deposit release, close-out documents');

-- =====================================================
-- OCCUPATION
-- =====================================================

INSERT INTO knowledge_base (category, question, answer, keywords) VALUES
('Occupation',
'Can the premises be occupied immediately after construction?',
'No. Occupation is only allowed after the required Occupation Permit or Temporary Occupation Permit has been obtained where applicable.',
'occupation permit, TOP'),

('Occupation',
'What operational sustainability obligations apply during the lease?',
'The tenant must share ESG data, maintain energy and water systems, participate in Green Lease reviews, and keep the Sustainability Liaison Officer information current.',
'ESG data, Green Lease, SLO');

-- =====================================================
-- REINSTATEMENT
-- =====================================================

INSERT INTO knowledge_base (category, question, answer, keywords) VALUES
('Reinstatement',
'What must be submitted before lease expiry?',
'A Reinstatement Circular Design Plan showing elements for retention, donation, resale or recycling.',
'reinstatement plan, lease expiry'),

('Reinstatement',
'When is the reinstatement deposit released?',
'After final inspection, waste diversion verification and completion of all reinstatement requirements.',
'reinstatement deposit, final inspection');

-- =====================================================
-- F&B REQUIREMENTS
-- =====================================================

INSERT INTO knowledge_base (category, question, answer, keywords) VALUES
('F&B',
'What lighting power budget applies to restaurants and cafes?',
'Restaurants, cafes, lounges and bars must not exceed 5 W/m².',
'restaurant lighting, cafe lighting, 5 W/m²'),

('F&B',
'What additional approvals may be required for F&B premises?',
'SCDF, NEA, PUB and other authority approvals may be required depending on the proposed kitchen and operational scope.',
'F&B approvals, SCDF, NEA, PUB');

-- =====================================================
-- SEARCH INDEX
-- =====================================================

CREATE INDEX idx_kb_category ON knowledge_base(category);
CREATE INDEX idx_kb_keywords ON knowledge_base(keywords);
CREATE INDEX idx_kb_question ON knowledge_base(question);