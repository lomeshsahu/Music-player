/**
 * Truck Driver Songs - Playlist-First YouTube Music Web Player
 * Complete client-side architecture with local persistence & YouTube IFrame playback.
 */

const STORAGE_KEY = "truck_driver_player_data";
const $ = id => document.getElementById(id);

// Four default YouTube playlists
const STARTER_PLAYLISTS = [
  {
    id: "PLBWZKm-dhAC7ZZ0EI-XWhwQNsvKi06hDw",
    name: "Gym Beats",
    description: "Bollywood Gym / Exercise / Workout",
    coverImage: "https://i.ytimg.com/vi/Ax0G_P2dSBw/hqdefault.jpg",
    youtubePlaylistId: "PLBWZKm-dhAC7ZZ0EI-XWhwQNsvKi06hDw",
    youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLBWZKm-dhAC7ZZ0EI-XWhwQNsvKi06hDw",
    createdAt: 1710000000000,
    updatedAt: 1710000000000,
    songs: [
      {
        id: "song_PLBWZKm-dhAC7ZZ0EI-XWhwQNsvKi06hDw_Ax0G_P2dSBw",
        youtubeVideoId: "Ax0G_P2dSBw",
        title: "Zinda - Bhaag Milkha Bhaag",
        artist: "Sony Music India",
        thumbnail: "https://i.ytimg.com/vi/Ax0G_P2dSBw/hqdefault.jpg",
        duration: "3:31",
        position: 0,
        available: true
      },
      {
        id: "song_PLBWZKm-dhAC7ZZ0EI-XWhwQNsvKi06hDw_abiL84EAWSY",
        youtubeVideoId: "abiL84EAWSY",
        title: "Sultan Title Song",
        artist: "YRF",
        thumbnail: "https://i.ytimg.com/vi/abiL84EAWSY/hqdefault.jpg",
        duration: "4:40",
        position: 1,
        available: true
      },
      {
        id: "song_PLBWZKm-dhAC7ZZ0EI-XWhwQNsvKi06hDw_puKD3nkB1h4",
        youtubeVideoId: "puKD3nkB1h4",
        title: "Ziddi Dil - Mary Kom",
        artist: "Zee Music Company",
        thumbnail: "https://i.ytimg.com/vi/puKD3nkB1h4/hqdefault.jpg",
        duration: "4:47",
        position: 2,
        available: true
      }
    ]
  },
  {
    id: "PL2n9PsUx_VHcVgOATXGVFFP9IXjYO6wMY",
    name: "Long Drive Beats",
    description: "Upbeat Hindi Car Songs",
    coverImage: "https://i.ytimg.com/vi/lSPNH_rYKIg/hqdefault.jpg",
    youtubePlaylistId: "PL2n9PsUx_VHcVgOATXGVFFP9IXjYO6wMY",
    youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PL2n9PsUx_VHcVgOATXGVFFP9IXjYO6wMY",
    createdAt: 1710001000000,
    updatedAt: 1710001000000,
    songs: [
      {
        id: "song_PL2n9PsUx_VHcVgOATXGVFFP9IXjYO6wMY_lSPNH_rYKIg",
        youtubeVideoId: "lSPNH_rYKIg",
        title: "Ilahi - Yeh Jawaani Hai Deewani",
        artist: "Pritam, Arijit Singh",
        thumbnail: "https://i.ytimg.com/vi/lSPNH_rYKIg/hqdefault.jpg",
        duration: "3:49",
        position: 0,
        available: true
      },
      {
        id: "song_PL2n9PsUx_VHcVgOATXGVFFP9IXjYO6wMY_AGsOTkX7ssM",
        youtubeVideoId: "AGsOTkX7ssM",
        title: "Kya Karoon? - Wake Up Sid",
        artist: "Shankar Ehsaan Loy",
        thumbnail: "https://i.ytimg.com/vi/AGsOTkX7ssM/hqdefault.jpg",
        duration: "4:13",
        position: 1,
        available: true
      }
    ]
  },
  {
    id: "PLq-bT4s33RYADNkcClDkLPovaKJx0HTDM",
    name: "Truck Driver Beats",
    description: "Hindi Songs for Barbershop, Truck Drivers & Mistris",
    coverImage: "https://i.ytimg.com/vi/mZwJs1YQ-Wk/hqdefault.jpg",
    youtubePlaylistId: "PLq-bT4s33RYADNkcClDkLPovaKJx0HTDM",
    youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLq-bT4s33RYADNkcClDkLPovaKJx0HTDM",
    createdAt: 1710002000000,
    updatedAt: 1710002000000,
    songs: [
      {
        id: "song_PLq-bT4s33RYADNkcClDkLPovaKJx0HTDM_mZwJs1YQ-Wk",
        youtubeVideoId: "mZwJs1YQ-Wk",
        title: "Kisi Din Banoongi Main - Raja",
        artist: "Shemaroo Filmi Gaane",
        thumbnail: "https://i.ytimg.com/vi/mZwJs1YQ-Wk/hqdefault.jpg",
        duration: "7:02",
        position: 0,
        available: true
      },
      {
        id: "song_PLq-bT4s33RYADNkcClDkLPovaKJx0HTDM__rRHFeqGjvk",
        youtubeVideoId: "_rRHFeqGjvk",
        title: "Phool Maangu Na Bahaar Maangu - Raja",
        artist: "Tips Official",
        thumbnail: "https://i.ytimg.com/vi/_rRHFeqGjvk/hqdefault.jpg",
        duration: "5:12",
        position: 1,
        available: true
      }
    ]
  },
  {
    id: "PLQSN0EC5GK3TSTXo6cz3CO6j0RfKUS6Mb",
    name: "Indian Barber Beats",
    description: "Classic Hindi Hits - Shoeb",
    coverImage: "https://i.ytimg.com/vi/WAe4nOOy3l4/hqdefault.jpg",
    youtubePlaylistId: "PLQSN0EC5GK3TSTXo6cz3CO6j0RfKUS6Mb",
    youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLQSN0EC5GK3TSTXo6cz3CO6j0RfKUS6Mb",
    createdAt: 1710003000000,
    updatedAt: 1710003000000,
    songs: [
      {
        id: "song_PLQSN0EC5GK3TSTXo6cz3CO6j0RfKUS6Mb_WAe4nOOy3l4",
        youtubeVideoId: "WAe4nOOy3l4",
        title: "Dheere Dheere Se Meri Zindagi Mein Aana",
        artist: "Anuradha Paudwal, Kumar Sanu",
        thumbnail: "https://i.ytimg.com/vi/WAe4nOOy3l4/hqdefault.jpg",
        duration: "5:32",
        position: 0,
        available: true
      },
      {
        id: "song_PLQSN0EC5GK3TSTXo6cz3CO6j0RfKUS6Mb_gAVvS-TvNOk",
        youtubeVideoId: "gAVvS-TvNOk",
        title: "Sochenge Tumhe Pyar (With Jhankar Beats)",
        artist: "Kumar Sanu",
        thumbnail: "https://i.ytimg.com/vi/gAVvS-TvNOk/hqdefault.jpg",
        duration: "6:03",
        position: 1,
        available: true
      }
    ]
  }
];

