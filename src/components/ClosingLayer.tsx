import type { FC } from "react";

type Props = {
  enabled: boolean,
  onClose: () => void,
};

export const ClosingLayer: FC<Props> = ({ enabled = false, onClose }: Props): JSX.Element => (
  <>
    <style jsx>{`
      .closer {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: transparent;
      }
    `}</style>

    <div style={{ display: enabled ? "block" : "none" }} className="closer" onClick={onClose}></div>
  </>
);
