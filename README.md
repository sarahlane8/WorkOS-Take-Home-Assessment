# Sarah Lane's Take Home Assessment 

A Node.js application demonstrating [Single Sign-On (SSO)](https://workos.com/docs/sso) and [Directory Sync](https://workos.com/docs/directory-sync).

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
*Please contact me for actual values or use your own from the [WorkOS Dashboard](https://dashboard.workos.com/) if you created your own accounts/applications.*

### 4. Start the server

```bash
npm start
```

The app will be running at [http://localhost:8000](http://localhost:8000).

## Features

### SSO
Click **Enterprise SAML** on the home screen to log in via your Okta SAML connection. Upon successful authentication, your WorkOS profile details are displayed.

### Directory Sync
After logging in, click the **Directory** button to browse your synced directory. From there, select your directory row to view the **Users** and **Groups** provisioned from Okta via SCIM.

## Demo
![demo](https://github.com/user-attachments/assets/a0d6cec7-99ed-44a2-bc7d-b14883b64b05)

## Useful Links

- [WorkOS SSO Docs](https://workos.com/docs/sso)
- [WorkOS Directory Sync Docs](https://workos.com/docs/directory-sync)
- [API Reference](https://workos.com/docs/reference)

## Reflections, Learnings, and Opportunities for Improvement

### What I Learned

Through completing this assessment, I gained a deeper understanding of:

- SAML authentication flows and how attribute mapping impacts successful login.

- The nuances of Directory Sync and SCIM provisioning, particularly how directory attributes must be correctly configured for user data to display as expected.

- How small configuration mismatches (e.g., redirect URIs, environment variables, organization IDs, or attribute mappings) can produce errors that are not always immediately obvious.

- The importance of carefully reviewing API responses, logs, and dashboard configuration settings to debug integration issues effectively.

This exercise also strengthened my appreciation for the developer experience from the customer’s perspective — especially how critical clear documentation, helpful error messaging, and predictable flows are when integrating identity products.

---

### Technical Challenges Encountered

One of the primary challenges I encountered involved SAML authentication.

Initially, clicking the Enterprise SAML button did not automatically authenticate me as expected. Instead, I was redirected to the Test Identity Provider form. After troubleshooting, I determined that the issue stemmed from incorrect attribute mappings in my SAML configuration.

Once the attribute mappings were corrected, I was able to successfully complete the SSO login flow.

This experience reinforced how sensitive SAML integrations can be to configuration details, and how important precise attribute mapping is to a smooth authentication experience.

---

### Known Limitations in My Implementation

Due to time constraints and scope, the current implementation has a few limitations:

- The Users directory does not display users' email addresses in the appropriate column. This appears to be due to an initial attribute mapping configuration issue. While I attempted to update the mapping, I was unable to resolve it fully within the allotted time.

- A back button from the directory view would improve usability and navigation.

These were intentional trade-offs to prioritize demonstrating core functionality.

---

### Developer Experience Observations

From a Developer Success perspective, this exercise reinforced a few themes:

- Clear setup instructions dramatically reduce integration friction.

- Attribute mapping and configuration validation are common areas where developers may encounter issues.

- Providing realistic, end-to-end example repositories is extremely helpful for developers implementing these features for the first time.
