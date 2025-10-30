# Ecommerce Catalog — Rakamin Task 5 (Vue 2 + Vanilla CSS)

**Live Demo (suggested)**: https://<username>.github.io/ecommerce-catalog  
**Repo (expected)**: https://github.com/icaluwu/ecommerce-catalog

## Requirements Mapping
- Vue 2 + Vanilla CSS ✔
- Fetch `GET https://fakestoreapi.com/products/:index` on **Next Product** ✔
- Index cycles **1 → 20 → 1** ✔
- Only persists category **"men's clothing"** / **"women's clothing"**, else show **Unavailable** ✔
- Three visual states aligned with Figma palette (Men/Women/Unavailable) ✔
- Asymmetric border-radius **15px 20px 15px 20px** on card & image ✔
- Error state + Retry ✔
- Static hosting ready (GitHub Pages/Vercel/Netlify) ✔

## Run Locally
Open `index.html` via a static server:
```bash
# from repo root
python3 -m http.server 5173
# then visit http://localhost:5173
```

## Deploy (GitHub Pages)
1) Push to `main`.  
2) Settings → Pages → **Deploy from a branch** → `main` / root.  
3) Test your URL.

## Submission
Create a `.txt` file per the brief:
```
vix_CI_FE_Vaickal.txt
Repo: https://github.com/icaluwu/ecommerce-catalog
Live Demo: https://icaluwu.github.io/ecommerce-catalog
Notes: Vue 2 + Vanilla CSS; Men/Women/Unavailable themes; Next Product fetch & loop.
```
