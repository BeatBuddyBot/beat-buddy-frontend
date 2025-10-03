import axios from "axios";

class ApiService {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    getPlaylists = () =>
        this.client.get("/playlists/").then(res => res.data);

    getPlaylist = (id) =>
        this.client.get(`/playlists/${id}/`).then(res => res.data);

    createPlaylist = (data) =>
        this.client.post('/playlists/', data).then(res => res.data);

    patchPlaylist = (id, data) =>
        this.client.patch(`/playlists/${id}/`, data).then(res => res.data);

    addSongToPlaylist = (data) =>
        this.client.post('/songs/', data).then(res => res.data);

    deleteSong = (id) =>
        this.client.delete(`/songs/${id}/`).then(res => res.data);
}

export default new ApiService(
    import.meta.env.VITE_BASE_URL
);
