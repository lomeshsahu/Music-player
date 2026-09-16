# Truck Driver Songs ♫

A modern, responsive, playlist-first music player powered by YouTube and browser-local persistence.
link-
---

## Key Features

- **Playlist-First Flow**: Browse and switch seamlessly across multiple playlists (`PLAYLISTS` → `SELECT PLAYLIST` → `SONGS` → `PLAY`).
- **YouTube Playlist Import**: Import any public or unlisted YouTube playlist via its URL or playlist ID.
- **YouTube Embedded Playback**: Official YouTube IFrame Player API integration (`YT.Player`). Audio and video playback without downloading or extracting copyrighted media.
- **Continuous In-Playlist Playback**: Automatically advances to the next song in the active playlist when a song finishes without switching playlists.
- **Playlist Management**: Add playlists, rename them, refresh with latest YouTube track updates, and safely delete with confirmation.
- **Duplicate Prevention**: Rejects duplicate YouTube playlist imports and filters out duplicate video IDs within playlists.
- **Dynamic Adaptive Background**: Automatically extracts dominant colors from the current track's album thumbnail using HTML5 Canvas and tints the background and glows dynamically.
- **Media View Switcher**: Toggle between high-definition Album Artwork view and live embedded YouTube Video view (`🎬 Video` / `🖼️ Art`).
- **Offline & First-Launch Ready**: Pre-seeded with four curated default YouTube playlists (**Gym Beats**, **Long Drive Beats**, **Truck Driver Beats**, and **Indian Barber Beats**) using their YouTube playlist IDs as unique identifiers so the player works immediately upon first launch.

### Default Playlists Included
1. **Gym Beats** (`PLBWZKm-dhAC7ZZ0EI-XWhwQNsvKi06hDw`) - *Default active playlist*
2. **Long Drive Beats** (`PL2n9PsUx_VHcVgOATXGVFFP9IXjYO6wMY`)
3. **Truck Driver Beats** (`PLq-bT4s33RYADNkcClDkLPovaKJx0HTDM`)
4. **Indian Barber Beats** (`PLQSN0EC5GK3TSTXo6cz3CO6j0RfKUS6Mb`)


## File Structure

```text
Music web player/
├── index.html          # Main HTML structure with player, playlist bar & modals
├── css/
│   └── style.css       # Dark-theme aesthetic, responsive styling & animations
├── js/
│   └── app.js          # Player engine, YouTube Data API v3 & IFrame player logic
├── config.js           # Local YouTube API key configuration (optional)
├── config.example.js   # Configuration template & setup instructions
└── README.md           # Documentation and setup guide
```

---

## YouTube Data API Setup & Security

A **YouTube Data API v3** key is used to fetch playlist metadata (name, description, thumbnail, and track list).

### 1. Getting an API Key
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Navigate to **APIs & Services** → **Library** and search for **YouTube Data API v3**. Click **Enable**.
4. Navigate to **APIs & Services** → **Credentials**. Click **+ CREATE CREDENTIALS** → **API key**.

### 2. Restricting the Key (Best Practice)
To prevent unauthorized use of your key:
1. In Google Cloud Console under **Credentials**, click on your newly created API key to edit it.
2. Under **Application restrictions**:
   - Select **Websites (HTTP referrers)**.
   - Add your authorized domains:
     - For GitHub Pages: `https://<your-username>.github.io/*`
     - For local development: `http://localhost:*` or `http://127.0.0.1:*`
3. Under **API restrictions**:
   - Select **Restrict key**.
   - Check **YouTube Data API v3** only.
4. Click **Save**.

### 3. Configuring the Key in the Player
You can provide your key in either of two ways:
- **Option A (In-App UI)**: Click the **⚙️ Settings** icon in the top right of the player, paste your key, and click **Save Key**. The key is stored locally in your browser (`localStorage`).
- **Option B (Config File)**: Edit `config.js` and set:
  ```javascript
  window.CONFIG = {
    YOUTUBE_API_KEY: "AIzaSy..."
  };
  ```

---

## How to Run & Test

Because this project is built with vanilla HTML, CSS, and modern JavaScript:

1. **Directly in Browser**:
   - Double-click or open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).
2. **Local HTTP Server** (Recommended for YouTube IFrame origin verification):
   - Using VS Code: Install **Live Server** extension and click **Go Live**.
   - Using Python: Run `python -m http.server 8000` in this directory and open `http://localhost:8000`.
   - Using Node.js: Run `npx serve` or `npx http-server`.
3. **Deploy to GitHub Pages**:
   - Commit and push these files to the root of your GitHub repository.
   - Go to **Settings** → **Pages** → **Deploy from a branch** → Branch: `main` / `root`.

---

## YouTube API & Embed Notes

- **Embed Restrictions**: YouTube content creators can choose to disable external embedding for specific videos. If a creator restricts third-party embedding, the player gracefully skips to the next playable track in the playlist.
- **Quota Limits**: The YouTube Data API free tier provides 10,000 quota units per day. The player batches duration calls (50 videos per unit) to minimize quota usage.
- **Playback Compliance**: Per YouTube's Terms of Service, playback uses YouTube's official embedded IFrame Player API. Audio is neither converted, stripped, nor saved offline.
