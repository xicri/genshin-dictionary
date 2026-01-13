<script lang="ts">
  type Props = {
    enabled?: boolean;
    onclose?: () => void;
  };

  const {
    enabled = false,
    onclose = () => {},
  }: Props = $props();
</script>

<style lang="scss">
.closer {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: transparent;
}
</style>

<div
  style:display={ enabled ? "block" : "none" }
  class="closer"
  onclick={onclose}
></div>
