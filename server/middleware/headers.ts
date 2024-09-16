export default defineEventHandler(({ res }) => {
  if (res) {
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("X-Content-Type-Options", "nosniff");
  }
});