// Application State
let appState = {
  version: 1,
  selectedPlaylistId: "PLBWZKm-dhAC7ZZ0EI-XWhwQNsvKi06hDw",
  playlists: [],
  currentSongIndex: 0,
  volume: 0.9,
  userApiKey: "",
  showVideo: false
};

// YouTube IFrame Player instance
let ytPlayer = null;
let ytPlayerReady = false;
let isSeeking = false;
let timeUpdateInterval = null;
let activePlaylistToDelete = null;

/* -------------------------------------------------------------------------- */
/*                               STATE & STORAGE                              */
/* -------------------------------------------------------------------------- */

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        appState = {
          ...appState,
          ...parsed
        };
        // Ensure active playlist ID is valid if playlists exist
        const currentPl = getCurrentPlaylist();
        if (!currentPl && appState.playlists.length > 0) {
          appState.selectedPlaylistId = appState.playlists[0].id;
        }
        if (appState.currentSongIndex < 0 && appState.playlists.length > 0) {
          appState.currentSongIndex = 0;
        }
        return;
      }
    }
  } catch (err) {
    console.warn("Failed to load saved state from localStorage, falling back to defaults.", err);
  }

  // First time launch: Initialize the four default YouTube playlists
  appState.playlists = JSON.parse(JSON.stringify(STARTER_PLAYLISTS));
  appState.selectedPlaylistId = "PLBWZKm-dhAC7ZZ0EI-XWhwQNsvKi06hDw";
  appState.currentSongIndex = 0;
  saveState();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: appState.version,
      selectedPlaylistId: appState.selectedPlaylistId,
      playlists: appState.playlists,
      currentSongIndex: appState.currentSongIndex,
      volume: appState.volume,
      userApiKey: appState.userApiKey,
      showVideo: appState.showVideo
    }));
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
}

function getApiKey() {
  // 1. User key saved in state
  if (appState.userApiKey && appState.userApiKey.trim()) {
    return appState.userApiKey.trim();
  }
  // 2. Global CONFIG object from config.js
  if (window.CONFIG && window.CONFIG.YOUTUBE_API_KEY && window.CONFIG.YOUTUBE_API_KEY.trim()) {
    return window.CONFIG.YOUTUBE_API_KEY.trim();
  }
  return "";
}

function getCurrentPlaylist() {
  return appState.playlists.find(p => p.id === appState.selectedPlaylistId) || null;
}

function getCurrentSong() {
  const pl = getCurrentPlaylist();
  if (!pl || !pl.songs || !pl.songs.length) return null;
  const idx = appState.currentSongIndex;
  return pl.songs[idx] || pl.songs[0] || null;
}

/* -------------------------------------------------------------------------- */
/*                              UTILITY FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

function fmt(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function esc(str) {
  return String(str || "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[c]));
}

function parseIsoDuration(duration) {
  if (!duration) return "0:00";
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  const hours = parseInt(match[1] || 0, 10);
  const minutes = parseInt(match[2] || 0, 10);
  const seconds = parseInt(match[3] || 0, 10);
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function extractPlaylistId(input) {
  if (!input) return null;
  const str = input.trim();
  // Direct playlist ID check
  if (/^[A-Za-z0-9_-]{10,64}$/.test(str) && !str.includes("http") && !str.includes("/")) {
    return str;
  }
  // Try URL parameter extraction
  try {
    const url = new URL(str.startsWith("http") ? str : "https://" + str);
    const list = url.searchParams.get("list");
    if (list && /^[A-Za-z0-9_-]{10,64}$/.test(list)) {
      return list;
    }
  } catch {}
  // Fallback regex pattern matching
  const match = str.match(/[?&]list=([A-Za-z0-9_-]{10,64})/);
  if (match) return match[1];
  return null;
}

function showToast(msg, duration = 3200) {
  const toast = $("toast");
  toast.textContent = msg;
  toast.classList.remove("hidden");
  if (toast._timer) clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.add("hidden");
  }, duration);
}

/* -------------------------------------------------------------------------- */
/*                       DYNAMIC COLOR THEME EXTRACTION                       */
/* -------------------------------------------------------------------------- */

function setColor(url) {
  if (!url) {
    document.documentElement.style.setProperty("--accent", "#a9e85a");
    document.documentElement.style.setProperty("--glow", "rgba(169,232,90,.2)");
    document.documentElement.style.setProperty("--bg1", "#12150f");
    document.documentElement.style.setProperty("--bg2", "#080a08");
    return;
  }
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    try {
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d", { willReadFrequently: true });
      c.width = c.height = 24;
      ctx.drawImage(img, 0, 0, 24, 24);
      const d = ctx.getImageData(0, 0, 24, 24).data;
      let r = 0, g = 0, b = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) {
        const br = (d[i] + d[i + 1] + d[i + 2]) / 3;
        if (br > 18 && br < 240) {
          r += d[i];
          g += d[i + 1];
          b += d[i + 2];
          n++;
        }
      }
      if (!n) return;
      r = Math.round(r / n);
      g = Math.round(g / n);
      b = Math.round(b / n);
      document.documentElement.style.setProperty("--accent", `rgb(${r} ${g} ${b})`);
      document.documentElement.style.setProperty("--glow", `rgba(${r},${g},${b},.22)`);
      document.documentElement.style.setProperty("--bg1", `rgb(${Math.round(r * 0.11)} ${Math.round(g * 0.11)} ${Math.round(b * 0.11)})`);
      document.documentElement.style.setProperty("--bg2", `rgb(${Math.round(r * 0.035)} ${Math.round(g * 0.035)} ${Math.round(b * 0.035)})`);
    } catch {}
  };
  img.src = url;
}

