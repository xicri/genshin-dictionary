export default defineEventHandler((event) => {
  setHeader(event, "Cache-Control", "max-age=14400, s-maxage=31536000, public");
});
