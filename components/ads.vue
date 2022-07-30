<template>
  <div class="ads">
    <a v-for="ad in ads" :key="ad.href" :href="ad.href">
      <img :src="ad.src" width="300" height="250" alt="" decoding="async" loading="lazy">
    </a>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const ads = ref([]);

    const loadAds = async (frameID) => {
      try {
        const res = await fetch(`https://sh.zucks.net/opt/api/v2?frameid=${frameID}`);
        const { type, img_src: src, landing_url: href, imp_url: impressionURL } = await res.json();

        if (res.status === 200 && type === "img") {
          return {
            type,
            src,
            href,
            impressionURL,
          };
        } else if (res.status === 204) {
          console.error(`HTTP ${res.status}: no ads available. (Frame ID: ${frameID})`);
        } else if (res.status === 400) {
          console.error(`HTTP ${res.status}: invalid frameid. (Frame ID: ${frameID})`);
        } else if (res.status === 406) {
          console.error(`HTTP ${res.status}: no user agent information available in the request. (Frame ID: ${frameID})`);
        } else if (type !== "img") {
          console.error(`Unexpected ad type: ${type} (Frame ID: ${frameID})`);
        } else {
          console.error(`HTTP ${res.status}: unknown error. (Frame ID: ${frameID})`);
        }
      } catch (err) {
        console.error(`Ad not loaded due to error (Frame ID: ${frameID})
${err}`);
      }
    };

    onMounted(() => {
      window.addEventListener("load", async () => {
        try {
          const _ads = (await Promise.all([
            loadAds("_175de86393"),
            loadAds("_175de86393"),
          ])).filter(ad => !!ad); // remove null

          ads.value.push(..._ads);

          for (const ad of ads.value) {
            fetch(ad.impressionURL); // run without `await` to fetch asynchronously
          }
        } catch (err) {
          console.error(`Ad not loaded due to error
${err}`);
        }
      });
    });

    return {
      ads,
    };
  },
});
</script>

<style lang="scss" scoped>
.ads {
  display: flex;
  justify-content: center;
  width: 300px;
  height: 250px;
}
</style>
