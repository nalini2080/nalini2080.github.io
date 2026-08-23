# nalini2080.github.io

Personal portfolio site — static HTML/CSS/JS, no build step. Single-page site with anchor navigation.

## Structure

- `index.html` — everything: hero (name + contact), Projects, Professional Experience (+ Leadership, Education, Skills), Hobbies (with an embedded mini game), Contact
- `work.html`, `about.html`, `play.html`, `contact.html` — redirect stubs pointing to the matching `index.html#anchor`, kept in case any old links exist
- `css/style.css` — all styling
- `js/effects.js` — custom cursor + trail, twinkling constellation background, Konami-code easter egg (↑↑↓↓←→←→ b a)
- `js/game.js` — the "Catch Your Hobbies" game logic

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

- [ ] Swap in a real profile photo if you want one
- [ ] Double-check you're comfortable with everything public (this build intentionally leaves your phone number and resume PDF off every page — only email, LinkedIn, and GitHub are shown)