/* -------------------------------------------------------------------------- */
/*                         YOUTUBE DATA API SERVICE                           */
/* -------------------------------------------------------------------------- */

async function fetchYouTubePlaylist(playlistId, apiKey) {
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }

  // 1. Fetch Playlist Details (Title, Description, Thumbnails)
  const metaUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${encodeURIComponent(playlistId)}&key=${apiKey}`;
  const metaRes = await fetch(metaUrl);
  const metaData = await metaRes.json();

  if (!metaRes.ok) {
    handleApiError(metaData);
  }
  if (!metaData.items || metaData.items.length === 0) {
    throw new Error("PLAYLIST_NOT_FOUND");
  }

  const snippet = metaData.items[0].snippet || {};
  const playlistTitle = snippet.title || "YouTube Playlist";
  const playlistDesc = snippet.description || "";
  const playlistCover = snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || "";

  // 2. Fetch Playlist Items (videos) with pagination
  let items = [];
  let nextPageToken = "";
  const maxToFetch = 150; // Cap to prevent exceeding quota or excessive network usage

  do {
    const pageParam = nextPageToken ? `&pageToken=${nextPageToken}` : "";
    const itemsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=50&playlistId=${encodeURIComponent(playlistId)}${pageParam}&key=${apiKey}`;
    const itemsRes = await fetch(itemsUrl);
    const itemsData = await itemsRes.json();

    if (!itemsRes.ok) {
      handleApiError(itemsData);
    }

    if (itemsData.items) {
      items.push(...itemsData.items);
    }

    nextPageToken = itemsData.nextPageToken || "";
  } while (nextPageToken && items.length < maxToFetch);

  // 3. Filter out unavailable or private videos
  const validItems = items.filter(item => {
    const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
    const title = item.snippet?.title || "";
    const isPrivate = item.status?.privacyStatus === "private";
    const isDeleted = title === "Private video" || title === "Deleted video";
    return videoId && !isPrivate && !isDeleted;
  });

  if (validItems.length === 0) {
    throw new Error("EMPTY_OR_UNAVAILABLE");
  }

  // 4. Fetch durations in batches of 50
  const videoIds = validItems.map(item => item.contentDetails?.videoId || item.snippet?.resourceId?.videoId);
  const durationMap = {};

  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50).join(",");
    try {
      const vidUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${batch}&key=${apiKey}`;
      const vidRes = await fetch(vidUrl);
      const vidData = await vidRes.json();
      if (vidData.items) {
        for (const vid of vidData.items) {
          if (vid.contentDetails?.duration) {
            durationMap[vid.id] = parseIsoDuration(vid.contentDetails.duration);
          }
        }
      }
    } catch {}
  }

  // 5. Build clean internal Song models avoiding duplicate video IDs
  const seenVideoIds = new Set();
  const songs = [];

  validItems.forEach((item, idx) => {
    const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
    if (!videoId || seenVideoIds.has(videoId)) return;
    seenVideoIds.add(videoId);

    const snip = item.snippet || {};
    const thumb = snip.thumbnails?.high?.url || snip.thumbnails?.medium?.url || snip.thumbnails?.default?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    songs.push({
      id: `song_${playlistId}_${videoId}`,
      youtubeVideoId: videoId,
      title: snip.title || "Unknown Title",
      artist: snip.videoOwnerChannelTitle || snip.channelTitle || "YouTube",
      thumbnail: thumb,
      duration: durationMap[videoId] || "0:00",
      position: songs.length,
      available: true
    });
  });

  return {
    title: playlistTitle,
    description: playlistDesc,
    coverImage: playlistCover,
    songs
  };
}

function handleApiError(resData) {
  const err = resData.error || {};
  const reason = err.errors?.[0]?.reason || "";
  const code = err.code;

  if (code === 403 && (reason === "quotaExceeded" || reason === "rateLimitExceeded")) {
    throw new Error("QUOTA_EXCEEDED");
  }
  if (code === 400 || reason === "keyInvalid") {
    throw new Error("INVALID_API_KEY");
  }
  if (code === 404 || reason === "playlistNotFound") {
    throw new Error("PLAYLIST_NOT_FOUND");
  }
  throw new Error("API_ERROR: " + (err.message || "Failed to fetch from YouTube."));
}

/**
 * Fetch playlist metadata and songs without requiring a YouTube Data API key.
 * 1. Uses YouTube's official CORS-enabled oEmbed endpoint for metadata.
 * 2. Fetches full track listing via public RSS feeds through CORS proxies.
 * 3. Fallbacks gracefully so public/unlisted playlists always import cleanly.
 */
async function fetchYouTubePlaylistNoKey(playlistId, customName = "") {
  // 1. Fetch metadata directly from YouTube oEmbed (native CORS support from Google)
  let oembedData = null;
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https%3A%2F%2Fwww.youtube.com%2Fplaylist%3Flist%3D${encodeURIComponent(playlistId)}&format=json`;
    const res = await fetch(oembedUrl);
    if (res.ok) {
      oembedData = await res.json();
    }
  } catch {}

  // 2. Fetch tracks from YouTube public RSS feed via CORS proxies
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(playlistId)}`;
  const proxyMakers = [
    url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    url => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
    url => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
  ];

  let xmlText = "";
  for (const makeProxy of proxyMakers) {
    try {
      const pUrl = makeProxy(rssUrl);
      const res = await fetch(pUrl);
      if (res.ok) {
        const text = await res.text();
        if (text && text.includes("<feed")) {
          xmlText = text;
          break;
        }
      }
    } catch {}
  }

  // 3. Parse XML if available
  if (xmlText && xmlText.includes("<feed")) {
    try {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "application/xml");

      const feedTitle = xml.querySelector("feed > title")?.textContent || oembedData?.title || customName || "YouTube Playlist";
      const feedAuthor = xml.querySelector("feed > author > name")?.textContent || oembedData?.author_name || "YouTube";
      const entries = Array.from(xml.querySelectorAll("entry"));

      if (entries.length > 0) {
        const songs = [];
        const seenVideoIds = new Set();

        entries.forEach(entry => {
          const videoId = entry.getElementsByTagName("yt:videoId")[0]?.textContent ||
                          entry.querySelector("videoId")?.textContent || "";
          if (!videoId || seenVideoIds.has(videoId)) return;
          seenVideoIds.add(videoId);

          const title = entry.querySelector("title")?.textContent || "Unknown Title";
          const author = entry.querySelector("author > name")?.textContent || feedAuthor;
          const thumb = entry.getElementsByTagName("media:thumbnail")[0]?.getAttribute("url") ||
                        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

          songs.push({
            id: `song_${playlistId}_${videoId}`,
            youtubeVideoId: videoId,
            title: title.trim(),
            artist: author.trim(),
            thumbnail: thumb,
            duration: "—",
            position: songs.length,
            available: true
          });
        });

        if (songs.length > 0) {
          return {
            title: customName || feedTitle,
            description: `YouTube Playlist • ${feedAuthor}`,
            coverImage: songs[0].thumbnail,
            songs
          };
        }
      }
    } catch {}
  }

  // 4. If RSS proxies were unreachable or blocked, fallback to oEmbed metadata
  if (oembedData) {
    const thumbUrl = oembedData.thumbnail_url || "";
    const match = thumbUrl.match(/\/vi\/([a-zA-Z0-9_-]{11})\//);
    const firstVideoId = match ? match[1] : "";

    const songs = [];
    if (firstVideoId) {
      songs.push({
        id: `song_${playlistId}_${firstVideoId}`,
        youtubeVideoId: firstVideoId,
        title: oembedData.title || customName || "Track 1",
        artist: oembedData.author_name || "YouTube",
        thumbnail: thumbUrl,
        duration: "—",
        position: 0,
        available: true
      });
    }

    return {
      title: customName || oembedData.title || "YouTube Playlist",
      description: oembedData.author_name ? `Created by ${oembedData.author_name}` : "YouTube Playlist",
      coverImage: thumbUrl,
      songs
    };
  }

  // 5. If oEmbed also returned 404/400 or network failed, check if playlist ID is a valid ID string
  if (/^[A-Za-z0-9_-]{10,64}$/.test(playlistId)) {
    return {
      title: customName || "YouTube Playlist",
      description: "YouTube Playlist",
      coverImage: `https://i.ytimg.com/vi/${playlistId}/hqdefault.jpg`,
      songs: []
    };
  }

  throw new Error("Could not find this YouTube playlist. Please check that the URL or playlist ID is complete and set to Public or Unlisted.");
}

