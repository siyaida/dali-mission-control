# Netlify Setup Guide

## Quick Setup (5 commands, ~3 minutes)

```bash
# 1. Install CLI
npm install -g netlify-cli

# 2. Authenticate (opens browser)
netlify login

# 3. Link this repo to Netlify
# From repo root:
netlify init
# → "Create & configure a new site" → Yes
# → Pick your team
# → Site name: dali-mission-control
# → Build command: (auto-detected from netlify.toml)
# → Publish directory: docs

# 4. Verify
netlify status
netlify open  # opens the live URL in browser
```

## What This Does

- Netlify auto-installs the GitHub App on your repo
- Every push to `main` triggers an automatic deploy
- No shared tokens needed — GitHub App handles auth
- Custom domains: add via Netlify UI → Domain Settings

## Token Fallback (if GitHub App is blocked)

If `netlify init` fails due to org policy:

1. Go to Netlify UI → User Settings → Applications → Personal access tokens
2. Create a scoped token
3. Add as GitHub repo secret: `NETLIFY_AUTH_TOKEN`
4. The `.github/workflows/netlify-deploy.yml` fallback handles the rest

See `TOKEN-FALLBACK.md` for full details.