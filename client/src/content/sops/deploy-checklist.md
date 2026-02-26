# Deploy Checklist SOP

## Purpose

Ensure every deployment to a Soul-OS production service is safe, reversible, and communicated
to the team before and after it goes live.

## Scope

- **harbz07/mindbridge-mcp** — Cloudflare Worker + D1 migrations
- **harbz07/mindbridge-router** — Wernicke routing worker
- **harbz07/cerebral-sdk-prototype** — npm package publish
- **harbz07/SoulSpace** — Front-end Cloudflare worker
- **harbz07/soul-os-docs** — Docs site (this repo)

## Pre-Deploy Checklist

- [ ] All CI checks green on the target branch.
- [ ] Changelog entry written (even one line is fine).
- [ ] No environment secrets committed — run `git log -p | grep -i 'token\|secret\|webhook'`.
- [ ] DB migrations reviewed if schema changes are present.
- [ ] Feature flags set correctly (if applicable).
- [ ] Rollback plan noted (previous wrangler deploy hash or git ref).

## Deploy Steps

### Cloudflare Worker

```bash
# 1. Authenticate (skip if already logged in)
wrangler login

# 2. Deploy
wrangler deploy --env production

# 3. Verify health endpoint
curl https://<worker-subdomain>.workers.dev/health
```

### D1 Migrations

```bash
wrangler d1 migrations apply DB --env production
```

> ⚠️ Migrations are irreversible on D1. Always test on a staging environment first.

### npm Package

```bash
pnpm version patch  # or minor/major
pnpm publish --access public
```

## Post-Deploy Checklist

- [ ] Smoke test: send a test request and verify the response.
- [ ] Monitor `#incidents` Discord channel for 10 minutes.
- [ ] Update `last_deployed` in the relevant repo's README or CHANGELOG.
- [ ] Close the deploy ticket / GitHub issue if one was open.

## Rollback Procedure

1. Identify the last known-good deployment hash from `wrangler deployments list`.
2. Run `wrangler rollback <deployment-id>`.
3. For npm packages, yank the bad version: `npm deprecate package@bad-version "rolled back"`.

## Maintenance Agent Integration

> **Convention for maintenance agents:** To propose updates to this SOP, open a PR against
> `harbz07/soul-os-docs` targeting `main` with the file path
> `client/src/content/sops/deploy-checklist.md`. Include `[sop-update]` in the PR title.

## Related Links

- [Cloudflare Workers Dashboard](https://dash.cloudflare.com)
- [mindbridge-mcp](https://github.com/harbz07/mindbridge-mcp)
- [mindbridge-router](https://github.com/harbz07/mindbridge-router)