/* -------------------------------------------------------------------------- */
/*                          YOUTUBE IFRAME PLAYER                             */
/* -------------------------------------------------------------------------- */

window.onYouTubeIframeAPIReady = function() {
  ytPlayer = new YT.Player("ytPlayer", {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
      playsinline: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onError: onPlayerError
    }
  });
};

function onPlayerReady() {
  ytPlayerReady = true;
  if (appState.volume !== undefined && ytPlayer.setVolume) {
    ytPlayer.setVolume(appState.volume * 100);
  }
  // Cue current song or playlist
  const currentSong = getCurrentSong();
  const currentPl = getCurrentPlaylist();
  if (currentSong && currentSong.youtubeVideoId) {
    ytPlayer.cueVideoById(currentSong.youtubeVideoId);
  } else if (currentPl && currentPl.youtubePlaylistId) {
    try {
      ytPlayer.cuePlaylist({ list: currentPl.youtubePlaylistId });
    } catch {}
  }
  updateArtworkView();
}

function onPlayerStateChange(event) {
  const playBtn = $("play");
  if (event.data === YT.PlayerState.PLAYING) {
    playBtn.textContent = "Ⅱ";
    startTimeUpdateTimer();
    updateArtworkView();
    $("playerStatusLabel").textContent = "NOW PLAYING";

    // Auto-discover remaining tracks directly from YouTube player
    try {
      if (ytPlayer && ytPlayer.getPlaylist) {
        const ids = ytPlayer.getPlaylist();
        const pl = getCurrentPlaylist();
        if (Array.isArray(ids) && ids.length > 0 && pl && pl.songs) {
          const existingIds = new Set(pl.songs.map(s => s.youtubeVideoId));
          let changed = false;
          ids.forEach(vid => {
            if (!existingIds.has(vid)) {
              existingIds.add(vid);
              pl.songs.push({
                id: `song_${pl.id}_${vid}`,
                youtubeVideoId: vid,
                title: `Track ${pl.songs.length + 1}`,
                artist: pl.name || "YouTube",
                thumbnail: `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
                duration: "—",
                position: pl.songs.length,
                available: true
              });
              changed = true;
            }
          });
          if (changed) {
            saveState();
            renderQueue();
          }
        }
      }

      // Update current song title/artist from YouTube player's live video data
      if (ytPlayer && ytPlayer.getVideoData) {
        const data = ytPlayer.getVideoData();
        const pl = getCurrentPlaylist();
        if (data && data.video_id && pl && pl.songs) {
          const s = pl.songs.find(x => x.youtubeVideoId === data.video_id);
          if (s) {
            if (data.title && (s.title === "Track 1" || s.title.startsWith("Track ") || s.title === pl.name)) {
              s.title = data.title;
              $("title").textContent = s.title;
            }
            if (data.author && (!s.artist || s.artist === "YouTube" || s.artist === pl.name)) {
              s.artist = data.author;
              $("artist").textContent = s.artist;
            }
            saveState();
            renderQueue();
          }
        }
      }
    } catch {}
  } else if (event.data === YT.PlayerState.PAUSED) {
    playBtn.textContent = "▶";
    stopTimeUpdateTimer();
    $("playerStatusLabel").textContent = "PAUSED";
  } else if (event.data === YT.PlayerState.ENDED) {
    playBtn.textContent = "▶";
    stopTimeUpdateTimer();
    // Auto-advance to next song in current playlist
    handleNextSong(true);
  } else if (event.data === YT.PlayerState.BUFFERING) {
    $("playerStatusLabel").textContent = "BUFFERING...";
  }
}

function onPlayerError(event) {
  console.warn("YouTube Player error:", event.data);
  showToast("Playback issue with this track. Skipping to next song...");
  setTimeout(() => handleNextSong(true), 1500);
}

function startTimeUpdateTimer() {
  stopTimeUpdateTimer();
  timeUpdateInterval = setInterval(() => {
    if (!ytPlayer || !ytPlayerReady || isSeeking) return;
    try {
      const current = ytPlayer.getCurrentTime ? ytPlayer.getCurrentTime() : 0;
      const duration = ytPlayer.getDuration ? ytPlayer.getDuration() : 0;
      $("current").textContent = fmt(current);
      if (duration > 0) {
        $("total").textContent = fmt(duration);
        $("seek").value = (current / duration) * 100;
      }
    } catch {}
  }, 250);
}

function stopTimeUpdateTimer() {
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval);
    timeUpdateInterval = null;
  }
}

/* -------------------------------------------------------------------------- */
/*                            PLAYER PLAYBACK LOGIC                           */
/* -------------------------------------------------------------------------- */

function selectSong(songIndex, playNow = true) {
  const pl = getCurrentPlaylist();
  if (!pl || !pl.songs || !pl.songs[songIndex]) return;

  appState.currentSongIndex = songIndex;
  const song = pl.songs[songIndex];

  $("title").textContent = song.title;
  $("artist").textContent = song.artist || "YouTube";
  $("seek").value = 0;
  $("current").textContent = "0:00";
  $("total").textContent = song.duration || "0:00";

  updateArtworkView();
  setColor(song.thumbnail);
  renderQueue();
  saveState();

  if (ytPlayer && ytPlayerReady && song.youtubeVideoId) {
    if (playNow) {
      ytPlayer.loadVideoById(song.youtubeVideoId);
    } else {
      ytPlayer.cueVideoById(song.youtubeVideoId);
    }
  }
}

function togglePlay() {
  if (!ytPlayer || !ytPlayerReady) return;
  const pl = getCurrentPlaylist();
  if (!pl) return;

  if (!pl.songs || !pl.songs.length) {
    if (pl.youtubePlaylistId) {
      try {
        ytPlayer.loadPlaylist({ list: pl.youtubePlaylistId });
      } catch {}
    }
    return;
  }

  try {
    const state = ytPlayer.getPlayerState ? ytPlayer.getPlayerState() : -1;
    if (state === YT.PlayerState.PLAYING) {
      ytPlayer.pauseVideo();
    } else {
      // If no video is currently loaded, load current song
      const currentSong = getCurrentSong();
      if (currentSong && state === -1) {
        ytPlayer.loadVideoById(currentSong.youtubeVideoId);
      } else {
        ytPlayer.playVideo();
      }
    }
  } catch {
    const currentSong = getCurrentSong();
    if (currentSong) {
      ytPlayer.loadVideoById(currentSong.youtubeVideoId);
    }
  }
}

function handleNextSong(playNow = true) {
  const pl = getCurrentPlaylist();
  if (!pl || !pl.songs.length) return;
  const nextIdx = (appState.currentSongIndex + 1) % pl.songs.length;
  selectSong(nextIdx, playNow);
}

function handlePrevSong() {
  const pl = getCurrentPlaylist();
  if (!pl || !pl.songs.length) return;

  if (ytPlayer && ytPlayerReady) {
    try {
      const current = ytPlayer.getCurrentTime ? ytPlayer.getCurrentTime() : 0;
      if (current > 3) {
        ytPlayer.seekTo(0, true);
        return;
      }
    } catch {}
  }

  const prevIdx = (appState.currentSongIndex - 1 + pl.songs.length) % pl.songs.length;
  selectSong(prevIdx, true);
}

function updateArtworkView() {
  const song = getCurrentSong();
  const artImg = $("artwork");
  const placeholder = $("placeholder");
  const artWrap = document.querySelector(".art-wrap");

  if (appState.showVideo) {
    artWrap.classList.add("show-video");
    $("mediaToggle").textContent = "🖼️ Art";
  } else {
    artWrap.classList.remove("show-video");
    $("mediaToggle").textContent = "🎬 Video";
  }

  if (song && song.thumbnail) {
    artImg.src = song.thumbnail;
    artImg.classList.remove("hidden");
    placeholder.classList.add("hidden");
  } else {
    artImg.classList.add("hidden");
    placeholder.classList.remove("hidden");
  }
}

/* -------------------------------------------------------------------------- */
/*                               RENDERING UI                                 */
/* -------------------------------------------------------------------------- */

function render() {
  renderPlaylistTabs();
  renderQueue();
  renderPlayerInfo();
}

function renderPlaylistTabs() {
  const tabsContainer = $("playlistTabs");
  const toolbar = $("playlistToolbar");

  if (!appState.playlists.length) {
    tabsContainer.innerHTML = `<span class="empty-hint" style="color:#777e75;font-size:12px;padding:6px 0;">No playlists yet.</span>`;
    toolbar.classList.add("hidden");
    return;
  }

  toolbar.classList.remove("hidden");
  tabsContainer.innerHTML = appState.playlists.map(pl => {
    const isActive = pl.id === appState.selectedPlaylistId;
    const songCount = pl.songs ? pl.songs.length : 0;
    return `
      <button class="playlist-pill ${isActive ? "active" : ""}" data-playlist-id="${pl.id}" role="tab" aria-selected="${isActive}">
        <span>♫</span>
        <span class="pill-name">${esc(pl.name)}</span>
        <span class="pill-count">${songCount}</span>
      </button>
    `;
  }).join("");

  // Attach click events to tabs
  tabsContainer.querySelectorAll(".playlist-pill").forEach(pill => {
    pill.onclick = () => {
      const pid = pill.dataset.playlistId;
      if (pid !== appState.selectedPlaylistId) {
        switchPlaylist(pid);
      }
    };
  });
}

function renderQueue() {
  const currentPl = getCurrentPlaylist();
  const listEl = $("list");
  const countEl = $("count");
  const queueTitleEl = $("queuePlaylistTitle");
  const queueDescEl = $("queuePlaylistDesc");

  if (!currentPl) {
    countEl.textContent = "0 songs";
    queueTitleEl.textContent = "NO PLAYLIST SELECTED";
    queueDescEl.textContent = "";
    listEl.className = "empty";
    listEl.innerHTML = `
      No playlists yet.<br>
      Add a YouTube playlist to start listening.
      <div class="empty-action">
        <button class="add-btn" onclick="openAddPlaylistModal()">＋ Add Playlist</button>
      </div>
    `;
    return;
  }

  queueTitleEl.textContent = currentPl.name;
  queueDescEl.textContent = currentPl.description ? `• ${currentPl.description}` : "";
  const songs = currentPl.songs || [];
  countEl.textContent = `${songs.length} song${songs.length === 1 ? "" : "s"}`;

  if (!songs.length) {
    listEl.className = "empty";
    listEl.innerHTML = `No playable songs in this playlist.`;
    return;
  }

  listEl.className = "";
  listEl.innerHTML = songs.map((s, i) => `
    <div class="song ${i === appState.currentSongIndex ? "active" : ""}" data-index="${i}">
      <div class="thumb">
        ${s.thumbnail ? `<img src="${s.thumbnail}" alt="" loading="lazy">` : "♫"}
      </div>
      <div>
        <div class="name">${esc(s.title)}</div>
        <div class="sub">${esc(s.artist)}</div>
      </div>
      <span class="duration">${s.duration || "—"}</span>
    </div>
  `).join("");

  listEl.querySelectorAll(".song").forEach(row => {
    row.onclick = () => {
      selectSong(Number(row.dataset.index), true);
    };
  });
}

function renderPlayerInfo() {
  const song = getCurrentSong();
  if (song) {
    $("title").textContent = song.title;
    $("artist").textContent = song.artist || "YouTube";
    $("total").textContent = song.duration || "0:00";
    setColor(song.thumbnail);
  } else {
    $("title").textContent = "No song selected";
    $("artist").textContent = "Select a playlist and song to start";
    $("total").textContent = "0:00";
    setColor(null);
  }
  updateArtworkView();
}

function switchPlaylist(playlistId) {
  appState.selectedPlaylistId = playlistId;
  appState.currentSongIndex = 0;
  saveState();
  render();

  const pl = getCurrentPlaylist();
  const song = getCurrentSong();
  if (song) {
    selectSong(0, false);
  } else if (pl && pl.youtubePlaylistId && ytPlayer && ytPlayerReady) {
    try {
      ytPlayer.cuePlaylist({ list: pl.youtubePlaylistId });
    } catch {}
  }
  autoFetchActivePlaylistIfKeyAvailable();
}

/* -------------------------------------------------------------------------- */
/*                            PLAYLIST MANAGEMENT                             */
/* -------------------------------------------------------------------------- */

function openAddPlaylistModal() {
  const modal = $("addPlaylistModal");
  $("playlistUrlInput").value = "";
  $("playlistNameInput").value = "";
  setStatus("addModalStatus", "", "");
  modal.classList.remove("hidden");
  $("playlistUrlInput").focus();
}

function closeAddPlaylistModal() {
  $("addPlaylistModal").classList.add("hidden");
  setLoadingState(false);
}

function setLoadingState(loading) {
  const spinner = $("addSpinner");
  const confirmBtn = $("confirmAddBtn");
  const btnText = confirmBtn.querySelector(".btn-text");

  if (loading) {
    spinner.classList.remove("hidden");
    btnText.textContent = "Importing...";
    confirmBtn.disabled = true;
  } else {
    spinner.classList.add("hidden");
    btnText.textContent = "Import Playlist";
    confirmBtn.disabled = false;
  }
}

function setStatus(elementId, text, type = "info") {
  const el = $(elementId);
  if (!text) {
    el.classList.add("hidden");
    el.textContent = "";
    el.className = "modal-status hidden";
    return;
  }
  el.textContent = text;
  el.className = `modal-status ${type}`;
  el.classList.remove("hidden");
}

async function handleAddPlaylistSubmit() {
  const urlInput = $("playlistUrlInput").value.trim();
  const nameInput = $("playlistNameInput").value.trim();

  if (!urlInput) {
    setStatus("addModalStatus", "Please enter a valid YouTube playlist URL or ID.", "error");
    return;
  }

  const playlistId = extractPlaylistId(urlInput);
  if (!playlistId) {
    setStatus("addModalStatus", "Could not extract a valid YouTube playlist ID from the link provided.", "error");
    return;
  }

  // Duplicate check (Requirement 12)
  const existing = appState.playlists.find(p => p.id === playlistId || p.youtubePlaylistId === playlistId);
  if (existing) {
    setStatus("addModalStatus", `This playlist is already imported as "${existing.name}". Switch to it or use "↻ Refresh" to update.`, "error");
    return;
  }

  const apiKey = getApiKey();

  setLoadingState(true);
  setStatus("addModalStatus", "Fetching playlist tracks from YouTube...", "info");

  try {
    let fetched;
    if (apiKey) {
      try {
        fetched = await fetchYouTubePlaylist(playlistId, apiKey);
      } catch (apiErr) {
        console.warn("YouTube Data API failed, trying public feed fallback...", apiErr);
        fetched = await fetchYouTubePlaylistNoKey(playlistId, nameInput);
      }
    } else {
      fetched = await fetchYouTubePlaylistNoKey(playlistId, nameInput);
    }

    const newPlaylist = {
      id: playlistId,
      name: nameInput || fetched.title,
      description: fetched.description,
      coverImage: fetched.coverImage,
      youtubePlaylistId: playlistId,
      youtubePlaylistUrl: `https://www.youtube.com/playlist?list=${playlistId}`,
      songs: fetched.songs,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    appState.playlists.push(newPlaylist);
    appState.selectedPlaylistId = newPlaylist.id;
    appState.currentSongIndex = 0;
    saveState();

    closeAddPlaylistModal();
    render();

    if (newPlaylist.songs.length > 0) {
      selectSong(0, true);
    }

    showToast(`Playlist "${newPlaylist.name}" imported with ${newPlaylist.songs.length} songs!`);
  } catch (err) {
    setLoadingState(false);
    let msg = "An error occurred while importing the playlist.";
    if (err.message === "PLAYLIST_NOT_FOUND") {
      msg = "Playlist not found or is set to private. Make sure the playlist is public or unlisted.";
    } else if (err.message === "QUOTA_EXCEEDED") {
      msg = "YouTube API quota exceeded for today. Please try again later or use a different key.";
    } else if (err.message === "EMPTY_OR_UNAVAILABLE") {
      msg = "This playlist contains no public playable songs.";
    } else if (err.message === "INVALID_API_KEY") {
      msg = "The YouTube API key is invalid or restricted. Please check your credentials.";
    } else if (err.message.startsWith("API_ERROR:")) {
      msg = err.message.replace("API_ERROR:", "").trim();
    } else if (err.message) {
      msg = err.message;
    }
    setStatus("addModalStatus", msg, "error");
  }
}

async function refreshActivePlaylist() {
  const pl = getCurrentPlaylist();
  if (!pl) return;

  if (!pl.youtubePlaylistId) {
    showToast("This playlist does not have a linked YouTube Playlist ID.");
    return;
  }

  const apiKey = getApiKey();
  const refreshBtn = $("refreshPlaylistBtn");
  refreshBtn.textContent = "↻ Refreshing...";
  refreshBtn.disabled = true;

  try {
    let fetched;
    if (apiKey) {
      try {
        fetched = await fetchYouTubePlaylist(pl.youtubePlaylistId, apiKey);
      } catch (apiErr) {
        console.warn("YouTube Data API failed, trying public feed fallback...", apiErr);
        fetched = await fetchYouTubePlaylistNoKey(pl.youtubePlaylistId);
      }
    } else {
      fetched = await fetchYouTubePlaylistNoKey(pl.youtubePlaylistId);
    }

    // Merge songs while preserving existing IDs and adding new tracks
    const existingSongMap = new Map();
    (pl.songs || []).forEach(s => existingSongMap.set(s.youtubeVideoId, s));

    const updatedSongs = fetched.songs.map((newSong, idx) => {
      const existing = existingSongMap.get(newSong.youtubeVideoId);
      if (existing) {
        return {
          ...existing,
          title: newSong.title,
          artist: newSong.artist,
          thumbnail: newSong.thumbnail,
          duration: newSong.duration || existing.duration,
          position: idx
        };
      }
      return {
        ...newSong,
        position: idx
      };
    });

    pl.songs = updatedSongs;
    pl.updatedAt = Date.now();
    if (!pl.coverImage && fetched.coverImage) {
      pl.coverImage = fetched.coverImage;
    }

    saveState();
    render();
    showToast(`Playlist refreshed! (${updatedSongs.length} songs)`);
  } catch (err) {
    console.error("Refresh failed:", err);
    showToast(`Failed to refresh playlist: ${err.message}`);
  } finally {
    refreshBtn.textContent = "↻ Refresh";
    refreshBtn.disabled = false;
  }
}

function openRenameModal() {
  const pl = getCurrentPlaylist();
  if (!pl) return;
  $("renameInput").value = pl.name;
  $("renameModal").classList.remove("hidden");
  $("renameInput").focus();
}

function closeRenameModal() {
  $("renameModal").classList.add("hidden");
}

function handleRenameSubmit() {
  const pl = getCurrentPlaylist();
  const val = $("renameInput").value.trim();
  if (!pl || !val) return;
  pl.name = val;
  pl.updatedAt = Date.now();
  saveState();
  closeRenameModal();
  render();
  showToast(`Playlist renamed to "${val}".`);
}

function openDeleteModal() {
  const pl = getCurrentPlaylist();
  if (!pl) return;
  activePlaylistToDelete = pl;
  $("deleteMessage").textContent = `Are you sure you want to delete the playlist "${pl.name}"?`;
  $("deleteModal").classList.remove("hidden");
}

function closeDeleteModal() {
  $("deleteModal").classList.add("hidden");
  activePlaylistToDelete = null;
}

function confirmDeletePlaylist() {
  if (!activePlaylistToDelete) return;
  const deletedId = activePlaylistToDelete.id;
  const deletedName = activePlaylistToDelete.name;

  appState.playlists = appState.playlists.filter(p => p.id !== deletedId);

  // If deleted playlist was active, select next available playlist
  if (appState.selectedPlaylistId === deletedId) {
    if (appState.playlists.length > 0) {
      appState.selectedPlaylistId = appState.playlists[0].id;
      appState.currentSongIndex = 0;
    } else {
      appState.selectedPlaylistId = null;
      appState.currentSongIndex = -1;
    }
  }

  saveState();
  closeDeleteModal();
  render();

  const currentSong = getCurrentSong();
  if (currentSong) {
    selectSong(appState.currentSongIndex, false);
  } else {
    renderPlayerInfo();
  }

  showToast(`Playlist "${deletedName}" deleted.`);
}

/* -------------------------------------------------------------------------- */
/*                             SETTINGS MODAL                                 */
/* -------------------------------------------------------------------------- */

function openSettingsModal() {
  const key = getApiKey();
  const input = $("apiKeyInput");
  input.value = appState.userApiKey || "";
  if (!input.value && key) {
    input.placeholder = "Active via config.js";
  } else {
    input.placeholder = "AIzaSy...";
  }
  updateKeyStatusDisplay();
  $("settingsModal").classList.remove("hidden");
}

function closeSettingsModal() {
  $("settingsModal").classList.add("hidden");
}

function updateKeyStatusDisplay() {
  const indicator = $("keyStatusIndicator");
  const text = $("keyStatusText");
  const key = getApiKey();

  if (key) {
    indicator.className = "status-indicator active";
    if (appState.userApiKey) {
      text.textContent = `API Key active (saved locally in browser)`;
    } else {
      text.textContent = `API Key active (configured in config.js)`;
    }
  } else {
    indicator.className = "status-indicator";
    text.textContent = "No API Key configured. Public playlists import automatically via public feeds.";
  }
}

function saveApiKey() {
  const val = $("apiKeyInput").value.trim();
  appState.userApiKey = val;
  saveState();
  updateKeyStatusDisplay();
  showToast(val ? "API Key saved successfully!" : "Local API Key cleared.");
  closeSettingsModal();
  if (val) {
    autoFetchActivePlaylistIfKeyAvailable();
    refreshAllPlaylistsIfKeyAvailable();
  }
}

function clearApiKey() {
  appState.userApiKey = "";
  $("apiKeyInput").value = "";
  saveState();
  updateKeyStatusDisplay();
  showToast("API Key removed from browser storage.");
}

/* -------------------------------------------------------------------------- */
/*                           ATTACH EVENT LISTENERS                           */
/* -------------------------------------------------------------------------- */

function initEventListeners() {
  // Navigation & Modals
  $("addPlaylistBtn").onclick = openAddPlaylistModal;
  $("closeAddModal").onclick = closeAddPlaylistModal;
  $("cancelAddBtn").onclick = closeAddPlaylistModal;
  $("confirmAddBtn").onclick = handleAddPlaylistSubmit;

  $("refreshPlaylistBtn").onclick = refreshActivePlaylist;
  $("renamePlaylistBtn").onclick = openRenameModal;
  $("closeRenameModal").onclick = closeRenameModal;
  $("cancelRenameBtn").onclick = closeRenameModal;
  $("confirmRenameBtn").onclick = handleRenameSubmit;

  $("deletePlaylistBtn").onclick = openDeleteModal;
  $("closeDeleteModal").onclick = closeDeleteModal;
  $("cancelDeleteBtn").onclick = closeDeleteModal;
  $("confirmDeleteBtn").onclick = confirmDeletePlaylist;

  $("settingsBtn").onclick = openSettingsModal;
  $("closeSettingsModal").onclick = closeSettingsModal;
  $("saveKeyBtn").onclick = saveApiKey;
  $("removeKeyBtn").onclick = clearApiKey;

  // Media Toggle (Album Art vs Video)
  $("mediaToggle").onclick = () => {
    appState.showVideo = !appState.showVideo;
    saveState();
    updateArtworkView();
  };

  // Player controls
  $("play").onclick = togglePlay;
  $("next").onclick = () => handleNextSong(true);
  $("prev").onclick = handlePrevSong;

  // Volume
  const volEl = $("volume");
  volEl.value = appState.volume;
  volEl.oninput = e => {
    const val = Number(e.target.value);
    appState.volume = val;
    saveState();
    if (ytPlayer && ytPlayerReady && ytPlayer.setVolume) {
      ytPlayer.setVolume(val * 100);
    }
  };

  // Seek bar
  const seekEl = $("seek");
  seekEl.onmousedown = () => { isSeeking = true; };
  seekEl.ontouchstart = () => { isSeeking = true; };
  seekEl.onmouseup = () => { isSeeking = false; };
  seekEl.ontouchend = () => { isSeeking = false; };

  seekEl.oninput = e => {
    if (!ytPlayer || !ytPlayerReady) return;
    try {
      const duration = ytPlayer.getDuration ? ytPlayer.getDuration() : 0;
      if (duration > 0) {
        const targetSec = duration * (Number(e.target.value) / 100);
        $("current").textContent = fmt(targetSec);
        ytPlayer.seekTo(targetSec, true);
      }
    } catch {}
  };

  // Form submission on Enter
  $("addPlaylistForm").onsubmit = e => {
    e.preventDefault();
    handleAddPlaylistSubmit();
  };
  $("renameForm").onsubmit = e => {
    e.preventDefault();
    handleRenameSubmit();
  };

  // Close modals on clicking backdrop
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", e => {
      if (e.target === backdrop) {
        backdrop.classList.add("hidden");
      }
    });
  });

  // Keyboard shortcut support: Space (play/pause), ArrowLeft/Right (prev/next), Escape (close modals)
  window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeAddPlaylistModal();
      closeRenameModal();
      closeDeleteModal();
      closeSettingsModal();
      return;
    }

    const tag = e.target.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
    } else if (e.code === "ArrowRight") {
      handleNextSong(true);
    } else if (e.code === "ArrowLeft") {
      handlePrevSong();
    }
  });
}

