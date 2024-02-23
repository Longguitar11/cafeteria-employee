import { MouseEventHandler } from "react";

export interface Props {
  className?: string;
  url: string;
  text: string;
  //
  onClick: MouseEventHandler<HTMLAnchorElement>;
  onMouseOver: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave: MouseEventHandler<HTMLAnchorElement>;
}
