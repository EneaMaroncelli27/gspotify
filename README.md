<div style="display: flex; align-items: center;">
  <img src="./icons/gspotify-logo.svg" alt="Logo" width="100" height="200">
  <h1>GSpotify - GNOME Shell Extension</h1>
</div>

GSpotify is a GNOME Shell extension that integrates with the Spotify MPRIS interface to display current track information, album art, and playback controls directly in your top panel.

It is designed to be theme-aware, and customizable\*

---

## ✨ Features

- **Now Playing info**: Show track title and artist in the top bar.
- **Album Art**: Displays album art in the dropdown menu.
- **Playback Controls**: Play, pause, skip, seek, previous and volume control.
- **Progress Bar**: Live track progress indicator with dynamic accent color.
- **Theme-Aware Colors**: Colors adapt based on the dominant album art color.
- **Local Statistics**: Keep track of your listening habits.
- **Track Downloading**: Download and save tracks to your computer.
- **Ad handling**: Mute Spotify during an advertisement, or automatically restart Spotify to skip past it entirely (playback resumes on its own once it reopens).

---

## 📸 Media

![Examples](./media/gspotify-media.png)

---

## 🚧 Todo

- [x] Shuffle and repeat buttons if available.
- [x] Add support for track downloading.
- [x] Local Statistics.
- [ ] Synced and Plain Lyrics.

---

## 📦 Installation

1. Clone this repo into your local extensions directory:
   ```bash
   git clone git@github.com:EneaMaroncelli27/gspotify.git \
     ~/.local/share/gnome-shell/extensions/gspotify@sogi.is-a.dev
   ```
   (use `https://github.com/EneaMaroncelli27/gspotify.git` instead if you haven't set up SSH access to GitHub)
2. Compile schemas:
   ```bash
   glib-compile-schemas ~/.local/share/gnome-shell/extensions/gspotify@sogi.is-a.dev/schemas
   ```
3. Enable the extension:
   ```bash
   gnome-extensions enable gspotify@sogi.is-a.dev
   ```
4. Restart GNOME Shell (on X11 press `Alt+F2` then type `r` and hit enter to restart) or log out and log back in.

### Updating after pulling changes

Since this is a local checkout rather than an installed package, after `git pull` you need to recompile the schema again (step 2 above) and restart GNOME Shell (step 4) for changes to take effect.

---

## 🛠 Development

- Logs are available via:
  ```bash
  journalctl -f -o cat /usr/bin/gnome-shell
  ```
- Modify code and reload GNOME Shell to test changes.
- Schemas live in `schemas/org.gnome.shell.extensions.gspotify.gschema.xml`.
