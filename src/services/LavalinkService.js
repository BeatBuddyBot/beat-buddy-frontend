import axios from "axios";

class LavalinkService {
    constructor(lavalinkURL, token) {
        this.client = axios.create({
            baseURL: lavalinkURL,
            headers: {
                "Authorization": token,
            },
        });
    }

    searchSongs = (search_name) =>
        this.client.get(`/v4/loadtracks?identifier=ytsearch:${encodeURIComponent(search_name)}`).then(res => res.data);
}

export default new LavalinkService(
    import.meta.env.VITE_LAVALINK_URL,
    import.meta.env.VITE_LAVALINK_TOKEN
);

