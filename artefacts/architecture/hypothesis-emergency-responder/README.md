# Hypothesis for Developing a Proof of Concept for the Real-Time Emergency Responder Subsystem

# Hypothesis Statement

**We believe** that implementing a Proof of Concept for the Real-Time Emergency Responder Subsystem

**For** the MedHead Consortium Enterprise Architecture Team

**Will**
* Increase the quality of emergency treatments and save more lives.
* Achieve user confidence around the simplicity of such a system.

**We will know we have succeeded when we see:**
* That over 90% of emergency cases are derived to the nearest relevant hospital in the network.
* That the average of emergency derivations go from 18.25 minutes (today) to 12.00 minutes (desired value).
* That we get less than 200 millisecond response time maintained under load of up to 800 requests per second, per service instance.
* An implementation which explains which standards it respects and why.
* Instructions to put into production the PoC.
* Implementation completed within the allocated time frame.

# Example Behavior and a Description of the Capability

The Real-Time Emergency Responder Sub-system is intended to receive one or more medical specialisms (See [Specialism Reference Data](../models/reference-data/specialities)) 
and a data store of recent hospital information in order to suggest the nearest hospital with an available bed, which is associated with
    one or more matching specialisations. The location of the emergency incident must also be provided.
    
   For example:
   
   GIVEN that we have three hospitals with
   
   | Hospital | Beds Available  | Specialisations |
   | -------- | --------------  | -------------- |
   | Fred Brooks Hospital | 2 | Cardiology, Immunology |
   | Julia Crusher Hospital | 0 | Cardiology |
   | Beverly Bashir Hospital | 5 | Immunology, Diagnostic Neuropathology |
   
   AND a patient requiring Cardiology care
   
   WHEN asking for Cardiology care AND a the emergency location is near Fred Brooks Hospital
   
   THEN a referral to the Fred Brooks Hospital should be provided
   
   AND an event published to reserve a bed.


# Agreed PoC Requirements

The following requirements were agreed when defining this hypothesis:

* Provide a RESTful API which must keep medical responders informed in real-time about:where they need to go and what they need to do.
* Ensure that any patient data is properly protected. 
* Ensure that your PoC is fully tested with automation tests reflecting the Testing Pyramid (unit, integration, acceptance, and E2E tests) and with stress tests to provide confidence of business continuity in high volume situations.
* Ensure that the PoC can be easily integrated into future development: make the code easily shareable, provide continuous integration and continuous delivery (CI/CD) pipelines and document your testing strategy.
* Ensure that subsequent development teams after this PoC will be able to use it as a group of building blocks for further modules.

# Methodology

The resulting documentation and PoC will be presented to members of the Board of Trustees to describe lessons learned from the PoC.
Reports form CI/CD methods will be presented to technical staff to demonstrate version updates.

