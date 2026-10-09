# CineLos | Filmová Ruleta & Databáze

Aplikace pro náhodné losování filmů podle žánru a hodnocení propojená s databází ČSFD a TMDb.

---

## 🚀 Jak nahrát aplikaci na GitHub Pages (Čisté HTML)

Aplikace je nakonfigurována pomocí `vite-plugin-singlefile`, což znamená, že **vygenerovaný soubor `dist/index.html` je 100% samostatný čistý HTML soubor** se všemi vloženými skripty, styly i filmovou databází.

Máte **dvě jednoduché možnosti**:

---

### Možnost 1: Výběr složky /docs v GitHub Pages (Nejjednodušší bez stavění)

V projektu je již připravená složka **`docs/index.html`**, která obsahuje kompletní vygenerovaný samostatný HTML soubor:

1. Nahrajte celý projekt na GitHub:
   ```bash
   git init
   git add .
   git commit -m "CineLos čisté HTML"
   git branch -M main
   git remote add origin https://github.com/<vase-jmeno>/<nazev-repozitare>.git
   git push -u origin main
   ```
2. V repozitáři na GitHubu přejděte do:
   - **Settings** → **Pages**
   - V sekci **Build and deployment** nechte **Source: Deploy from a branch**
   - Branch: vyberte **main** a vedle v rozevíracím seznamu zvolte složku **/docs**
   - Klikněte na **Save**.
3. Za 1 minutu je vaše aplikace z čistého HTML živě online!

---

### Možnost 2: Nahrát pouze jediný soubor index.html

Pokud nechcete nahrávat zdrojové kódy:
1. Vezměte soubor **`docs/index.html`** (nebo `dist/index.html`).
2. Nahrajte ho do nového repozitáře přímo do kořene.
3. V GitHub Pages vyberte větev **main** a složku **/ (root)**. Hotovo!

---

### Možnost 2: Automatické nasazení celého zdrojového kódu (GitHub Actions)

Pokud chcete mít v repozitáři kompletní zdrojový kód a nechat GitHub, aby čisté HTML sám sestavoval:

1. Nahrajte projekt na GitHub:
   ```bash
   git init
   git add .
   git commit -m "CineLos filmový losovač"
   git branch -M main
   git remote add origin https://github.com/<vase-jmeno>/<nazev-repozitare>.git
   git push -u origin main
   ```
2. V repozitáři na GitHubu v **Settings** → **Pages** nastavte:
   - **Source**: **GitHub Actions**.
3. Připravený soubor `.github/workflows/deploy.yml` automaticky zkompiluje a nahraje čisté HTML na GitHub Pages.

---

### Jak znovu přegenerovat soubor `dist/index.html`:
Kdykoliv upravíte filmy nebo kód, stačí v terminálu spustit:
```bash
npm run build
```
Vznikne aktualizovaný samostatný soubor `dist/index.html`.
