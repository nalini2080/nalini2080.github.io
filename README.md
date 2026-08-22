# nalini2080.github.io

Personal portfolio site — static HTML/CSS/JS, no build step.

## Structure

- `index.html` — home, hero with an interactive constellation background
- `work.html` — projects & research
- `about.html` — education, skills, experience timeline, hobbies
- `play.html` — "Catch Your Hobbies" mini game
- `contact.html` — contact links
- `css/style.css` — all styling
- `js/effects.js` — custom cursor + trail, constellation animation, Konami-code easter egg (↑↑↓↓←→←→ b a) on every page
- `js/game.js` — the hobby-catch game logic

## Preview locally

Open `index.html` directly in a browser, or serve it so relative paths behave exactly like GitHub Pages:

```
npx serve .
```

## Deploy to GitHub Pages

1. Create a new **public** repo on GitHub named `nalini2080.github.io` (or any name if you don't want the root user-site URL).
2. From this folder:
   ```
   git remote add origin https://github.com/nalini2080/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. In the repo Settings → Pages, set the source to the `main` branch, root folder. If the repo is named `nalini2080.github.io`, the site is live automatically at `https://nalini2080.github.io/`.

## To-do before publishing

- [ ] Add a real `assets/resume.pdf` (the Contact page links to it but the file isn't included yet)
- [ ] Swap in a real profile photo if you want one on the About page
- [ ] Double-check you're comfortable with everything public (this build intentionally leaves your phone number off every page — only email, LinkedIn, and GitHub are shown)
