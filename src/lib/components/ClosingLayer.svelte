<script lang="ts">
  import { twMerge } from "tailwind-merge";

  type Props = {
    enabled?: boolean;
    onclose?: () => void;
    class?: string;
  };

  const {
    enabled = false,
    onclose = () => {},
    class: twClass,
  }: Props = $props();
</script>

<style lang="scss">
.closer {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: transparent;
}
</style>

<div
  style:display={ enabled ? "block" : "none" }
  class={twMerge("closer", twClass)}
  onclick={onclose}
></div>
