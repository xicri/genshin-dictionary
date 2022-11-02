import fetch from "node-fetch";

const zone = process.env.CLOUDFLARE_ZONE;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;

try {
  const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      purge_everything: true,
    }),
  });

  const json = await res.json();

  if (json.success === true) {
    console.info("Cache successfully purged!");
    console.info(JSON.stringify(json, null, 2));
  } else {
    console.error("[Error] Failed to purge cache.");
    console.info(JSON.stringify(json, null, 2));

    process.exit(1);
  }
} catch (err) {
  console.error("[Error] Failed to purge cache.");
  console.error(err);
  process.exit(1);
}
