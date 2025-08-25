import allTags from "../../public/dataset/tags.json";
import type { Locale, Tags } from "@/types";

type Props = {
  locale: Locale,
  tagID: string,
};

export function Tag({ locale, tagID }: Props): JSX.Element {
  return (
    <>
      <style jsx>{`
        @use "_variables.scss" as vars;

        .tag {
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
        }
      `}</style>
      <div className="tag">
        <span>{(allTags as Tags)[tagID][locale]}</span>
      </div>
    </>
  );
}
