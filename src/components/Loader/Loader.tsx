import { ReactElement } from "react";

import styles from "./Loader.module.css";

export const Loader = (): ReactElement => (
    <div className={styles.loaderCtr}>
        <div className={styles.loader}></div>
    </div>
);
