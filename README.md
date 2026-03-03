# Sarah Lane's Take Home Assessment 
Technical WorkOS SSO + Directory Sync Example App

A Node.js application demonstrating [Single Sign-On (SSO)](https://workos.com/docs/sso) and [Directory Sync](https://workos.com/docs/directory-sync) using the [WorkOS Node SDK](https://github.com/workos-inc/workos-node).

## Prerequisites

- [Node.js](https://nodejs.org/) v16+
- A [WorkOS account](https://dashboard.workos.com/) with an organization, SSO connection, and Directory Sync connection configured
- An Okta account with a SAML app and SCIM provisioning app set up

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sarahlane8/WorkOS-Take-Home-Assessment.git
cd WorkOS-Take-Home-Assessment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project with the following keys:

```
WORKOS_API_KEY=<workos_api_key>
WORKOS_CLIENT_ID=<workos_client_id>
WORKOS_ORGANIZATION_ID=<workos_organization_id>
```
*Please contact me for actual values.

### 4. Start the server

```bash
npm start
```

The app will be running at [http://localhost:8000](http://localhost:8000).

## Features

### SSO
Click **Enterprise SAML** on the home screen to log in via your Okta SAML connection. On successful authentication, your WorkOS profile details are displayed.

### Directory Sync
After logging in, click the **Directory** button to browse your synced directories. From there you can view the **Users** and **Groups** provisioned from Okta via SCIM.

## Demo


## Useful Links

- [WorkOS SSO Docs](https://workos.com/docs/sso)
- [WorkOS Directory Sync Docs](https://workos.com/docs/directory-sync)
- [WorkOS Node SDK](https://github.com/workos-inc/workos-node)
- [API Reference](https://workos.com/docs/reference)

## Reflections, Learnings, and Opportunities for Improvement

### What I Learned

Through completing this assessment, I gained a deeper understanding of:

- **[Product/SDK/API concept you worked with]** — particularly how [specific mechanism] works in practice.
- The nuances of **[authentication flow / directory sync / webhook handling / OAuth / etc.]**, especially around [edge case, config detail, error state, etc.].
- How small configuration mismatches (e.g., [redirect URIs, environment variables, org IDs]) can produce errors that are not always immediately obvious.
- The importance of carefully reviewing API responses and logs to debug integration issues effectively.

This exercise also strengthened my appreciation for the developer experience from the customer’s perspective — especially how critical clear documentation, helpful error messaging, and predictable flows are when integrating identity products.

---

### Technical Challenges Encountered

Some challenges I ran into included:

- **[Specific error or blocker]**
- **[Environment/config issue]**
- **[Understanding a specific flow or lifecycle]**

In particular, I spent time troubleshooting **[error message]**, which helped me better understand how [system behavior] works and where guardrails are enforced.

---

### Known Limitations in My Implementation

Due to time constraints and scope, the current implementation has a few limitations:

- Limited validation and error handling around [webhook payloads, token expiration, session management].
- Minimal UI/UX handling (focused primarily on functionality over polish).
- Hardcoded values such as [org ID, connection ID, redirect URI] that would ideally be parameterized or environment-driven.
- No automated tests for [specific flow or logic].

These were intentional trade-offs to prioritize demonstrating core functionality.

---

### If I Had More Time

With additional time, I would improve the implementation by:

- Adding more robust error handling and user-friendly messaging.
- Refactoring configuration to improve flexibility and maintainability.
- Adding logging to better trace authentication and provisioning flows.
- Writing unit and/or integration tests for critical paths.
- Improving documentation for future developers onboarding to this project.
- Exploring edge cases such as:
  - Expired sessions  
  - Invalid tokens  
  - Revoked user access  
  - Multi-organization scenarios  

---

### Developer Experience Observations

From a Developer Success perspective, this exercise reinforced a few themes:

- Clear setup instructions dramatically reduce integration friction.
- Common misconfigurations could potentially be surfaced earlier with improved validation or messaging.
- Providing realistic, end-to-end example repositories is extremely helpful for developers implementing these features for the first time.