// Expose modal open function globally for dynamic empty state button
window.openAddPlaylistModal = openAddPlaylistModal;

/* -------------------------------------------------------------------------- */
/*                               INITIALIZATION                               */
/* -------------------------------------------------------------------------- */

async function autoFetchActivePlaylistIfKeyAvailable() {
  const pl = getCurrentPlaylist();
  if (!pl || !pl.youtubePlaylistId) return;
  const apiKey = getApiKey();

  if (apiKey) {
    try {
      const fetched = await fetchYouTubePlaylist(pl.youtubePlaylistId, apiKey);
      if (fetched && fetched.songs && fetched.songs.length > 0) {
        pl.songs = fetched.songs;
        pl.updatedAt = Date.now();
        if (fetched.coverImage && !pl.coverImage) pl.coverImage = fetched.coverImage;
        saveState();
        renderQueue();
        renderPlayerInfo();
      }
    } catch (e) {
      // Silently handle background refresh errors
    }
  } else if (!pl.songs || pl.songs.length === 0) {
    try {
      const fetched = await fetchYouTubePlaylistNoKey(pl.youtubePlaylistId);
      if (fetched && fetched.songs && fetched.songs.length > 0) {
        pl.songs = fetched.songs;
        pl.updatedAt = Date.now();
        if (fetched.coverImage && !pl.coverImage) pl.coverImage = fetched.coverImage;
        saveState();
        renderQueue();
        renderPlayerInfo();
      }
    } catch (e) {}
  }
}

