import axios from "axios";

class ApiService {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL,
            headers: { "Content-Type": "application/json",},
        });

        this.client.interceptors.response.use(
            res => res.data,
            err => Promise.reject(err)
        );
    }

    get(url, params) { return this.client.get(url, { params }); }
    post(url, data) { return this.client.post(url, data); }
    put(url, data) { return this.client.put(url, data); }
    patch(url, data) { return this.client.patch(url, data); }
    delete(url) { return this.client.delete(url); }


    // Playlist
    getPlaylists() { return this.get("/playlists/"); }
    getPlaylist(id) { return this.get(`/playlists/${id}/`); }
    createPlaylist(data) { return this.post("/playlists/", data); }
    patchPlaylist(id, data) { return this.patch(`/playlists/${id}/`, data); }
    deletePlaylist(id) { return this.delete(`/playlists/${id}/`); }

    // Song
    createSong(data) { return this.post("/songs/", data); }
    patchSong(id, data) { return this.patch(`/songs/${id}/`, data); }
    deleteSong(id) { return this.delete(`/songs/${id}/`); }

    // Player
    addSong(data) { return this.post("/player/add/song/", data); }
    addPlaylist(data) { return this.post("/player/add/playlist/", data); }
    stop() { return this.post("/player/stop/"); }
    pause() { return this.post("/player/pause/"); }
    skip() { return this.post("/player/skip/"); }
    repeat() { return this.post("/player/repeat/"); }

}

export default new ApiService(
    import.meta.env.VITE_BASE_URL
);
