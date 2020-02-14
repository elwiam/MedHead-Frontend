![MedHead Logo](../../../images/logo.png)
# Architecture Definition Document

# Executive Summary 

This document details the baseline architectures, business proposition, target architecture vision, migration requirements, and provides a gap analysis between the two.

# Purpose

The Architecture Definition document is the deliverable container for the core architectural artifacts created during this project and spans all architecture domains (business, data, application, and technology). It and also examines all relevant states of the architecture (baseline, interim state(s), and target).

The Architecture Definition document is a companion to the Architecture Requirements Specification (yet to be prepared for this project), with a complementary objective:
* The Architecture Definition document provides a qualitative view of the solution and aims to communicate the intent of the architects.
* The Architecture Requirements Specification provides a quantitative view of the solution, stating measurable criteria that must be met during the implementation of the architecture.

_It is suggested that this document reference the various deliverables in the container. For instance, the architecture principles will be documented in an Architecture Principles document and that document referenced here. It may be that this container is implemented using a wiki or as an intranet rather than a text-based document. Even better would be to use a licensed TOGAF tool that captures this output._

_This template shows typical contents of an Architecture Definition document and can be adapted to align with any TOGAF adaptation being implemented._

# Target Audience
This deliverable is intended to be consumed by all individuals involved in the project. It defines a vision and high-level architecture that address the business drivers of the project.
This document, therefore, should act as an input into further stages of elaboration, with new insights back-propagated as revisions to this document.

# Business Context and Drivers

A consortium of four leading companies has come together to consolidate their efforts, data, applications, and roadmaps to develop a next-generation patient-centric platform capable of improving base-line patient care, while also being responsive and capable of real-time, data-driven decision making in emergency situations.

The following organizations bring data specialisation and patient centric expertease in each of the following domains.

| *Organization* | *Specialist Domain* | *Business Motivations* | *Notes* |
| -------------- | ------------------- | ---------------------- | ------- |
| Ursa Major Health | GP Appointment Scheduling | Workflow enhancement around manual integration with other systems | Appointment consolidation and reducing integration issues with hospital appointment systems |
| Jupiter Scheduling | Hospital appointment scheduling | Workflow enhancement around manual integration with other systems | Synergies with other appointment systems and removal of manual integrations with GP scheduling systems |
| Emergency Expert Systems | Real-time hospital recommendations based on bed availability | Data integration and quality required to improve decisions | Reduce rate of poor recommendations by weighing decisions based on the patient's broader medical history. | 
| Schedule Shack (_Being renamed to Schedule Shed_) | Medical staff rosters and scheduling | Workflow enhancement | Currently depends on unreliable manual updates of appointment systems when staff are not available |   

All parties in the consortium intend to reduce duplication of matching capabilities while developing new ones that present opportunities to deliver value to patients through improved integration and data sharing between systems.   

The primary goal of the consolidated project is to evolve a service-based platform that benefits from event streams between systems, enabling decoupled and fault-tolerant single-responsibility services adhering to the [principles](../architecture-principles/) of a deconstructed microservice architecture.

# Target Business Capability Value Chain

The following diagram depicts a target value chain that is expected to be supported on the delivery of the final target state architecture laid out in this document. 

![Value Chain](../../../images/medhead-value-chain.png)

The end goal of delivering value in *patient care* will be 
made possible across the consortium by combining our shared 
strengths to provide a foundation of shared infrastructure supported 
by the combined capability of teams skilled in the patient care business domain. 

This, in turn, will support innovation around patient-centric solutions in line with business
strategy aimed at improving the overall standard of patient care. This foundation is expected 
to support the consortium in providing improved patient care through 
the delivery of its primary daily activities, documented above. 



# Scope and Project Goals

This section's purpose is to outline the architecture for key domains and clarify the scope of this document.

## Architecture in Scope

The following parts of the consortium members architecture are to be considered 
in the scope of this document and the architectural project:

* Business Architecture
* Data and Information Architecture
* Security Architecture
* Technology Architecture
* Systems Architecture pertaining to new systems and integration with partners.
  * Including: Change Management and Runtime Infrastructure

### Sponsors

