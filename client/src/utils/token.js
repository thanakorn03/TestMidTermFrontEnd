// src/utils/token.js

// สมมติมี Token อยู่แล้ว
const TOKEN_KEY = 'auth_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// ตั้ง Token คงที่ (ครั้งแรก)
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
