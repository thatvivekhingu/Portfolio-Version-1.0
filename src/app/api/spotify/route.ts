import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

const FETCH_TIMEOUT_MS = 6000;

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!,
    }),
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  return response.json();
}

async function getNowPlaying(access_token: string) {
  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
}

async function getRecentlyPlayed(access_token: string) {
  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
}

export async function GET() {
  if (client_id && client_secret && refresh_token) {
    try {
      const { access_token } = await getAccessToken();

      if (access_token) {
        // 1. Try currently playing track
        const nowPlayingRes = await getNowPlaying(access_token);
        if (nowPlayingRes.status === 200) {
          const song = await nowPlayingRes.json();
          if (song && song.item) {
            return NextResponse.json({
              isPlaying: song.is_playing,
              title: song.item.name,
              artist: song.item.artists.map((artist: { name: string }) => artist.name).join(', '),
              album: song.item.album.name,
              albumImageUrl: song.item.album.images[0]?.url,
              songUrl: song.item.external_urls.spotify,
            });
          }
        }

        // 2. Fallback to recently played track
        const recentRes = await getRecentlyPlayed(access_token);
        if (recentRes.ok) {
          const data = await recentRes.json();
          const track = data.items[0]?.track;

          if (track) {
            return NextResponse.json({
              isPlaying: false,
              title: track.name,
              artist: track.artists.map((artist: { name: string }) => artist.name).join(', '),
              album: track.album.name,
              albumImageUrl: track.album.images[0]?.url,
              songUrl: track.external_urls.spotify,
            });
          }
        }
      }
    } catch (error) {
      console.warn('Spotify API fetch error, using fallback:', error);
    }
  }

  // Graceful fallback track for Vivek Hingu's portfolio (Yalgaar by CarryMinati & Wily Frenzy)
  return NextResponse.json({
    isPlaying: false,
    title: "Yalgaar",
    artist: "Ajey Nagar (CarryMinati), Wily Frenzy",
    album: "Yalgaar (Original)",
    albumImageUrl: "https://i.scdn.co/image/ab67616d0000b273ce729233cd521c983f779d51",
    songUrl: "https://open.spotify.com/track/0RGp4KA9wvndxqPIWoKwnD",
  });
}
