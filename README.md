# CineLos | Filmová Ruleta & Databáze

Aplikace pro náhodné losování filmů podle žánru a hodnocení propojená s databází ČSFD a TMDb.

## Jak nahrát aplikaci na GitHub Pages

Projekt je kompletně připravený pro GitHub Pages (je nastaveno relativní směrování `base: './'` ve `vite.config.ts` a vytvořen GitHub Actions deployment workflow).

### Metoda 1: Automaticky přes GitHub Actions (Doporučeno)

1. Vytvořte nový repozitář na [GitHubu](https://github.com/new).
2. Ve složce projektu spusťte v terminálu:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - CineLos"
   git branch -M main
   git remote add origin https://github.com/<vase-jmeno>/<nazev-repozitare>.git
   git push -u origin main
   ```
3. V repozitáři na GitHubu přejděte do:
   - **Settings** → **Pages**
   - V sekci **Build and deployment** změňte **Source** na **GitHub Actions**.
4. Workflow se automaticky spustí a během 1–2 minut bude aplikace dostupná na adrese:
   `https://<vase-jmeno>.github.io/<nazev-repozitare>/`

---

### Metoda 2: Rychlé nasazení pomocí npm deploy

Pokud preferujete nasazení přímo z počítače pomocí větve `gh-pages`:

```bash
npm run deploy
```

V GitHubu pak v **Settings** → **Pages** vyberte větev `gh-pages` a složku `/(root)`.
