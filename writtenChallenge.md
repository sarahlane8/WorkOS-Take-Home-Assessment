## Question 1

Hi there,

I’m setting up SSO for an external service provider we use called SparkNova, and I’m trying to configure WorkOS to act as our Identity Provider (IdP) in the SAML flow. I’ve looked through the docs but wasn’t able to find how to retrieve the IdP metadata XML from WorkOS.

Can you point me to the right documentation for using WorkOS as our IdP?

Thanks,  
Mark


---

Hi Mark — great question!

WorkOS does not currently support acting as a SAML Identity Provider (IdP). WorkOS functions as a Service Provider (SP) in SAML flows, meaning it connects your application to external IdPs rather than serving as one itself.

Because of this, WorkOS does not generate IdP metadata XML.

If SparkNova requires your organization to act as the IdP, you’ll need to configure the SAML connection through an identity provider such as Okta or Microsoft Entra ID, which can provide the required IdP metadata XML.

For more detail on how WorkOS operates in SAML flows, this documentation may be helpful:  
https://workos.com/docs/sso/saml-security/sp-to-idp-security-features

Please let me know if you’d like help thinking through the architecture — happy to assist.

Best,  
Sarah L  
Developer Success Engineer

---
## Question 2
Hi! I need a way to pass custom, arbitrary data through the authentication flow - something like an identifier I can use after the user has authenticated.

Is there a way to include this kind of data in the redirect or auth request? If so, can you show me how to set it up?

Thanks!
Julia

---

Hi Julia!

Yes — you can pass custom, arbitrary data through the authentication flow by using the `state` parameter when generating your authorization URL.

### How It Works

When you start an SSO or AuthKit authentication request with WorkOS, you generate a URL using one of the SDK methods (such as `sso.getAuthorizationUrl()` or `userManagement.getAuthorizationUrl()`).

These methods accept an optional `state` field that lets you include any string-encoded data you need — for example:

- A user’s originating path
- An internal identifier
- Any other context your app needs after authentication

That same `state` value will be sent back to your callback URL after the user signs in.


### Example (Node.js)

```js
const authUrl = workos.sso.getAuthorizationUrl({
  clientId: 'client_123456789',
  connection: 'conn_example123',
  redirectUri: 'https://your-app.com/callback',
  state: JSON.stringify({
    myCustomId: 'abc123',
    returnTo: '/dashboard'
  }),
});
```

After the user authenticates, WorkOS will redirect back to your redirectUri like this:

```
https://your-app.com/callback?code=...&state=%7B%22myCustomId%22%3A%22abc123%22%2C%22returnTo%22%3A%22%2Fdashboard%22%7D
```

You can then parse the state parameter in your callback handler to retrieve your custom data.

For more detail on authorization flows, this documentation may be helpful: https://workos.com/docs/reference/sso/get-authorization-url

Let me know if you'd like an example of how to parse and validate the state value in your callback — happy to help.

Best,
Sarah L
Developer Success Engineer