# Husni M. Rifqi — Personal Portfolio Website

A clean, modern, academic-professional personal portfolio built as a static website.
Designed for GitHub Pages deployment.

---

## 🗂 Project Structure

```
husnirifqi.github.io/
├── index.html              ← Main website (single-page)
├── css/
│   └── style.css           ← Full design system & all styles
├── js/
│   └── main.js             ← Interactivity (nav, animations, etc.)
├── images/
│   ├── husni-rifqi.jpg     ← Your headshot (add this file!)
│   └── README.md
├── cv/
│   ├── CV_Husni_Rifqi.pdf  ← Your CV PDF (add this file!)
│   └── README.md
└── README.md               ← This file
```

---

## 🚀 GitHub Pages Deployment

### Step 1 — Create your GitHub repository

1. Log in to [github.com](https://github.com)
2. Create a new repository named **exactly**: `husnirifqi.github.io`
   - Or if you prefer another name: `portfolio` (then update the base URL in index.html)
3. Set visibility to **Public**
4. Do **not** initialize with a README (you already have one)

### Step 2 — Upload your files

**Option A — Using GitHub's web interface (easiest):**
1. Open your repository on GitHub
2. Click **"uploading an existing file"** or **"Add file > Upload files"**
3. Drag and drop all files maintaining the folder structure
4. Click **"Commit changes"**

**Option B — Using Git CLI:**
```bash
# Initialize git in your project folder
git init
git add .
git commit -m "Initial portfolio deployment"

# Connect to your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/husnirifqi.github.io.git
git branch -M main
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

### Step 4 — Your site is live!

Your site will be available at:
```
https://husnirifqi.github.io/
```
(It may take 1–3 minutes for the first deployment.)

---

## ✅ Before You Go Live — Checklist

| Task | Where to Edit |
|------|--------------|
| ☐ Add your headshot photo | `images/husni-rifqi.jpg` |
| ☐ Add your CV PDF | `cv/CV_Husni_Rifqi.pdf` |
| ☐ Add your LinkedIn URL | Search `PLACEHOLDER` in `index.html` → update LinkedIn href |
| ☐ Add your Google Scholar URL | Search `PLACEHOLDER` in `index.html` → update Scholar href |
| ☐ Add publication DOI/links | Search `pub-link` in `index.html` → update `href="#"` with real URLs |
| ☐ Verify ORCID link | `https://orcid.org/0009-0003-6455-6657` — already correct |
| ☐ Verify Scopus link | `https://www.scopus.com/authid/detail.uri?authorId=59910003000` — already correct |

---

## ✏️ How to Edit Content

### Update your headshot
Replace `images/husni-rifqi.jpg` with your photo. Keep the same filename.

### Update your CV
Replace `cv/CV_Husni_Rifqi.pdf` with your latest CV PDF. Keep the same filename.

### Add a publication
Find the `publications-list` div in `index.html` and copy-paste this block:

```html
<article class="pub-card reveal-up">
  <div class="pub-year-badge">YEAR</div>
  <div class="pub-content">
    <h3 class="pub-title">Your Paper Title Here</h3>
    <p class="pub-authors">Author, A., & Author, B.</p>
    <p class="pub-journal"><i class="fas fa-journal-whills"></i> <em>Journal Name</em></p>
    <div class="pub-tags">
      <span class="pub-tag">Tag 1</span>
      <span class="pub-tag">Tag 2</span>
    </div>
    <div class="pub-links">
      <a href="https://doi.org/YOUR_DOI" class="pub-link" target="_blank">
        <i class="fas fa-external-link-alt"></i> View Article
      </a>
    </div>
  </div>
</article>
```

### Add a research interest
Find the `research-cards` div and copy an `<article class="research-card">` block.

### Update contact details
Search for `husni.yousuf@gmail.com` and `+966543573787` in `index.html` to update.

### Hide phone/email from public view
Add `style="display:none"` to the `.contact-item` div containing the phone or email.

### Update LinkedIn / Google Scholar URLs
Search for `PLACEHOLDER` in `index.html` — there are 4 occurrences to update.

---

## 🎨 Design Customization

### Change the color palette
Edit CSS variables at the top of `css/style.css` (`:root` block):
```css
--color-navy:       #1a3a5c;   /* Primary color */
--color-blue-mid:   #2d6da3;   /* Secondary color */
--color-gold:       #c9973d;   /* Accent color */
```

### Change fonts
Replace the Google Fonts `<link>` in `index.html` and update:
```css
--font-display:  'Playfair Display', Georgia, serif;
--font-body:     'Inter', sans-serif;
```

---

## 🔧 Tech Stack

| Technology | Usage |
|-----------|-------|
| **HTML5** | Semantic structure, accessibility |
| **CSS3** | Custom properties, Grid, Flexbox, animations |
| **Vanilla JavaScript** | IntersectionObserver, smooth scroll, nav |
| **Google Fonts** | Playfair Display + Inter |
| **Font Awesome 6** | Icons throughout the site |
| **No framework** | Zero build step — edit and deploy directly |

---

## 📐 Site Sections

| Section | ID | Description |
|---------|-----|-------------|
| Hero | `#hero` | Name, headline, photo, CTA buttons |
| About | `#about` | Bio summary + stats + profile links |
| Research | `#research` | Research interest cards |
| Education | `#education` | Timeline of academic background |
| Publications | `#publications` | Publication cards with tags |
| Experience | `#experience` | Work history + academic service |
| Awards | `#awards` | Scholarships & recognitions |
| Skills | `#skills` | Categorized skill tags |
| Profiles | `#profiles` | Google Scholar, ORCID, Scopus, LinkedIn |
| Contact | `#contact` | Location, email, phone, CTA |

---

## 🛠 Custom Domain (Optional)

To use your own domain (e.g., `husnirifqi.com`):

1. Purchase a domain from any registrar
2. In your GitHub repo, go to **Settings > Pages > Custom domain**
3. Enter your domain and save
4. In your domain registrar's DNS settings, add:
   ```
   Type: CNAME
   Name: www
   Value: husnirifqi.github.io
   ```
5. GitHub will provision an SSL certificate automatically

---

## 📊 SEO & Social Sharing

The site includes:
- Meta description and keywords
- Open Graph tags (Facebook/LinkedIn preview)
- Twitter Card tags
- Canonical URL tag
- Semantic HTML structure

**To update the canonical URL**, find this line in `index.html`:
```html
<link rel="canonical" href="https://husnirifqi.github.io/" />
```
and update it to match your actual GitHub Pages URL.

---

## 📄 License

© 2025 Husni M. Rifqi. All rights reserved.

---

*Built as a static website — no backend, no build tools, no dependencies.*
*Easy to maintain and update directly from GitHub.*
