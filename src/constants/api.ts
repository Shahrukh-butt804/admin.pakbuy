const { VITE_NODE_ENV } = import.meta.env; // Use import.meta.env instead of process.env
const { hostname } = window.location;

const servers = {
  local: "http://localhost:3032",
  customDev: "https://react.customdev.solutions:3032",
  live: "",
  dummy: "https://9d2f-204-157-158-10.ngrok-free.app",
};

var URL;

if (VITE_NODE_ENV === "production" && hostname.includes("react.customdev.solutions")) {
  URL = servers.customDev;
} else if (VITE_NODE_ENV === "production" && hostname.includes("buffaloaudiovisual.com")) {
  URL = servers.live;
} else {
  URL = servers.local;
}
export const SOCKET_URL = URL;
export const UPLOADS_URL = `${URL}/`;
export const BASE_URL = `${URL}/api`;