# soul-os-docs

Documentation site for Soul OS, built with Vite + React on the frontend and a small Express server for production hosting.

The published docs at [docs.soul-os.cc](https://docs.soul-os.cc) currently cover:

- **Soul-OS overview**: multi-agent cognitive ecosystem vision, shared memory model, and milestone progress
- **Current architecture**: frontend/worker, MindBridge API, D1 data stores, and cognitive pipeline stages
- **API reference**: chat, memory, agent, and system endpoints, with authentication and integration examples
- **Ops**: internal operational tooling such as the Daily Agent Digest

## Prerequisites

- Node.js ^20.19.0 or >=22.12.0
- pnpm 10.4.1 (via Corepack)

## Getting Started

```bash
corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm install
```

## Development

```bash
pnpm dev
```

## Build and Run

```bash
pnpm build
pnpm start
```

## Quality Checks

```bash
pnpm check
pnpm format
```
