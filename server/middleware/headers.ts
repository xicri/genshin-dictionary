export default defineEventHandler((event) => {
  setHeader(event, "Cross-Origin-Resource-Policy", "same-site");
  setHeader(event, "Cross-Origin-Opener-Policy", "same-origin");
  setHeader(event, "X-Content-Type-Options", "nosniff");
});
