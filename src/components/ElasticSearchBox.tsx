import { ChangeEvent, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

type Props = {
  name?: string,
  placeholder?: string,
  autoComplete?:string,
  className?: string,
  onInput?: (evt: ChangeEvent<HTMLInputElement>) => void,
};

type Methods = {
  moveCursorToLast: () => void,
  selectAll: () => void,
};

const ElasticSearchBox = forwardRef<Methods, Props>(({ name = "", placeholder = "", autoComplete = "", className, onInput: emitInput }, ref): JSX.Element => {
  const searchBox = useRef<HTMLInputElement>(null);
  const [ textLength, setTextLength ] = useState(0);

  //
  // methods
  //
  const updateSearchBoxWidth = useCallback(
    (): void => setTextLength((searchBox.current && 0 < searchBox.current.value.length) ? searchBox.current.value.length : placeholder.length),
    [ searchBox, placeholder ]
  );

  //
  // Event handlers
  //
  const onInput = useCallback((evt: ChangeEvent<HTMLInputElement>): void => {
    updateSearchBoxWidth();

    if (emitInput) {
      emitInput(evt);
    }
  }, [ updateSearchBoxWidth, emitInput ]);

  //
  // Component methods
  //
  useImperativeHandle(ref, () => ({
    moveCursorToLast: (): void => {
      if (searchBox.current) {
        searchBox.current.setSelectionRange(searchBox.current.value.length, searchBox.current.value.length);
        searchBox.current.focus();
      }
    },
    selectAll: (): void => {
      if (searchBox.current) {
        searchBox.current.setSelectionRange(0, searchBox.current.value.length);
        searchBox.current.focus();
      }
    },
  }));

  //
  // Initialize
  //
  useEffect(() => updateSearchBoxWidth(), [ updateSearchBoxWidth ]);

  return (
    <>
      <style jsx>{`
        @use "_variables.scss" as vars;

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
      `}</style>

      <input
        ref={searchBox}
        type="search"
        style={{ width: `${textLength * 1.05}em` }}
        className={`${className} elastic-searchbox`}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onInput={onInput}
        onClick={(evt) => evt.stopPropagation()}
      />
    </>
  );
});

ElasticSearchBox.displayName = "ElasticSearchBox";

export { ElasticSearchBox };
