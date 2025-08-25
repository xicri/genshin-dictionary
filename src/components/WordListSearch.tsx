import { klona } from "klona/json";
import { useRef, useState } from "react";
import { debounce } from "lodash";
import { I18n } from "@/libs/i18n";
import { ClosingLayer } from "@/components/ClosingLayer";
import { ElasticSearchBox } from "@/components/ElasticSearchBox";
import allTags from "../../public/dataset/tags.json";
import type { ChangeEvent, ElementRef, FC } from "react";
import type { Locale, OnSearchProps, SearchConditions, TagID, Tags } from "@/types";

type Props = {
  locale: Locale,
  searchConditions: SearchConditions,
  onSearch: (props: OnSearchProps) => void,
};

export const WordListSearch: FC<Props> = ({ locale, searchConditions: { activeTags = []}, onSearch: emitSearch }: Props): JSX.Element => {
  const searchBox = useRef<ElementRef<typeof ElasticSearchBox>>(null);
  const [ displayTagListOnMobile, setDisplayTagListOnMobile ] = useState(false);

  const getAvailableTagIDs = (): TagID[] => {
    const availableTags = klona(allTags as Tags);

    for (const activeTag of activeTags) {
      delete availableTags[activeTag];
    }

    return Object.keys(availableTags) as TagID[];
  };

  //
  // Event handlers
  //
  const updateSearchQuery = debounce((evt: ChangeEvent<HTMLInputElement>) => emitSearch({ query: evt.target.value }), 500);
  const closeTagList = (): void => setDisplayTagListOnMobile(false);
  const toggleTagList = (): void => setDisplayTagListOnMobile(!displayTagListOnMobile);
  const addTag = (newTag: TagID): void => {
    emitSearch({ newTag });
    closeTagList();
  };
  const removeTag = (tagIndex: number): void => emitSearch({ removeTagIndex: tagIndex });

  //
  // i18n
  //
  const i18n = new I18n(locale, {
    en: {
      enterSearchTerms: "Enter search terms...",
      tags: "Tags",
      openListOfTags: "Open the list of tags",
      closeListOfTags: "Close the list of tags",
    },
    ja: {
      enterSearchTerms: "検索ワードを入力…",
      tags: "タグ",
      openListOfTags: "タグ一覧を開く",
      closeListOfTags: "タグ一覧を閉じる",
    },
    "zh-CN": {
      enterSearchTerms: "输入搜索关键词…",
      tags: "标签",
      openListOfTags: "打开标签列表",
      closeListOfTags: "收起标签列表",
    },
  });

  return (
    <>
      <style jsx>{`
        @use "_variables.scss" as vars;

        .search {
          width: 100%;

          padding-top: 1em;
          padding-bottom: 1.2em;

          z-index: 11; // Higher than closing-layer (z-index: 10)

          &__box {
            display: grid;
            grid-template-columns: 1fr 24px;
            align-items: center;

            width: 100%;

            border-bottom-color: vars.$color-dark;
            border-bottom-style: solid;
            border-bottom-width: 1px;
            padding-bottom: 0.5em;
          }

          &__scrollable {
            overflow-x: scroll;

            // hide scroll bar
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar {
              display: none;
            }

            width: calc(100% - 0.4em);

            display: flex;

            cursor: text;
          }

          &__active-tags {
            display: contents;
            flex-wrap: wrap;
          }
          &__active-tag {
            flex-shrink: 0;

            border-width: 2px;
            border-style: solid;
            border-radius: 6px;
            border-color: vars.$color-dark;

            padding-top: 2px;
            padding-bottom: 2px;
            padding-left: 4px;
            padding-right: 4px;

            margin-right: 6px;

            color: vars.$color-dark;
            background-color: vars.$color-lightest;

            font-size: vars.$search-font-size;
          }
          &__remove-tag {
            font-weight: 1000;
            cursor: pointer;
            margin-left: 0.25em;
          }

          &__input {
            flex-shrink: 0;
          }
          &__taglist {
            border: 0;
          }
          &__taglist-inner {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: baseline;
          }
          &__tag {
            display: block;

            padding-top: 0.2em;
            padding-bottom: 0.2em;
            padding-left: 0.2em;
            padding-right: 0.2em;
            margin-right: 10px;
            margin-bottom: 10px;

            border-width: 2px;
            border-style: solid;
            border-radius: 6px;
            border-color: vars.$color-dark;

            color: vars.$color-dark;
            background-color: vars.$color-lightest;

            font-size: vars.$search-font-size;
            cursor: pointer;
          }
          &__tag-add {
            font-weight: 1000;
          }

          @media (min-width: vars.$max-width) { // PC
            &__taglist {
              // Margin between search box and taglist
              margin-top: 1.2em;
              width: 100%;
            }
            &__taglist-title {
              margin-right: 10px;
            }
            &__taglist-icon,
            &__taglist-close {
              display: none;
            }
          }

          @media (max-width: vars.$max-width) { // Mobile
            // Show search component at the bottom of the page on mobile devices
            position: fixed;
            bottom: 0;
            width: 100%;
            padding-left: vars.$side-margin;
            padding-right: vars.$side-margin;
            background-color: vars.$color-lightest;
            box-shadow: 0 -0.2rem 5px #00000030;

            &__taglist {
              display: none;

              position: absolute;
              margin-top: 8px;
              right: 0;
              left: 0;
              bottom: 4.8em;

              margin-left: vars.$side-margin;
              margin-right: vars.$side-margin;

              background-color: rgba($color: #ffffff, $alpha: 0.9);
              border-radius: 5px;
              border-color: vars.$color-light;
              border-style: solid;
              border-width: 3px;
              animation: 1s ease-in;
              transition: background-color 0.3s;
            }
            &__taglist-icon {
              flex-grow: 1;
              width: 1.4em;
              height: 1.4em;

              cursor: pointer;
            }
            &__taglist-title {
              display: none;
            }
            &__taglist-close {
              position: absolute;

              width: 24px;
              height: 24px;

              right: -12px;
              top: -12px;

              background-color: #ffffff;

              border-radius: 50%;
              border-color: vars.$color-light;
              border-style: solid;
              border-width: 3px;

              cursor: pointer;
            }

            &__taglist-display-mobile {
              display: block;
            }
            &__taglist-inner {
              display: flex;
              overflow-y: scroll;
              max-height: calc(100vh - 170px);
              padding: 0.5em;
            }
          }
        }
      `}</style>
      <>
        <div className="search">
          <div className="search__box">
            {/* TODO React does not recognize double click properly. See: https://naughtldy.hatenablog.jp/entry/2018/02/27/160000 */}
            <div className="search__scrollable" onClick={() => searchBox.current?.moveCursorToLast()} onDoubleClick={() => searchBox.current?.selectAll()}>
              <div className="search__active-tags">
                {activeTags.map((activeTag, i) => (
                  <div className="search__active-tag" key={activeTag}>
                    <span>{ (allTags as Tags)[activeTag][locale] }</span>
                    <span className="search__remove-tag" onClick={() => removeTag(i)}>☓</span>
                  </div>
                ))}
              </div>

              <ElasticSearchBox ref={searchBox} className="search__input" name="searchbox" placeholder={i18n.t("enterSearchTerms")} autoComplete="off" onInput={updateSearchQuery} />
            </div>

            <img
              src="/vendor/octicons/tag.svg"
              width="24"
              height="24"
              alt={i18n.t("openListOfTags")}
              decoding="async"
              className="search__taglist-icon"
              onClick={toggleTagList}
            />
          </div>
          <div className={ `search__taglist ${ displayTagListOnMobile ? "search__taglist-display-mobile" : "" }` }>
            <div className="search__taglist-inner">
              <span className="search__taglist-title">{ i18n.t("tags") }:</span>
              { getAvailableTagIDs().map((availableTagID) => (
                <span className="search__tag" onClick={() => addTag(availableTagID)} key={availableTagID}>
                  { (allTags as Tags)[availableTagID][locale] } <span className="search__tag-add">+</span>
                </span>
              ))}
            </div>

            <img
              src="/vendor/octicons/x.svg"
              width="24"
              height="24"
              alt={i18n.t("closeListOfTags")}
              decoding="async"
              className="search__taglist-close"
              onClick={closeTagList}
            />
          </div>
        </div>
        <ClosingLayer enabled={displayTagListOnMobile} onClose={closeTagList} />
      </>
    </>
  );
};
