export default function({ res }) {
  res?.setHeader("Content-Security-Policy", "frame-ancestors 'self' http://sunny2.starfree.jp;");
  res?.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res?.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  return res?.setHeader("X-Content-Type-Options", "nosniff");
}