async function refreshAllPlaylistsIfKeyAvailable() {
  const apiKey = getApiKey();
  if (!apiKey) return;

  for (const pl of appState.playlists) {
    if (pl.youtubePlaylistId && (!pl.songs || pl.songs.length <= 3)) {
      try {
        const fetched = await fetchYouTubePlaylist(pl.youtubePlaylistId, apiKey);
        if (fetched && fetched.songs && fetched.songs.length > 0) {
          pl.songs = fetched.songs;
          pl.updatedAt = Date.now();
          if (fetched.coverImage && !pl.coverImage) pl.coverImage = fetched.coverImage;
          saveState();
          if (pl.id === appState.selectedPlaylistId) {
            renderQueue();
            renderPlayerInfo();
          }
        }
      } catch (e) {
        console.warn("Could not auto-fetch playlist:", pl.name, e);
      }
    }
  }
}

function init() {
  loadState();
  initEventListeners();
  render();

  const currentSong = getCurrentSong();
  if (currentSong) {
    $("title").textContent = currentSong.title;
    $("artist").textContent = currentSong.artist;
    $("total").textContent = currentSong.duration || "0:00";
    setColor(currentSong.thumbnail);
    updateArtworkView();
  }

  // Fetch current videos from YouTube when API key is available
  autoFetchActivePlaylistIfKeyAvailable();
  if (getApiKey()) {
    refreshAllPlaylistsIfKeyAvailable();
  }
}

// Start application
init();

