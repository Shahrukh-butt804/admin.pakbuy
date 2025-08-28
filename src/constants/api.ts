const { hostname } = window.location;

const servers = {
  local: "http://localhost:3054",
  customDev: "https://react.customdev.solutions:3054",
  live: "",
};

var URL;

if (hostname.includes("react.customdev.solutions")) {
  URL = servers.customDev;
} else if (hostname.includes("choosewell.com")) {
  URL = servers.live;
} else {
  URL = servers.local;
}
export const SOCKET_URL = URL;
export const UPLOADS_URL = `${URL}/`;
export const BASE_URL = `${URL}/api/v1`;