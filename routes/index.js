import express from 'express'
import { WorkOS } from '@workos-inc/node'

const router = express.Router()

const workos = new WorkOS(process.env.WORKOS_API_KEY)
const clientID = process.env.WORKOS_CLIENT_ID
const organizationID = process.env.WORKOS_ORGANIZATION_ID || 'org_test_idp'
const redirectURI = 'http://localhost:8000/callback'

// Simple in-memory session state (demo only)
const ssoSession = {
    isloggedin: false,
    first_name: null,
    profile: null,
}

// ── SSO Routes ────────────────────────────────────────────────────────────────

router.get('/', (req, res) => {
    if (ssoSession.isloggedin) {
        res.render('login_successful.ejs', {
            profile: ssoSession.profile,
            first_name: ssoSession.first_name,
        })
    } else {
        res.render('index.ejs', { title: 'Home' })
    }
})

router.post('/login', (req, res) => {
    const login_type = req.body.login_method

    const params = {
        clientID,
        redirectURI,
        state: '',
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
        res.render('error.ejs', { error })
    }
})

router.get('/callback', async (req, res) => {
    let errorMessage
    try {
        const { code, error } = req.query

        if (error) {
            errorMessage = `Redirect callback error: ${error}`
        } else {
            const profile = await workos.sso.getProfileAndToken({ code, clientID })
            const json_profile = JSON.stringify(profile, null, 4)

            ssoSession.first_name = profile.profile.first_name
            ssoSession.profile = json_profile
            ssoSession.isloggedin = true
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

router.get('/logout', (req, res) => {
    ssoSession.first_name = null
    ssoSession.profile = null
    ssoSession.isloggedin = false
    res.redirect('/')
})

// ── Directory Sync Routes ─────────────────────────────────────────────────────

router.get('/directories', async (req, res) => {
    const before = req.query.before
    const after = req.query.after

    const directories = await workos.directorySync.listDirectories({
        limit: 5,
        before,
        after,
        order: null,
    })

    res.render('directories.ejs', {
        title: 'Directories',
        directories: directories.data,
        before: directories.listMetadata.before,
        after: directories.listMetadata.after,
    })
})

router.get('/directory', async (req, res) => {
    const directories = await workos.directorySync.listDirectories()
    const directory = directories.data.find((d) => d.id === req.query.id)
    res.render('directory.ejs', { directory, title: 'Directory' })
})

router.get('/users', async (req, res) => {
    const users = await workos.directorySync.listUsers({
        directory: req.query.id,
        limit: 100,
    })
    res.render('users.ejs', { users: users.data })
})

router.get('/groups', async (req, res) => {
    const groups = await workos.directorySync.listGroups({
        directory: req.query.id,
        limit: 100,
    })
    res.render('groups.ejs', { groups: groups.data })
})

router.get('/webhooks', (req, res) => {
    res.render('webhooks.ejs', { title: 'Webhooks' })
})

router.post('/webhooks', (req, res) => {
    const webhook = workos.webhooks.constructEvent({
        payload: req.body,
        sigHeader: req.headers['workos-signature'],
        secret: process.env.WORKOS_WEBHOOK_SECRET,
        tolerance: 90000,
    })
    req.io.emit('webhook event', { webhook })
    res.sendStatus(200)
})

export default router
