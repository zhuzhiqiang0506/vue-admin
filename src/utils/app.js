import Cookie from "cookie_js";

const adminToken = "admin_token";
const userName = "user_name";

export function getToken() {
  return Cookie.get(adminToken);
}

export function setToken(token) {
  return Cookie.set(adminToken, token);
}

export function removeToken() {
  return Cookie.remove(adminToken);
}

export function getUsername() {
  return Cookie.get(userName);
}

export function setUsername(username) {
  return Cookie.set(userName, username);
}

export function removeUsername() {
  return Cookie.remove(userName);
}
