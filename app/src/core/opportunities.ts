// 4YOS Opportunity & Economic Bridge Engine
// Section 20.2 Engine 4: Real-world Nigerian practical briefs, freelance ladders, and SIWES placement assets.

export interface PracticalOpportunity {
  id: string;
  title: string;
  level: 100 | 200 | 300 | 400;
  category: 'fintech' | 'data' | 'systems' | 'security' | 'commercial';
  description: string;
  realWorldScenario: string;
  prerequisiteCourses: string[];
  estimatedEarningNaira?: string;
  deliverable: string;
  verificationMethod: 'automated_tests' | 'schema_validator' | 'systems_viva';
}

export const PRACTICAL_OPPORTUNITIES: PracticalOpportunity[] = [
  {
    id: 'pos-float-audit',
    title: 'POS Terminal Float & Cash Reconciliation Engine',
    level: 100,
    category: 'fintech',
    description: 'Build an automated reconciliation script for agency banking operators managing daily float across Moniepoint and OPay terminals.',
    realWorldScenario: 'A neighborhood POS agent handles ₦850,000 cash daily. Withdrawals, card transfers, network reversals, and ₦100 agent fees must balance with zero discrepancy at close of business.',
    prerequisiteCourses: ['programming-1'],
    estimatedEarningNaira: '₦25,000 – ₦50,000 per local business client',
    deliverable: 'Authoritative script processing daily transactions in integer kobo and generating a discrepancy audit summary.',
    verificationMethod: 'automated_tests',
  },
  {
    id: 'sta-fare-dispersion-v1',
    title: 'Commuter Fare Dispersion & Inflation Audit Engine',
    level: 100,
    category: 'data',
    description: 'Compute mean, median, quartiles and IQR for commercial transit fares and market commodity prices in Nigerian urban centers, isolating extreme price spikes.',
    realWorldScenario: 'An urban transport union needs to audit bus and keke fare changes along Lagos-Ikorodu and PH-Aba road corridors, detecting price-gouging outliers without distorting typical commuter costs.',
    prerequisiteCourses: ['describing-data'],
    estimatedEarningNaira: '₦35,000 – ₦70,000 per route analysis',
    deliverable: 'Statistical audit module computing robust quartiles, identifying outliers, and generating clear commuter handover memos.',
    verificationMethod: 'automated_tests',
  },
  {
    id: 'mth-set-partition-v1',
    title: 'Engineering Team Skills Partition & Deductive Verification',
    level: 100,
    category: 'systems',
    description: 'Calculate disjoint set partitions, Inclusion-Exclusion headcounts, and propositional logic contrapositives for engineering team certifications.',
    realWorldScenario: 'A Nigerian software hub in Yaba audits 24 developers across backend review and penetration testing roles. They must eliminate double-counting and verify compliance with regulatory dual-certification rules.',
    prerequisiteCourses: ['sets-logic-proof'],
    estimatedEarningNaira: '₦40,000 – ₦80,000 per audit report',
    deliverable: 'Discrete mathematics module computing exact set intersections, disjoint complements, and propositional compliance checks.',
    verificationMethod: 'automated_tests',
  },
  {
    id: 'sme-inventory-sql',
    title: 'Supermarket & Pharmacy Relational Database Schema',
    level: 200,
    category: 'data',
    description: 'Design and deploy a 3NF normalized SQL database managing inventory, supplier batches, expiry dates, and point-of-sale receipts.',
    realWorldScenario: 'A busy pharmacy in Port Harcourt is losing medication to expired batches and untracked staff pilfering. They need automated expiry alerts and low-stock reorder triggers.',
    prerequisiteCourses: ['databases-and-sql', 'data-structures-and-algorithms'],
    estimatedEarningNaira: '₦80,000 – ₦150,000 per deployment',
    deliverable: 'Tested SQL DDL schema with foreign key constraints, triggers on low stock, and view queries for daily profit.',
    verificationMethod: 'schema_validator',
  },
  {
    id: 'micro-lending-risk-model',
    title: 'Micro-Lending Credit Risk Scoring Model',
    level: 200,
    category: 'data',
    description: 'Develop a statistical scoring model evaluating loan default probability for micro-traders based on airtime top-up frequency and utility bills.',
    realWorldScenario: 'A cooperative society lends ₦20,000–₦100,000 to market women at Onitsha Main Market. They need an objective statistical model to reduce bad debt default rates.',
    prerequisiteCourses: ['describing-data', 'probability-1'],
    estimatedEarningNaira: '₦100,000 – ₦250,000 contract',
    deliverable: 'Statistical notebook with logistic regression coefficients, confusion matrix, and calibrated risk score thresholds.',
    verificationMethod: 'automated_tests',
  },
  {
    id: 'ussd-state-machine',
    title: 'USSD Banking Menu & Session State Machine',
    level: 200,
    category: 'systems',
    description: 'Model and build an asynchronous USSD banking state machine supporting 20-second telecom timeouts, PIN masking, and fund transfers.',
    realWorldScenario: 'Simulating *737# or *894# banking menus where unreliable network handshakes cause dropped sessions and multi-step transaction rollbacks.',
    prerequisiteCourses: ['programming-1', 'computer-architecture'],
    estimatedEarningNaira: 'Valuable technical showcase for Fintech engineering interviews',
    deliverable: 'Deterministic state machine in Python/TypeScript handling session expiration and idempotent transaction recovery.',
    verificationMethod: 'automated_tests',
  },
  {
    id: 'solar-telemetry-monitor',
    title: 'Solar Inverter Battery Ah Capacity & Run-Time Monitor',
    level: 100,
    category: 'commercial',
    description: 'Write an energy budgeting calculator estimating battery run-time under varying load profiles during national grid outages.',
    realWorldScenario: 'Calculating actual usable energy for 24V 200Ah tubular deep-cycle batteries under 450W daytime load vs 120W nighttime fan load, preventing over-discharge.',
    prerequisiteCourses: ['how-computers-work', 'numbers-and-algebra'],
    estimatedEarningNaira: '₦20,000 – ₦40,000 consulting fee for solar installations',
    deliverable: 'Interactive formula model outputting safe discharge depth and generator refueling schedules.',
    verificationMethod: 'automated_tests',
  },
  {
    id: 'paystack-webhook-processor',
    title: 'Fault-Tolerant Paystack Webhook Settlement Engine',
    level: 300,
    category: 'fintech',
    description: 'Architect a high-concurrency payment webhook processor with HMAC-SHA512 verification, atomic batch settlement, and outbox SMS dispatch.',
    realWorldScenario: 'High-volume e-commerce store receiving 5,000 concurrent Paystack webhooks during Black Friday, guaranteeing zero duplicate product grants and zero lost receipts.',
    prerequisiteCourses: ['databases-and-sql', 'software-engineering', 'networking'],
    estimatedEarningNaira: 'Standard SIWES & Junior Fintech Backend engineering qualification',
    deliverable: 'Production-ready Worker API route with atomic D1 batch settlement and background reconciliation cron.',
    verificationMethod: 'automated_tests',
  },
  {
    id: 'course-reg-rate-limiter',
    title: 'University Portal Edge Rate Limiter & Concurrency Queue',
    level: 300,
    category: 'systems',
    description: 'Design and simulate an edge token-bucket rate limiter buffering 50,000 concurrent student course registration requests.',
    realWorldScenario: 'Preventing the annual 8:00 AM server crash on university portals when all 100L–400L students hit \"Submit Registration\" at the exact same minute.',
    prerequisiteCourses: ['operating-systems', 'networking', 'distributed-systems'],
    estimatedEarningNaira: 'Top-tier portfolio piece for Cloud / DevOps engineering placements',
    deliverable: 'System design architecture topology and simulated token-bucket rate limiter benchmark.',
    verificationMethod: 'systems_viva',
  },
  {
    id: 'sovereign-degree-capstone',
    title: 'High-Scale Distributed Ledger & Capstone Systems Viva',
    level: 400,
    category: 'systems',
    description: 'Deliver an end-to-end distributed transaction ledger with consistent hashing, partition tolerance, and formal oral viva defense.',
    realWorldScenario: 'Production financial ledger supporting multi-region replication, audit trails, and zero split-brain data corruption under simulated network partition.',
    prerequisiteCourses: ['distributed-systems', 'cloud-computing', 'capstone-project'],
    estimatedEarningNaira: 'Qualifies learner directly for Mid/Senior Software Engineer roles (₦600k – ₦1.8M/mo)',
    deliverable: 'Full production distributed repository with benchmark reports, thesis dissertation, and recorded viva defense transcript.',
    verificationMethod: 'systems_viva',
  },
];
