const { hostname } = window.location;

const servers = {
    local: "http://localhost:3054",
    live: "https://api-pakbuy-nu.vercel.app",
};

var URL;
if (hostname.includes("vercel.app"))
    URL = servers.live;
else URL = servers.local;

export const SOCKET_URL = `${URL}`;
export const UPLOADS_URL =  "";
export const BASE_URL = URL + "/api/v1";