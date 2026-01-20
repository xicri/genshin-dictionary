<script lang="ts">
  import { onMount, type Snippet } from "svelte";

  type Props = {
    class?: string;
    onintersect: () => unknown;
    children?: Snippet;
  };

  let { class: twClass, onintersect, children }: Props = $props();

  let element: HTMLElement;

  onMount(() => {
    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          onintersect();
        }
      });

      observer.observe(element);

      // unobserve when this component is unmounted
      return () => observer.unobserve(element);
    }
  });
</script>

<div bind:this={element} class={twClass}>
  {@render children?.()}
</div>
