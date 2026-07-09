import Soup from "gi://Soup";
import GLib from "gi://GLib";
import { logInfo, logWarn } from "./utils.js";
import { getValidAccessToken } from "./spotify-auth.js";

const API_ENDPOINT = "https://api.spotify.com/v1";

let activeSessions = new Set();

async function apiRequest(method, path, body = null) {
  const accessToken = await getValidAccessToken();
  const session = new Soup.Session();
  activeSessions.add(session);

  const url = path.startsWith("http") ? path : `${API_ENDPOINT}${path}`;
  const msg = Soup.Message.new(method, url);
  msg.get_request_headers().append("Authorization", `Bearer ${accessToken}`);

  if (body !== null) {
    msg.get_request_headers().append("Content-Type", "application/json");
    const bodyBytes = new TextEncoder().encode(JSON.stringify(body));
    msg.set_request_body_from_bytes(
      "application/json",
      new GLib.Bytes(bodyBytes),
    );
  }

  try {
    const response = await new Promise((resolve, reject) => {
      session.send_and_read_async(
        msg,
        GLib.PRIORITY_DEFAULT,
        null,
        (_session, result) => {
          try {
            resolve(session.send_and_read_finish(result));
          } catch (e) {
            reject(e);
          }
        },
      );
    });

    const statusCode = msg.get_status();
    const rawData = response.get_data();
    const text = rawData ? new TextDecoder().decode(rawData) : "";

    if (statusCode < 200 || statusCode >= 300) {
      throw new Error(`Spotify API error ${statusCode}: ${text}`);
    }

    return text ? JSON.parse(text) : null;
  } finally {
    activeSessions.delete(session);
  }
}

export async function getSpotifyUsername() {
  const data = await apiRequest("GET", "/me");
  return data.display_name || data.id;
}

export async function getCurrentUserId() {
  const data = await apiRequest("GET", "/me");
  return data.id;
}

export async function isSpotifyLoggedIn() {
  try {
    const accessToken = await getValidAccessToken();
    return !!accessToken;
  } catch (e) {
    logWarn(`Failed to check Spotify login status: ${e.message}`);
    return false;
  }
}

export async function getWritablePlaylists() {
  const userId = await getCurrentUserId();
  const playlists = [];
  let url = "/me/playlists?limit=50";

  while (url) {
    const data = await apiRequest("GET", url);
    for (const playlist of data.items) {
      if (playlist.owner?.id === userId || playlist.collaborative) {
        playlists.push({ id: playlist.id, name: playlist.name });
      }
    }
    url = data.next;
  }

  return playlists;
}

export async function getPlaylistTrackUris(playlistId) {
  const uris = new Set();
  let url = `/playlists/${playlistId}/tracks?fields=items.track.uri,next&limit=100`;

  while (url) {
    const data = await apiRequest("GET", url);
    for (const item of data.items) {
      if (item.track?.uri) uris.add(item.track.uri);
    }
    url = data.next;
  }

  return uris;
}

export async function addTrackToPlaylist(playlistId, trackUri) {
  await apiRequest("POST", `/playlists/${playlistId}/tracks`, {
    uris: [trackUri],
  });
  logInfo(`Added ${trackUri} to playlist ${playlistId}`);
}

export async function removeTrackFromPlaylist(playlistId, trackUri) {
  await apiRequest("DELETE", `/playlists/${playlistId}/tracks`, {
    tracks: [{ uri: trackUri }],
  });
  logInfo(`Removed ${trackUri} from playlist ${playlistId}`);
}

export function cleanupSpotify() {
  for (const session of activeSessions) {
    session.abort();
  }
  logInfo("Active helper sessions cleared");
  activeSessions.clear();
}
