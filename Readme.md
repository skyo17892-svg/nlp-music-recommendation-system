# Music Recommendation (Static)

Lightweight, zero-dependency music recommendation demo that runs fully in the browser. Pick a mood and genre, search by title/artist, and get curated results from an embedded sample dataset.

## Run locally

Just open `index.html` in your browser. No installs required.

On Windows, you can double-click `index.html`. Or serve the folder (optional) with a static server:

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Features

- Mood and genre filtering
- Text search on title/artist
- Simple scoring and sorting
- Shuffle to discover new tracks
- Clean, modern UI without any framework

## Structure

- `index.html` – UI markup
- `styles.css` – Styling, dark theme
- `app.js` – Dataset, scoring, and UI logic
- `README.md` – This file

## Customize

Edit the `SONGS` array inside `app.js` to add/remove tracks or change metadata. You can replace URLs with Spotify, Apple Music, or YouTube links.

## Notes

This is a minimal demo; there is no server or tracking. For a production app, you would likely:

- Fetch a larger catalog from an API
- Use real audio features (danceability, valence, energy, tempo) to score
- Add pagination, favorites, and persistence





