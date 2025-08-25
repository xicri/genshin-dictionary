import css from "styled-jsx/css";

export const styles = css`
  @use "./_variables.scss" as vars;

  .article__wrapper-outer {
    display: flex;
    justify-content: center;

    $margin: 12px;
    margin-left: $margin;
    margin-right: $margin;
    width: calc(100% - #{ $margin * 2 });
  }
  .article__wrapper-inner {
    max-width: vars.$max-width;
    width: 100%;
  }

  * {
    color: vars.$color-dark;
    line-height: 1.5em;
  }
  h3 {
    padding-bottom: 0.2em;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: vars.$color-light;
  }
  h4 {
    margin-bottom: 0.4em;
  }

  a {
    text-decoration: underline;
  }

  p, ul, code > pre {
    margin-bottom: 1em;
  }

  code > pre, p code, li code {
    background-color: rgb(175, 184, 193, 0.2);
    font-family: "Consolas", "Monaco", "Ubuntu Mono", monospace;
    padding: 0.2em 0.4em;
    border-radius: 0.5em;
  }

  code > pre {
    width: 100%;
    overflow: auto;
  }
`;
