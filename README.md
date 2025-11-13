# LeadBoost IA

Next.js app (front + API) déployable gratuitement sur Netlify.

## Déploiement Netlify (gratuit)
1. Poussez ce repo sur GitHub.
2. Netlify → Add new site → Import from Git → choisissez le repo.
3. Build command: `npm run build` — Publish directory: `.next` (détection auto).
4. Dans **Site settings → Environment variables**, ajoutez `OPENAI_API_KEY`.
5. Deploy → si besoin `Trigger deploy → Clear cache and deploy site`.

## Développement local
```bash
npm install
npm run dev
# http://localhost:3000
```
