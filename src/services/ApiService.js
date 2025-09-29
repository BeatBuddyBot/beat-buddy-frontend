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

    deleteSong = (id) =>
        this.client.delete(`/songs/${id}/`).then(res => res.data);
}

export default new ApiService("http://65.21.189.102:8000");
