![](RackMultipart20220718-1-sfl2p5_html_53560a8f25cbb9f9.jpg)

![Shape1](RackMultipart20220718-1-sfl2p5_html_dbb74786852a1a55.gif)

###

**# DEEP**

###

**## The road to MVP**

###

### Sprint Brief: Sprint 15

Version: 1

Date: 2022/07/15

**Contents**

[1.Background and Overview 3](#_Toc108774495)

[2.Product Backlog 3](#_Toc108774496)

[3.Business Context for next Sprint 4](#_Toc108774497)

[4.Sprint Breakdown 5](#_Toc108774498)

1.

# Background and Overview

Product roadmap location is indicated in orange in the diagram below.

![Shape2](RackMultipart20220718-1-sfl2p5_html_9ea1e40371b2026c.gif)

The next milestone represents approximately 8 sprints. The requirements for the next sprint is driven primarily by the need to reconsider architectural basis for future work and evolution of the platform so that it is fit for MVP purposes.

1.

# Product Backlog

The product backlog in respect of the next milestone is summarised below.

| _Epic_                        | _Description_                                                                                                                          | _Business Context_                                                                                                                                                                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _Architectural Review_        | The review and establishment of an architectural blueprint for the platform&#39;s MVP.                                                 | The platform, in its prototypical form, has garnered sufficient interest in terms of its showcasing to various industry players and is now ready to become operational within the frame of an MVP. The cost benefit of various roadmap options need to be evaluated as a basis for a future development strategy. |
| _Content Management Solution_ | The establishment of requirements, identification of candidate solutions, the evaluation of candidate solutions and its implementation | The platform will require a solution to house technical and user related documents, assuring all users can easily get access.                                                                                                                                                                                     |

|
| _Issue Tracking Solution_ | The establishment of requirements, identification of candidate solutions, the evaluation of candidate solutions and its implementation | The platform will require a solution for users to register issues, requests so that the support organisation is able to follow up and resolve. |
| _DEEP Website_ | The development of a website for DEEP within the frame of the MVP | The platform has to date been marketed largely through word of mouth. An established marketing presence is now required as we move towards an established operational MVP. This will add credibility and professionality to the DEEP endeavour. |
| _Party Model for MVP_ | Establish a core architecture for the management of organisations and persons to service customer on-boarding and EMA Pilot missions. | The platform requires a consistent model for the management and maintenance of parties and the provision of appropriate role based access to them. |
| _Curation for MVP_ | Establish workflows for the maintenance of Assets, TSPs, DMSs. Establish lifecycle management (version management) that supports the temporal referencing of catalogue item state from missions. The binding of party and RBAC model within the curation module; system configuration to baseline catalogue data for customer on-boarding. | The platform requires embedded &quot;Create, Update, Delete&quot; workflow with views, including inter-entity linking. This includes soft-delete, but specifically excludes maturity assessments and curate-check-flow. Versioning is a critical inclusion in the context of regulatory missions when comments and briefing book inclusions make reference to specific versions of the catalogue item. |
| _Missions for EMA pilot_ | Establish workflows for mission maintenance; enable private and shared commenting functionality; provide a basic mission dashboard; provide a means for mission role and team management; provide a means to enable briefing book creation, review and submission; the binding of the RBAC model to the mission&#39;s module; configuration of mission module data for stakeholder on-boarding. | The platform requires the enablement of production level, albeit basic, mission functionality to support the needs of the EMA Pilot. It needs to allow for the simple creation of missions, links to the catalogue, and identification of status. It will specifically exclude all functionality that relates to contracts and IP management as well as finances. |
| _DEEP Website_ | Establish content and overall look and feel; design specific graphics and visuals; register the domain; populate the site and deploy. | DEEP requires a foundational landing portal to gather customers, facilitate contact and support, share whitepapers and have an overall online presence. |

1.

# Business Context for next Sprint

The DEEP concept is now threshold ready for the market. Beta customer onboarding and a pilot with the EMA to engage in a regulatory mission has been planned for 30 November 2022.

An architectural revamp is required in order to determine a roadmap for the MVP&#39;s operational establishment. The architectural revamp will entail the establishment of architectural principles that guide architectural decisions in the building of the platform; Review the solution architecture and paint out the component and connection points that are specifically pertinent to MVP; Making a decision on whether and if so, how Itonics is incorporated in the architecture; Establishing the infrastructure needs to sustain the MVP and planning their implementation; finalising the platform&#39;s handling of multitenancy and building core elements for its implementation.

Preparation needs to start as soon as possible in respect of the installation of a content management as well as an issue tracking solution. Towards this end the establishment of requirements in respect of these two solutions is of high priority to ensure their implementation in time.

DEEP&#39;s marketing machine is gearing up to funnel beta customers and participants in the EMA Pilot. A website is required to focus interested parties on DEEP, its thinking and plans.

1.

# Sprint Breakdown

The following summarises activities scheduled for the sprint. Details can be found in ADO [https://dev.azure.com/digiterragroup/DEEP](https://dev.azure.com/digiterragroup/DEEP).

| _ **Epic** _                                                        | _ **Features/Story** _                                                                                                 | _ **Activities in this sprint** _  | _**Continuity (in following Sprints)**_ |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | --------------------------------------- |
| _Architecture Review_                                               | Establish Architecture Principles                                                                                      | Establish Architecture Principles; | Ends this sprint                        |
| Establish Solution Architecture for MVP                             | Define solution architecture for MVP; Establish Roadmap to MVP;                                                        | Ends this sprint                   |
| Evaluate Itonics as an inclusionary option in solution architecture | Establish Itonics evaluation template; Evaluate Itonics; Establish migration / development plan for Itonics inclusion. | Ends this sprint                   |

|
| Multitenancy | Finalise model; Refactor current multitenancy implementation | Ends this sprint |
|
| Infrastructure Readiness | Establish Infrastructure requirement and identify gaps. | Budget and continue with the implementation of necessary services. |
|
| Account for Authentication Requirements | Establish whether current authentication model is fit for purpose | Plan and implement gap if one exists |
| _Content Management solution_ | Establish candidate solution | Establish requirements | Identify and evaluate candidate solutions, Implement solution |
| _Issue Tracking Solution_ | Establish Candidate solution | Establish requirements | Identify and evaluate candidate solutions, Implement Solution. |
| _DEEP website_ | Establish DEEP Website | Establish content and overall UX/UI; Build specific graphics and visuals as required; Register Domain | Deployment to follow in future sprints |
