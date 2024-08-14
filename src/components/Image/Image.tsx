import React, { ReactElement } from "react";

import { IImage } from "./types";

import styles from "./Image.module.css";

interface Props {
  image: IImage;
  className?: string
}

export const Image: React.FC<Props> = ({
  image,
  className
}): ReactElement => {
  const derivedClassName = className != null ? className : "";
  return (
    <figure className={styles.image}>
      <img className={derivedClassName} {...image} />
    </figure>
  );
}
