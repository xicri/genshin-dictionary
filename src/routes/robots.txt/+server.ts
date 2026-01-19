export const GET = async () => new Response(`
User-agent: *
${ process.env.SERVER_ENV === "production" ? "" : "Disallow: /*" }
`.trim(), {
  headers: {
    "Content-Type": "text/plain",
  },
});
