/* eslint-disable @typescript-eslint/no-require-imports */

const BASE_URL = "../assets/images";
const logo = require(`${BASE_URL}/movie-box.webp`);
const all = require(`${BASE_URL}/category.jpg`);
const hollywood = require(`${BASE_URL}/hollywood.jpg`);
const nollywood = require(`${BASE_URL}/nollywood.jpg`);
const bollywood = require(`${BASE_URL}/bollywood.jpg`);
const western = require(`${BASE_URL}/western.jpg`);
const kdrama = require(`${BASE_URL}/kdrama.jpg`);
const TMDB_BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/";

export {
  all,
  bollywood,
  hollywood,
  kdrama,
  logo,
  nollywood,
  TMDB_BASE_IMAGE_PATH,
  western,
};
