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

The site is live automatically at `https://nalini2080.github.io/`.
