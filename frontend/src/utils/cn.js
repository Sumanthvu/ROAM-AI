// src/utils/cn.js

export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}