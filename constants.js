// Info constants
export const INFO_TIPS = [
  "Click on the album art to play/pause.",
  "Click the title section to copy the track URL.",
  "Scroll over the top panel label to adjust Spotify volume.",
  "Visit extension's settings to customize your gspotify experience.",
  "Adding a track to a playlist requires you to connect GSpotify to your Spotify account.",
];

// Spotify Scopes
export const scopes = [
  {
    id: "user-library-read",
    label: "Read User Library",
    default: false,
  },
  {
    id: "user-library-modify",
    label: "Modify User Library",
    default: false,
  },
  {
    id: "user-read-private",
    label: "Read Private User Data",
    default: false,
  },
  { id: "user-read-email", label: "Read Email Address", default: false },
  {
    id: "user-read-playback-state",
    label: "Read Playback State",
    default: false,
  },
  {
    id: "user-modify-playback-state",
    label: "Modify Playback State",
    default: false,
  },
  {
    id: "user-read-currently-playing",
    label: "Read Currently Playing",
    default: false,
  },
  {
    id: "user-read-recently-played",
    label: "Read Recently Played",
    default: false,
  },
  {
    id: "playlist-read-private",
    label: "Read Private Playlists - Necessary for Add to Playlist",
    default: true,
  },
  {
    id: "playlist-read-collaborative",
    label: "Read Collaborative Playlists - Necessary for Add to Playlist",
    default: true,
  },
  {
    id: "playlist-modify-public",
    label: "Modify Public Playlists - Necessary for Add to Playlist",
    default: true,
  },
  {
    id: "playlist-modify-private",
    label: "Modify Private Playlists - Necessary for Add to Playlist",
    default: true,
  },
  { id: "user-top-read", label: "Read Top Artists/Tracks", default: false },
  { id: "streaming", label: "Streaming (Web Playback SDK)", default: false },
];
