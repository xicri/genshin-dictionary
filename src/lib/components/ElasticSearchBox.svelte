<script lang="ts">
  import { onMount } from "svelte";
  import type { FormEventHandler, FullAutoFill } from "svelte/elements";

  type Props = {
    value: string;
    name?: string;
    placeholder?: string;
    autocomplete?: FullAutoFill;
    oninput?: FormEventHandler<HTMLInputElement>;
  };

  let { value = $bindable(), ...props }: Props = $props();
  const {
    name,
    placeholder,
    autocomplete,
    oninput: onInputFromParent,
  } = props;

  let searchBox: HTMLInputElement;

  export const focus = () => searchBox?.focus();

  export const setSelectionRange = (
    (...args) => searchBox?.setSelectionRange(...args)
  ) satisfies typeof HTMLInputElement.prototype.setSelectionRange;

  export const getTextLength = () => searchBox?.value.length ?? 0;

  //
  // methods
  //
  const updateSearchBoxWidth = (): void => {
    if (searchBox) {
      const textLength = (0 < searchBox.value.length) ? searchBox.value.length : placeholder?.length ?? 0;
      searchBox.style.width = `${ textLength * 1.05 }em`;
    }
  };

  //
  // Lifecycle Hooks
  //
  onMount(() => {
    updateSearchBoxWidth();
  });

  //
  // event handlers
  //
  const onInput: FormEventHandler<HTMLInputElement> = (evt): void => {
    updateSearchBoxWidth();
    if (onInputFromParent) {
      onInputFromParent(evt);
    }
  };
</script>

<style lang="scss">
@use "$lib/assets/styles/variables.scss" as vars;

.elastic-searchbox {
  border-width: 0;
  border-style: none;
  font-size: vars.$search-font-size;
  background-color: transparent;

  &:focus-visible {
    outline-style: none;
    outline-width: 0;
  }
}
</style>

<input
  bind:this={searchBox}
  bind:value={value}
  type="search"
  class="elastic-searchbox"
  {name}
  {placeholder}
  {autocomplete}
  oninput={onInput}
  onclick={(evt) => evt.stopPropagation()}
/>
