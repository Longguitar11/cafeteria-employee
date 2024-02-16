export interface Props {
  className?: string;
  url: string;
  text: string;
  //
  onClick: (value: boolean) => void;
  onMouseOver: (value: boolean) => void;
  onMouseLeave: (value: boolean) => void;
}