| *Sponsor* | *Role and Organization* | *Sponsored Outcomes* |
| --------- | -------------- | --------------------- |
| Kara Trace | CIO, Ursa Major Health  | *Near real-time GP systems integration with third-party health care providers* |
| Anika Hansen | CEO, Jupiter Scheduling Inc | *A consolidated domain-driven architecture with secure real-time events flowing between systems* |  
| UK Health Systems Integration Team | Emergency Expert Systems | Data enrichment and access to anonymized hospital and patient data |
| Chris Pike | Lead Enterprise Architect, Schedule Shed | Outage reductions. Standardized event streams and security infrastructure to reduce organizational liability caused by scheduling mistakes |   

#### Architecture out of Scope
  
The following are out of scope concerning this document and the overall project:
* Systems architecture pertaining to legacy and internal solutions which reside outside of the problem domains expressed in the business context and
project aims.

#### Architectural Focal Points of This Document

This document will primarily attempt to maintain a focus on architectural concerns 
relating to business, data, security, technology, and systems for
near and long-term integration.

#### Constraints    

* Existing systems and processes must not be _significantly_ impeded during any phase of the project. 
* The architectural roadmap and guidance feeding into functional requirements must adhere to 
the [NHS Digital Data and Technology Standards Framework](https://digital.nhs.uk/about-nhs-digital/our-work/nhs-digital-data-and-technology-standards/framework)
* _Real_ patient data must at all times remain compliant with European GDPR regulations. 
* Initial phases of the project should aim to produce reusable solution building blocks or patterns for future building 
blocks that adhere to agreed on best practices.

The level of conformance may be relaxed for investigative work such as spikes or prototypes.

#### Limitations

* Patient data confidentiality must be respected, and any prototypes or non-production conformant learning spikes must 
anonymize data or use fabricated data. 


#### Domain Boundaries

The architectural direction is confined to solutions, processes, and systems 
affecting the following domain model, which was elicited from subject matter experts involved in the project.

![High-Level Domain Model elicited from experts](../../../images/domain-model.png)

##### Bounded Contexts

*Patient Information* 

Primary actor and identity context of a patient.

*Medical Specialist Information*

Primary actor and identity context responsible for delivering patient care such as a doctor, nurse, or physiotherapist.

*Medical Provider Management* 

An organization responsible for providing a range of health care to a patient, through affiliated medical specialists.

*Specialism Management* 

Medical capabilities provided by the medical specialists to the medical provider.

*Scheduling Information Management*

Medical specialist short and long-term scheduling of daily activities and availability.

*Appointment Management* 

Patient and medical specialist agreed meetings.

*Roster Management*

A forward-plan for future staffing by a medical provider.

*Patient Medical History Data Management* 

Patient-owned data which is managed by medical centers.


# Baseline Business and Architectural State

The baseline architecture consists of disparate systems targeted at the use cases of specific medical contexts:
* GP surgeries
* Hospitals
* Emergency responders
* State run medical identity management systems
 
 An overview of the current architectural *impact* can be seen below:
 ![Baseline state of with separate systems](../../../images/baseline-systems.png)

The separation of systems and extensive manual workflow effort involved in syrnchronizing relevant information between
systems should provide assistance to emergency services in real-time between hospitals to target:

Appropriate care facilities for a specific case.

Avoiding overwhelming teams at a particular hospital.

For use-case with multiple hospitals, the system should determine where ambulances are directed, based on distance, care requirements, and personnel availability.

This project wishes to promote a consolidated vision across medical applications owned and managed by the 
consortium.

# Target Business and Architectural State
This project aims to deliver a target business state which results in a joint architectural governance function 
across the consortium, through a jointly owned platform and systems management group. This group intends to provide 
benefits from economies of scale and adherence to a strategic roadmap to 
delivering a platform that compromises business agility and time to market, with levels of data security and fault 
tolerance required of institutions in the health care sector.

## Target State Architecture

![Target State Architecture](../../../images/target-state-architecture-vision.png)

The target architecture is broken into four tiers:
* *Client Access via External Networks*

  External clients used by patients and medical staff access the platform through this layer. This tier is composed of physical and logical routes to access the MedHead platform digitally.
Rarely changing and low-risk content may be available via project approved content delivery networks (CDN).

* *Access and Usability Optimized Layer*

This tier provides applications and services which are highly optimized for data access and usability by patients and medical staff.
It is expected that systems attempt to decouple themselves and add fault tolerance by following the microservices 
pattern of a [data per service](https://microservices.io/patterns/data/database-per-service.html). 

* *Real-Time Optimized Emergency Responder Systems*
  
  Systems that are highly optimized for real-time use cases and high levels of fault-tolerance reside here. These are 
  patient safety-critical systems. The project needs early validation for a pattern and *solution building blocks* 
  which can be used to develop highly responsive systems. 

---  
  The area in *RED* within this diagram should be subject to an early proof of concept to derisk solution options and 
  provide confidence to consortium stakeholders. 
---  
* *Eventing and Integration Layer*
  * *Service Mesh*

    Core business capabilities and services will be accessible via a *service mesh* pattern implementation in
the integration layer. This will also provide observability through side-car proxies and service discovery. 

  * *Event Bus and Data Lake*

     All services will be expected to publish core business events on a common event bus, which will also result in event 
 aggregation within an access-optimized data lake. The data lake is intended to allow applications to rebuild data 
 stores based on application history. It also aids in real-time and enables other systems to provide change-reactive behaviors.  

  * *Domain Bounded Services and Capabilities*

    This tier contains core business services separated by operational and domain-driven bounded contexts. Systems at this
tier should follow a *hexagonal/ports and adapters* architecture pattern and be built with interfaces and abstractions, which
make them easy to change with new learnings and business needs. 

Note that the goal of this project is to gradually migrate existing and new capabilities from the silos of member organizations
into a coherent architecture that is a jointly owned platform and systems management group and adheres to its architecture, principles, and standards.


# GAP Matrix

The table below compares the known capabilities of the baseline platform and contrasts this with the intended target state 
architecture.

|               | **TARGET** | *Central Medical History* | *Appointments* | *Staff Scheduling* | *Bed Allocation* | *Data-Driven EMERGENCY RESPONSE* | Eliminated |  
| ------------- | ---------- | ------------------------- | -------------- | ------------------ | ---------------- | -------------------------------- | ---------- | 
| **BASELINE**  |            |                           |                |                    |                  |                                  |            |
| Local City Emergency Responder Hospital Pre-Booking 	✝   |                |                    |                  |                                  |            | 
| Nationwide Emergency Responder Hospital Pre-Booking 	✝✝  |    |   |       |                    |                  |                                  | Missing at the National Level   || 
| Emergency Responder Symptom Based Triage   |    |   |       |                    |                  |                                  | Missing |
| GP Medical History Data Access|  | Consolidated        |                |                    |                  |                                  |            |
| GP Appointments|           |                           |  Consolidated  |                    |                  |                                  |            |
| Hospital Specialist Schedule |   |                     |                |  Consolidated      |                  |                                  |            |
| Hospital Bed Availability    |   |                     |                |                    | Consolidated     |                                  |            |
| Hospital Drug Management     |   |                     |                |                    |                  |                                  |  Missing   |

* ✝ Up to 12 Hospitals with 2000 beds each
* ✝✝ Approximately 2000 hospitals in the UK and approximately 200,000 beds 

## Identified Gaps

### Nationwide Emergency Responder Hospital Pre-Booking

Although the current system provides the capability to search hospital beds at the national level,
only 0.005% (Citation not available) of cases transport patients outside of a district considered to 
be local to the emergency and attending responders. On this basis, any system should be open to extensions 
which support this (e.g., a supporting model), but this is not required in the initial system.

#### Emergency Responder Symptom-Based Triage
The current system takes symptoms and uses this to determine the severity of the emergency.

This is currently deemed out of scope and may continue to be provided by legacy systems.

#### Hospital Drug Management

The current system provides capabilities to track drug inventories and reorder these. These are deemed 
out of scope by project stakeholders and may continue to be delivered using the legacy platform.

# Risks

See the [risk registrar](../risks/) for a breakdown of current known risks.

The primary concern to stakeholders at this time is the Emergency Responder Real Time System, and specifically, its
ability to provide a timely bed allocation, along with one of a list of specialisms (See [Specialism Reference Data](../models/reference-data/specialities)). 

These risks need to be addressed using a proof of concept. See below.
 
# Tailored Architecture

The project will follow the ADM specified in the [Summary Statement of Work](../summary-statement-of-architecture-work/).

# Architecture Principles
The architecture should be built on the principles outlined [Architecture Principles Document](../architecture-principles/) 

Note that these principles also provide leniency for proofs of concepts and learning-related implementations.

# Roadmap

The [Architecture Roadmap](../architecture-roadmap/) demonstrates the 
near and long-term plan for this architectural effort.
 
Prototyping the emergency responder system is considered a
priority. Details can be found in the [Hypothesis for Real-Time Emergency Responder Capability](../hypothesis-emergency-responder)
