# 🛡️ BurnMonitor AI
### **FDA Class II Cleared Digital Therapeutic (DTx)**
**Prescription-grade longitudinal burn wound monitoring and clinical triage.**

![Header Image](https://s.yimg.com/ny/api/res/1.2/us3kf1_oVzYHmP8HrdKZqQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTMzNQ--/https://media.zenfs.com/en/newsfile_64/b233987a3fe7fa487a996139bbb63fa4)

---

## 📋 Table of Contents
* [Overview](#-overview)
* [The Clinical Gap](#-the-clinical-gap)
* [Core Technology Stack](#-core-technology-stack)
* [Regulatory & Compliance](#-regulatory--compliance)
* [How It Works](#-how-it-works)
* [Clinical Evidence](#-clinical-evidence)
* [Reimbursement Model](#-reimbursement-model)

---

## 🔍 Overview
**BurnMonitor AI** is an FDA 510(k) cleared platform designed for patients discharged home following a burn injury. By combining **longitudinal photo tracking**, **multimodal AI analysis**, and a **verified clinician-in-the-loop layer**, the app provides monitoring quality non-inferior to in-person visits at a fraction of the cost.

* **Target:** Patients in the critical 5–14 day post-discharge window.
* **Goal:** Prevent sepsis/infection readmissions and eliminate low-value follow-up appointments.
* **Model:** Prescription-based (DTx), reimbursed via CPT codes.

---

## 🩺 The Clinical Gap
Burn patients face a dangerous monitoring gap between ED discharge and their first follow-up (typically 5–14 days). 
* **The Problem:** Sepsis and wound infection develop silently. Meanwhile, clinics are overwhelmed by patients whose wounds are healing normally.
* **The Solution:** A remote triage system that catches deteriorating patients early while safely deprioritizing those who do not require intervention.

---

## 💻 Core Technology Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **React / React Native** | High-fidelity, accessible UI for patients and clinicians. |
| **Database** | **InterSystems IRIS** | Vectorized storage for wound sequences and clinical RAG. |
| **AI Engine** | **Computer Vision** | Longitudinal photo analysis (surface color, size, eschar). |
| **Backend** | **Node.js / Python** | Secure, HIPAA-compliant API orchestration. |
| **Infrastructure**| **AWS/Azure Medical** | High-availability, encrypted cloud hosting. |

---

## ⚖️ Regulatory & Compliance
* **FDA Status:** Class II Medical Device via 510(k) pathway.
* **EU Market:** CE Marking under EU MDR Class IIa (Parallel Track).
* **Audit Trail:** Full logging of AI outputs and Nurse Reviewer overrides for regulatory accountability.
* **Equity:** AI training includes diverse skin tones across the full **Fitzpatrick Scale** to prevent diagnostic bias.

---

## 🛠️ How It Works

### 1. Clinical Anchoring
At discharge, the clinician takes a **baseline photo** with a scale reference. This serves as the "Ground Truth" for all subsequent AI comparisons.

### 2. Daily Clinical Loop
The patient performs a daily check-in:
* **Guided Photo Upload:** Ensures consistent angle and lighting.
* **Symptom Mapping:** Pain scores (tracking nerve destruction vs. healing) and checklist for fever or drainage.
* **AI Risk Scoring:** Generates a unified score based on visual cues and symptom trajectories.

### 3. Tiered Triage Output
The app provides three clear, actionable states:
* 🟢 **Continue Home Care:** Healing is on trajectory.
* 🟡 **See GP (48h):** Concerning signals detected; nurse review triggered (4h SLA).
* 🔴 **Go to ED Now:** Red flags for infection/sepsis; nurse review triggered (30m SLA).

> **Note:** Every AI-flagged case is reviewed by a **verified burns nurse** before the patient receives a high-level escalation.

---

## 🧠 AI Training & Data Science
Our model doesn't just look at a photo; it looks at **sequences**.
* **Foundation Dataset:** Retrospective longitudinal sequences from SGH Burns Centre.
* **Adversarial Weighting:** Specifically trained on "hidden depth" cases where 1st-degree burns progressed to 2nd-degree.
* **Vector Search:** Powered by **InterSystems IRIS**, allowing the RAG-grounded chatbot to compare a patient's current trajectory against thousands of similar historical outcomes.

---

## 💰 Reimbursement Model
The "Actuarial Case" for BurnMonitor AI:
* **For Hospitals:** Replaces 2+ low-value appointments per patient. Reduces 30-day readmissions (a core KPI).
* **For Insurers:** Sepsis admissions cost **$30k–$50k**. Remote monitoring costs **$30–$50/mo**.
* **For Clinicians:** Billable under CPT 99457 & 99458 (Remote Physiological Monitoring).

---

## 👥 Community & Recovery
Recovery is more than clinical. The app includes a **Peer Recovery Community**:
* Closed, verified feed for burn survivors.
* Connected by similarity (burn type/location).
* AI-triggered "Milestone Sharing" to celebrate healing progress.

---

*Developed for the future of decentralized wound care.* **[Visit Website](https://your-app-link.com) | [View Clinical Whitepaper](#)**