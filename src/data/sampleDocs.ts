import { SampleDocument } from "../types";

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    id: "tech-ai-report",
    title: "State of Enterprise AI 2026",
    category: "Technical Report",
    description: "Multi-page market and research report on generative AI integration in enterprise workflows.",
    type: "text",
    previewName: "enterprise_ai_analysis_2026.pdf",
    content: `State of Enterprise Artificial Intelligence 2026: Comprehensive Executive Briefing

Executive Summary:
In 2026, enterprise adoption of multimodal generative intelligence has transitioned from exploratory pilot programs to core mission-critical infrastructure. Organizations adopting agentic automation report an average 34% reduction in document review cycles and a 42% acceleration in compliance auditing.

Key Findings & Industry Metrics:
1. Operational Efficiency: Autonomous document analysis pipelines currently handle over 68% of routine invoice validation, contract cross-referencing, and regulatory filing reviews.
2. Latency & Reliability: Average turnaround time for high-volume multimodal document processing dropped from 4.5 minutes to under 8 seconds with the rollout of 3rd-generation inference processors.
3. Governance & Privacy: 91% of Fortune 500 Chief Information Officers mandate strict on-premise or sovereign VPC data containment, rejecting public telemetry logging for proprietary intellectual property.
4. Multimodal OCR Advancements: Vision-language architectures now demonstrate a 99.4% precision rate on degraded scanned historical records, multi-column academic layouts, and handwritten medical annotations.

Strategic Recommendations for Q3/Q4:
- Consolidate legacy disjointed OCR tools into unified multimodal summarization and extraction pipelines.
- Implement automated verification checkpoints where human subject matter experts validate low-confidence anomalies.
- Mandate accessibility-first UI interfaces for internal analysts, ensuring WCAG 2.2 AAA compliance, audio synthesis readouts, and high-contrast dashboards.`,
  },
  {
    id: "clinical-trial-notes",
    title: "Clinical Trial Patient Progress Summary",
    category: "Healthcare",
    description: "Medical trial summary document with patient baseline metrics, treatment dosages, and observations.",
    type: "text",
    previewName: "patient_protocol_eval_card.pdf",
    content: `Patient Cohort Study: Phase II Protocol Alpha-94
Investigator: Dr. Helen Thorne, MD | Department of Clinical Immunology

Patient Identifier: PT-84920
Age: 58 | Sex: Female | Baseline Score: 62/100
Primary Condition: Chronic Refractory Neuro-Inflammatory Fatigue

Dosage Protocol & Observations:
- Week 1-4: Oral bio-peptide formulation (15mg daily morning administration).
- Observations: Mild transient cephalalgia reported during initial 48 hours; resolved spontaneously without intervention.
- Week 5-8: Dose escalation to 30mg daily with bi-weekly serum biomarker monitoring.
- Laboratory Markers: CRP levels decreased by 47.8% (from 8.2 mg/L down to 4.3 mg/L). Platelet counts remained within safe physiological boundaries (240 x 10^9/L).
- Week 9-12: Full therapeutic stabilization. Patient reported improved cognitive clarity and a 60% subjective reduction in fatigue interference during routine physical tasks.

Conclusions & Next Steps:
The protocol demonstrated excellent tolerability with notable anti-inflammatory efficacy. The study committee recommends progression to Phase III expansion with 400 multicenter subjects. Continue monthly follow-up evaluations.`,
  },
  {
    id: "legal-contract-brief",
    title: "Service Level & Vendor Master Agreement",
    category: "Legal & Compliance",
    description: "Standard Master Services Agreement covering uptime, liability limits, and termination clauses.",
    type: "text",
    previewName: "vendor_master_sla_agreement.pdf",
    content: `MASTER SERVICES & SYSTEM LEVEL AGREEMENT (SLA)

BETWEEN: Apex Cloud Systems Inc. ("Provider") AND Meridian Global Logistics LLC ("Client")
Effective Date: January 15, 2026

Section 1: Service Availability & Uptime Guarantee
Provider covenants that the cloud services shall maintain a Monthly Uptime Percentage of no less than 99.95% during each billing cycle, excluding scheduled maintenance windows announced at least 72 hours in advance.

Section 2: Service Credits for Outages
If Monthly Uptime falls below 99.95% but above 99.0%, Client is entitled to a 10% credit of the monthly subscription fee. Outages exceeding 99.0% threshold trigger a 30% financial credit applied against subsequent invoice statements.

Section 3: Data Security & Incident Notification
Provider shall maintain SOC-2 Type II, ISO 27001, and HIPAA compliance certifications. In the event of a confirmed cybersecurity breach or unauthorized data exfiltration, Provider must notify Client in writing within twenty-four (24) hours of discovery.

Section 4: Limitation of Liability
Neither party shall be liable for indirect, incidental, or consequential damages. Aggregate liability under this Agreement shall not exceed the total fees paid by Client during the preceding twelve (12) months.

Section 5: Termination for Cause
Either party may terminate this Agreement immediately upon written notice if the other party breaches any material term and fails to cure such breach within thirty (30) days of receipt of written notification.`,
  },
];
