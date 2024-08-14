import { ReactElement } from "react";

import { IImage } from "./types";

import styles from "./Image.module.css";

interface IImageProps {
  image: IImage;
}

export function Image({ image }: IImageProps): ReactElement {
  return (
    <figure className={styles.image}>
      <img {...image} />
    </figure>
  );
}
