export interface Props {
  className?: string;
  thumbnail: string;
  alt?: string;
  name: string;
  price: string;
  //
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined
}
