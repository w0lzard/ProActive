# Deployment Guide

## Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

### 3. Initialize the local database
```bash
npm run d1:migrate:local
```

### 4. Start the development server
```bash
npm run dev
```

Open http://localhost:3000

---

## Cloudflare Deployment

### 1. Login to Cloudflare
```bash
npx wrangler login
```

### 2. Create D1 database (first time only)
```bash
npm run d1:create
```

Copy the returned `database_id` and update it in `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "proactive-db"
database_id = "your-database-id-here"
```

### 3. Run database migrations
```bash
npm run d1:migrate
```

### 4. Set production secrets
```bash
npx wrangler secret put NEXTAUTH_SECRET
npx wrangler secret put NEXTAUTH_URL
```

Enter values when prompted:
- `NEXTAUTH_SECRET`: A secure random string (use `openssl rand -base64 32`)
- `NEXTAUTH_URL`: Your production URL (e.g., `https://your-app.pages.dev`)

### 5. Deploy
```bash
npm run deploy
```

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Create production build |
| `npm run lint` | Run ESLint checks |
| `npm run preview` | Preview Cloudflare build locally |
| `npm run deploy` | Deploy to Cloudflare Pages |
| `npm run d1:create` | Create new D1 database |
| `npm run d1:migrate` | Run migrations on production DB |
| `npm run d1:migrate:local` | Run migrations on local DB |

---

## Troubleshooting

### JWT/Session errors after restart
Clear browser cookies for localhost and login again. This happens when `NEXTAUTH_SECRET` changes.

### Database not found errors
Run `npm run d1:migrate:local` to initialize the local database.

### Build fails with type errors
Run `npm run lint` to check for issues, then `npm run build` to verify.
