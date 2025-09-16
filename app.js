(function () {
  "use strict";

  /**
   * Minimal embedded dataset. In a real system you'd fetch from an API.
   */
  const SONGS = [
    { title: "Blinding Lights", artist: "The Weeknd", genre: "pop", mood: ["energetic", "happy"], energy: 9, tempo: 171, url: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b" },
    { title: "Levitating", artist: "Dua Lipa", genre: "pop", mood: ["happy", "energetic"], energy: 8, tempo: 103, url: "https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9" },
    { title: "drivers license", artist: "Olivia Rodrigo", genre: "pop", mood: ["sad"], energy: 3, tempo: 144, url: "https://open.spotify.com/track/5wANPM4fQCJwkGd4rN57mH" },
    { title: "Circles", artist: "Post Malone", genre: "hip-hop", mood: ["chill"], energy: 5, tempo: 120, url: "https://open.spotify.com/track/21jGcNKet2qwijlDFuPiPb" },
    { title: "SICKO MODE", artist: "Travis Scott", genre: "hip-hop", mood: ["energetic"], energy: 9, tempo: 78, url: "https://open.spotify.com/track/2xLMifQCjDGFmkHkpNLD9h" },
    { title: "good 4 u", artist: "Olivia Rodrigo", genre: "rock", mood: ["energetic"], energy: 9, tempo: 170, url: "https://open.spotify.com/track/6PERP62TejQjgHu81OHxgM" },
    { title: "The Less I Know The Better", artist: "Tame Impala", genre: "indie", mood: ["chill", "romantic"], energy: 6, tempo: 118, url: "https://open.spotify.com/track/6K4t31amVTZDgR3sKmwUJJ" },
    { title: "Heat Waves", artist: "Glass Animals", genre: "indie", mood: ["chill"], energy: 6, tempo: 80, url: "https://open.spotify.com/track/02MWAaffLxlfxAUY7c5dvx" },
    { title: "bad guy", artist: "Billie Eilish", genre: "pop", mood: ["energetic"], energy: 8, tempo: 135, url: "https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m" },
    { title: "Stay", artist: "The Kid LAROI & Justin Bieber", genre: "pop", mood: ["energetic"], energy: 8, tempo: 170, url: "https://open.spotify.com/track/5HCyWlXZPP0y6Gqq8TgA20" },
    { title: "Lose Yourself", artist: "Eminem", genre: "hip-hop", mood: ["energetic", "focus"], energy: 10, tempo: 171, url: "https://open.spotify.com/track/7MJQ9Nfxzh8LPZ9e9u68Fq" },
    { title: "HUMBLE.", artist: "Kendrick Lamar", genre: "hip-hop", mood: ["energetic"], energy: 9, tempo: 150, url: "https://open.spotify.com/track/7KXjTSCq5nL1LoYtL7XAwS" },
    { title: "Nights", artist: "Frank Ocean", genre: "rnb", mood: ["chill"], energy: 5, tempo: 159, url: "https://open.spotify.com/track/7GvjKqSgQZQ0gJdS4F6U0Z" },
    { title: "Redbone", artist: "Childish Gambino", genre: "rnb", mood: ["chill", "romantic"], energy: 5, tempo: 160, url: "https://open.spotify.com/track/0ZNU020wNYvgW84iljPkPP" },
    { title: "Ocean Eyes", artist: "Billie Eilish", genre: "indie", mood: ["sad", "romantic"], energy: 2, tempo: 145, url: "https://open.spotify.com/track/7hDVYcQq6mx24Y8Hkrg1pb" },
    { title: "thinking...", artist: "Lofi Fruits Music", genre: "lofi", mood: ["chill", "focus"], energy: 2, tempo: 72, url: "https://open.spotify.com/track/0M6P0vBYq0p7sC6yOD87mp" },
    { title: "Weightless", artist: "Marconi Union", genre: "ambient", mood: ["focus", "chill"], energy: 1, tempo: 60, url: "https://open.spotify.com/track/2pV8c8r4y9VOGBev5nYeDk" },
    { title: "Claire de Lune", artist: "Claude Debussy", genre: "classical", mood: ["chill", "romantic"], energy: 1, tempo: 66, url: "https://open.spotify.com/track/6v3KW9xbzN5yKLt9YKDYA2" },
    { title: "Midnight City", artist: "M83", genre: "electronic", mood: ["energetic", "happy"], energy: 8, tempo: 105, url: "https://open.spotify.com/track/7fJCVe9EoHFAHF5dA5Zxij" },
    { title: "Strobe", artist: "deadmau5", genre: "electronic", mood: ["focus"], energy: 6, tempo: 128, url: "https://open.spotify.com/track/2cYqizR4lgvp4Qu6IQ3qGN" },
    { title: "Blue in Green", artist: "Miles Davis", genre: "jazz", mood: ["chill"], energy: 1, tempo: 54, url: "https://open.spotify.com/track/5N3rd3VZ7mZecWQd3C4T54" },
    { title: "Come Away With Me", artist: "Norah Jones", genre: "jazz", mood: ["romantic", "chill"], energy: 2, tempo: 86, url: "https://open.spotify.com/track/2LkaNhCrNVmcYgXJeLVmsw" },
    { title: "Mr. Brightside", artist: "The Killers", genre: "rock", mood: ["energetic"], energy: 9, tempo: 148, url: "https://open.spotify.com/track/0eGsygTp906u18L0Oimnem" },
    { title: "Smells Like Teen Spirit", artist: "Nirvana", genre: "rock", mood: ["energetic"], energy: 10, tempo: 117, url: "https://open.spotify.com/track/5ghIJDpPoe3CfHMGu71E6T" }
  ];

  const form = document.getElementById("controls");
  const resultsList = document.getElementById("resultsList");
  const resultCount = document.getElementById("resultCount");
  const shuffleBtn = document.getElementById("shuffle");
  const themeToggle = null;
  const aiPromptInput = document.getElementById("aiPrompt");
  const aiGoBtn = document.getElementById("aiGo");
  // gamification elements
  const xpFill = document.getElementById("xpFill");
  const levelEl = document.getElementById("level");
  const streakEl = document.getElementById("streak");

  // User profile storage (likes and history)
  const STORAGE_KEYS = { likes: "auralux_likes", history: "auralux_history" };
  function loadLikes() { try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.likes) || "[]")); } catch { return new Set(); } }
  function saveLikes(set) { localStorage.setItem(STORAGE_KEYS.likes, JSON.stringify(Array.from(set))); }
  function loadHistory() { try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || "[]"); } catch { return []; } }
  function saveHistory(arr) { localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(arr.slice(-100))); }
  const likedUrls = loadLikes();
  let historyUrls = loadHistory();

  function normalize(str) {
    return (str || "").toString().trim().toLowerCase();
  }

  function scoreSong(song, filters) {
    let score = 0;

    if (filters.genre && song.genre === filters.genre) score += 3;
    if (filters.mood && song.mood.includes(filters.mood)) score += 3;

    if (filters.query) {
      const hay = `${normalize(song.title)} ${normalize(song.artist)}`;
      if (hay.includes(filters.query)) score += 2;
    }

    // Light diversity: slight random tie-breaker
    score += Math.random() * 0.25;
    return score;
  }

  function recommend(filters, limit) {
    const userSeed = buildUserSeed();
    const withScores = SONGS.map((s) => {
      const base = scoreSong(s, filters);
      const content = contentSimilarityScore(s, userSeed) * 2.0;
      const social = collaborativeBoost(s) * 1.0;
      return { song: s, score: base + content + social };
    });
    withScores.sort((a, b) => b.score - a.score);
    return withScores
      .filter((x) => x.score > 0 || (!filters.genre && !filters.mood && !filters.query))
      .slice(0, limit)
      .map((x) => x.song);
  }

  // Content similarity helpers
  function toVector(song) {
    const genres = ["pop","rock","hip-hop","electronic","rnb","indie","jazz","lofi","classical","ambient"];
    const moods = ["happy","chill","energetic","sad","romantic","focus"];
    const vec = [];
    genres.forEach((g) => vec.push(song.genre === g ? 1 : 0));
    moods.forEach((m) => vec.push(song.mood.includes(m) ? 1 : 0));
    vec.push((song.energy || 0) / 10);
    vec.push((song.tempo || 0) / 200);
    return vec;
  }
  function cosine(a, b) {
    if (!a || !b) return 0;
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
    return na && nb ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
  }
  function buildUserSeed() {
    const liked = SONGS.filter((s) => likedUrls.has(s.url));
    const listened = new Set(historyUrls);
    const hist = SONGS.filter((s) => listened.has(s.url));
    const base = liked.length ? liked : hist;
    if (!base.length) return null;
    const vecs = base.map(toVector);
    const avg = new Array(vecs[0].length).fill(0);
    vecs.forEach((v) => v.forEach((x, i) => (avg[i] += x)));
    for (let i = 0; i < avg.length; i++) avg[i] /= vecs.length;
    return avg;
  }
  function contentSimilarityScore(song, userSeed) {
    if (!userSeed) return 0;
    return cosine(toVector(song), userSeed);
  }
  function collaborativeBoost(song) {
    const seed = buildUserSeed();
    const sim = contentSimilarityScore(song, seed);
    const popularity = ((song.energy || 0) / 10 + (song.tempo || 0) / 200) / 2;
    return sim * 0.8 + popularity * 0.2 + (likedUrls.has(song.url) ? 0.5 : 0);
  }

  function renderResults(songs) {
    resultsList.innerHTML = "";
    resultCount.textContent = `${songs.length} result${songs.length === 1 ? "" : "s"}`;
    songs.forEach((s) => {
      const li = document.createElement("li");
      li.className = "list-item";
      const tags = `<div class="tag-row"><span class="tag">${s.genre}</span>${s.mood.map((m) => `<span class=\"tag\">${m}</span>`).join("")}</div>`;
      li.innerHTML = `
        <div>
          <div class="song-title">${s.title}</div>
          <div class="song-meta">${s.artist}</div>
          ${tags}
        </div>
        <div class="song-actions">
          <button class="like-btn ${likedUrls.has(s.url) ? "liked" : ""}" data-url="${s.url}" aria-pressed="${likedUrls.has(s.url)}">❤</button>
          <a class="open-link" href="${s.url}" target="_blank" rel="noopener noreferrer" data-url="${s.url}">Open</a>
        </div>
      `;
      resultsList.appendChild(li);
    });

    // Wire interactions
    resultsList.querySelectorAll(".like-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const url = btn.getAttribute("data-url");
        if (likedUrls.has(url)) {
          likedUrls.delete(url);
          btn.classList.remove("liked");
          btn.setAttribute("aria-pressed", "false");
        } else {
          likedUrls.add(url);
          btn.classList.add("liked");
          btn.setAttribute("aria-pressed", "true");
        }
        saveLikes(likedUrls);
      });
    });
    resultsList.querySelectorAll(".open-link").forEach((a) => {
      a.addEventListener("click", () => {
        const url = a.getAttribute("data-url");
        historyUrls.push(url);
        saveHistory(historyUrls);
      });
    });
  }

  function showSkeleton(count) {
    resultsList.innerHTML = "";
    const n = Math.max(3, count || 6);
    for (let i = 0; i < n; i++) {
      const li = document.createElement("li");
      li.className = "list-item";
      li.innerHTML = `<div class="skeleton" style="height:52px"></div>`;
      resultsList.appendChild(li);
    }
    resultCount.textContent = `…`;
  }

  // Theme fixed to light; remove persistence
  function initTheme() {
    document.documentElement.removeAttribute("data-theme");
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const data = new FormData(form);
    const filters = {
      mood: normalize(data.get("mood")),
      genre: normalize(data.get("genre")),
      query: normalize(data.get("query"))
    };
    const limitRaw = Number(data.get("limit")) || 10;
    const limit = Math.min(50, Math.max(1, limitRaw));
    showSkeleton(limit);
    setTimeout(() => {
      const recs = recommend(filters, limit);
      renderResults(recs);
    }, 400);
  }

  // AI prompt parsing — lightweight rules
  function parsePrompt(promptText) {
    const text = normalize(promptText);
    const out = { mood: "", genre: "", query: "", limit: 10 };
    if (!text) return out;
    // limit like: 12 songs, 20 tracks
    const limitMatch = text.match(/(\d{1,2})\s*(songs|tracks)?/);
    if (limitMatch) out.limit = Math.min(50, Math.max(1, Number(limitMatch[1])));
    // simple genre and mood dictionaries
    const genres = ["pop","rock","hip-hop","electronic","rnb","indie","jazz","lofi","classical","ambient"];
    const moods = ["happy","chill","energetic","sad","romantic","focus"];
    for (const g of genres) { if (text.includes(g)) { out.genre = g; break; } }
    for (const m of moods) { if (text.includes(m)) { out.mood = m; break; } }
    // query words after 'by' or free text not matched
    const byMatch = text.match(/by\s+([\w\s.\-&']{2,})/);
    if (byMatch) out.query = byMatch[1].trim();
    if (!out.query && !out.genre && !out.mood) out.query = text;
    return out;
  }

  function runPrompt() {
    const raw = aiPromptInput ? aiPromptInput.value : "";
    const parsed = parsePrompt(raw);
    if (!form) return;
    // reflect in form
    const moodSel = document.getElementById("mood");
    const genreSel = document.getElementById("genre");
    const queryInp = document.getElementById("query");
    const limitInp = document.getElementById("limit");
    if (moodSel && parsed.mood) moodSel.value = parsed.mood;
    if (genreSel && parsed.genre) genreSel.value = parsed.genre;
    if (queryInp && parsed.query) queryInp.value = parsed.query;
    if (limitInp && parsed.limit) limitInp.value = String(parsed.limit);
    // submit
    showSkeleton(parsed.limit);
    setTimeout(() => {
      const recs = recommend({ mood: parsed.mood, genre: parsed.genre, query: normalize(parsed.query) }, parsed.limit);
      renderResults(recs);
    }, 300);
  }

  function shuffleAll() {
    const shuffled = [...SONGS].sort(() => Math.random() - 0.5).slice(0, 10);
    renderResults(shuffled);
    awardXP(5);
  }

  form.addEventListener("submit", handleSubmit);
  shuffleBtn.addEventListener("click", shuffleAll);
  if (aiGoBtn) aiGoBtn.addEventListener("click", runPrompt);
  const chipRow = document.querySelectorAll('[data-chip]');
  chipRow.forEach((chip) => {
    chip.addEventListener("click", () => {
      const val = chip.getAttribute("data-chip") || "";
      if (!val) return;
      const [key, data] = val.split(":");
      if (key === "mood") document.getElementById("mood").value = data;
      if (key === "genre") document.getElementById("genre").value = data;
      if (key === "limit") document.getElementById("limit").value = data;
      runPrompt();
    });
  });

  // (Login removed per request)

  // Theme toggle
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  initTheme();

  // --- Gamification: XP, level, streak ---
  const GAMIFY_KEYS = { xp: "auralux_xp", level: "auralux_level", streak: "auralux_streak", lastDay: "auralux_last_day" };
  function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  }
  function loadGamify() {
    return {
      xp: Number(localStorage.getItem(GAMIFY_KEYS.xp) || 0),
      level: Number(localStorage.getItem(GAMIFY_KEYS.level) || 1),
      streak: Number(localStorage.getItem(GAMIFY_KEYS.streak) || 0),
      lastDay: localStorage.getItem(GAMIFY_KEYS.lastDay) || ""
    };
  }
  function saveGamify(state) {
    localStorage.setItem(GAMIFY_KEYS.xp, String(state.xp));
    localStorage.setItem(GAMIFY_KEYS.level, String(state.level));
    localStorage.setItem(GAMIFY_KEYS.streak, String(state.streak));
    localStorage.setItem(GAMIFY_KEYS.lastDay, state.lastDay);
  }
  function levelXpGoal(level) { return 50 + (level - 1) * 25; }
  function renderGamify(state) {
    if (levelEl) levelEl.textContent = String(state.level);
    if (streakEl) streakEl.textContent = String(state.streak);
    if (xpFill) {
      const pct = Math.min(100, Math.round((state.xp / levelXpGoal(state.level)) * 100));
      xpFill.style.width = `${pct}%`;
    }
  }
  function tickStreak(state) {
    const today = getTodayKey();
    if (state.lastDay !== today) {
      const last = new Date(state.lastDay);
      const prev = new Date();
      prev.setDate(prev.getDate() - 1);
      const prevKey = `${prev.getFullYear()}-${prev.getMonth()+1}-${prev.getDate()}`;
      state.streak = state.lastDay === prevKey ? state.streak + 1 : 1;
      state.lastDay = today;
    }
  }
  function awardXP(amount) {
    const state = loadGamify();
    tickStreak(state);
    state.xp += amount;
    let goal = levelXpGoal(state.level);
    while (state.xp >= goal) {
      state.xp -= goal;
      state.level += 1;
      goal = levelXpGoal(state.level);
    }
    saveGamify(state);
    renderGamify(state);
  }

  // award XP for actions
  form.addEventListener("submit", () => awardXP(3));
  resultsList.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches && target.matches(".like-btn")) awardXP(1);
    if (target && target.matches && target.matches(".open-link")) awardXP(2);
  });
  renderGamify(loadGamify());

  // Initial state
  shuffleAll();

  // --- Audio Player ---
  const audio = new Audio();
  const playlistEl = document.getElementById("playlist");
  const nowTitle = document.getElementById("nowTitle");
  const nowArtist = document.getElementById("nowArtist");
  const seek = document.getElementById("seek");
  const curTime = document.getElementById("curTime");
  const durTime = document.getElementById("durTime");
  const btnPlay = document.getElementById("play");
  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");
  const vol = document.getElementById("volume");

  // Internal preview sources (royalty‑free), mapped by genre for inline playback
  const PREVIEW_URL_BY_GENRE = {
    pop: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    rock: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "hip-hop": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    electronic: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    rnb: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    indie: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    jazz: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    lofi: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    classical: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    ambient: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
  };
  const PREVIEW_FALLBACK = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3";

  const PLAYLIST = SONGS.map((s) => ({
    title: s.title,
    artist: s.artist,
    url: PREVIEW_URL_BY_GENRE[s.genre] || PREVIEW_FALLBACK,
    duration: 0
  }));

  let currentIndex = 0;

  function mmss(sec) {
    const m = Math.floor(sec / 60) || 0;
    const s = Math.floor(sec % 60) || 0;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function renderPlaylist() {
    if (!playlistEl) return;
    playlistEl.innerHTML = "";
    PLAYLIST.forEach((t, i) => {
      const li = document.createElement("li");
      li.className = "list-item";
      li.innerHTML = `
        <div>
          <div class="song-title">${t.title}</div>
          <div class="song-meta">${t.artist}</div>
        </div>
        <div class="song-actions">
          <button class="btn" data-index="${i}">Play</button>
        </div>
      `;
      playlistEl.appendChild(li);
    });

    playlistEl.querySelectorAll("button[data-index]").forEach((b) => {
      b.addEventListener("click", () => {
        const idx = Number(b.getAttribute("data-index"));
        playIndex(idx);
      });
    });
  }

  function updateNowPlaying() {
    const t = PLAYLIST[currentIndex];
    if (nowTitle) nowTitle.textContent = t ? t.title : "—";
    if (nowArtist) nowArtist.textContent = t ? t.artist : "—";
  }

  function playIndex(idx) {
    if (idx < 0 || idx >= PLAYLIST.length) return;
    currentIndex = idx;
    const t = PLAYLIST[currentIndex];
    audio.src = t.url;
    audio.play().catch(() => {
      // swallow errors (e.g., autoplay restrictions); user can press play
    });
    if (btnPlay) btnPlay.textContent = "⏸";
    updateNowPlaying();
  }

  function playPause() {
    if (audio.paused) {
      audio.play().catch(() => {
        // no external fallback; keep playback inside app
      });
      if (btnPlay) btnPlay.textContent = "⏸";
    } else {
      audio.pause();
      if (btnPlay) btnPlay.textContent = "▶";
    }
  }

  function nextTrack() { playIndex((currentIndex + 1) % PLAYLIST.length); }
  function prevTrack() { playIndex((currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length); }

  function bindPlayer() {
    if (btnPlay) btnPlay.addEventListener("click", playPause);
    if (btnNext) btnNext.addEventListener("click", nextTrack);
    if (btnPrev) btnPrev.addEventListener("click", prevTrack);
    if (vol) {
      vol.addEventListener("input", () => { audio.volume = Number(vol.value); });
      audio.volume = Number(vol.value || 1);
    }
    if (seek) {
      seek.addEventListener("input", () => {
        if (audio.duration) {
          audio.currentTime = (Number(seek.value) / 100) * audio.duration;
        }
      });
    }
    audio.addEventListener("timeupdate", () => {
      if (seek && audio.duration) seek.value = String((audio.currentTime / audio.duration) * 100);
      if (curTime) curTime.textContent = mmss(audio.currentTime || 0);
      if (durTime) durTime.textContent = mmss(audio.duration || 0);
    });
    audio.addEventListener("ended", nextTrack);
  }

  renderPlaylist();
  bindPlayer();
  updateNowPlaying();
})();





