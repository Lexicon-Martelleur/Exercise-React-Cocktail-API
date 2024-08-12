import React from "react";
import { ReactElement } from "react";

import { IIcon } from "./types";
import { IconSizeType } from "./types";

import styles from "./Icon.module.css";

interface Props {
  icon: IIcon;
  size?: IconSizeType;
  className?: string;
}

export const Icon: React.FC<Props> = ({
  icon,
  size,
  className
}): ReactElement => (() => {
  const derivedDarkModeClasses = [
    styles.iconLight,
    className ?? ""
  ].join(" ");

  const derivedLightModeClasses = [
    styles.iconDark,
    className ?? ""
  ].join(" ");

  switch (size) {
    case "medium":
      return (
        <>
          <img className={`${styles.medium} ${derivedDarkModeClasses}`} {...icon.light} />
          <img className={`${styles.medium} ${derivedLightModeClasses}`} {...icon.dark} />
        </>
      )
    case "large":
      return (
        <>
          <img className={`${styles.large} ${derivedDarkModeClasses}`} {...icon.light} />
          <img className={`${styles.large} ${derivedLightModeClasses}`} {...icon.dark} />
        </>
      )
    case "xlarge":
      return (
        <>
          <img className={`${styles.xlarge} ${derivedDarkModeClasses}`} {...icon.light} />
          <img className={`${styles.xlarge} ${derivedLightModeClasses}`} {...icon.dark} />
        </>
      )
    case "small":
    default:
      return (
        <>
          <img className={derivedDarkModeClasses} {...icon.light} />
          <img className={derivedLightModeClasses} {...icon.dark} />
        </>
      )
  }})();
