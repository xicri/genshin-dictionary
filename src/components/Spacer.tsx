import type { FC } from "react";

export const Spacer: FC = (): JSX.Element => (
  <>
    <style jsx>{`
      .spacer {
        flex-grow: 1;
      }
    `}</style>
    <span className="spacer"></span>
  </>
);
