import express from 'express'
import session from 'express-session'
import { WorkOS } from '@workos-inc/node'

const app = express()
const router = express.Router()

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
)

const workos = new WorkOS(process.env.WORKOS_API_KEY)
const clientID = process.env.WORKOS_CLIENT_ID
const organizationID = 'org_test_idp'
const redirectURI = 'http://localhost:8000/callback'
const state = ''

app.get('/auth', (_req, res) => {
  // Second Test Organization
  const organization = "org_01KJQNKN0M2ZTV63NNACBM43ZH"

  // The callback URI WorkOS should redirect to after the authentication
//   const redirectUri = 'https://dashboard.my-app.com';
  const redirectUri = redirectURI;

  const authorizationUrl = workos.sso.getAuthorizationUrl({
    organization,
    redirectUri,
    clientID,
  });

  res.redirect(authorizationUrl);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;

  const { profile } = await workos.sso.getProfileAndToken({
    code,
    clientID,
  });

    const organization = "org_01KJQNKN0M2ZTV63NNACBM43ZH"

  // Validate that this profile belongs to the organization used for authentication
  if (profile.organizationId !== organization) {
    return res.status(401).send({
      message: 'Unauthorized',
    });
  }
  res.redirect('/');
});

router.get('/', function (req, res) {
    if (session.isloggedin) {
        res.render('login_successful.ejs', {
            profile: session.profile,
            first_name: session.first_name,
        })
    } else {
        res.render('index.ejs', { title: 'Home' })
    }
})

router.post('/login', (req, res) => {
    const login_type = req.body.login_method

    const params = {
        clientID: clientID,
        redirectURI: redirectURI,
        state: state,
    }

    if (login_type === 'saml') {
        params.organization = organizationID
    } else {
        params.provider = login_type
    }

    try {
        const url = workos.sso.getAuthorizationURL(params)

        res.redirect(url)
    } catch (error) {
        res.render('error.ejs', { error: error })
    }
})

router.get('/callback', async (req, res) => {
    let errorMessage
    try {
        const { code, error } = req.query

        if (error) {
            errorMessage = `Redirect callback error: ${error}`
        } else {
            const profile = await workos.sso.getProfileAndToken({
                code,
                clientID,
            })
            const json_profile = JSON.stringify(profile, null, 4)

            session.first_name = profile.profile.first_name
            session.profile = json_profile
            session.isloggedin = true
        }
    } catch (error) {
        errorMessage = `Error exchanging code for profile: ${error}`
    }

    if (errorMessage) {
        res.render('error.ejs', { error: errorMessage })
    } else {
        res.redirect('/')
    }
})

router.get('/logout', async (req, res) => {
    try {
        session.first_name = null
        session.profile = null
        session.isloggedin = null

        res.redirect('/')
    } catch (error) {
        res.render('error.ejs', { error: error })
    }
})

export default router
