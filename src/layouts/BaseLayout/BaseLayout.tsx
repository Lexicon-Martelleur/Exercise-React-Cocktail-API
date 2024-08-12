import React, { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";

import { path } from "../../constants";
import { Icon } from "../../components";
import { icons } from "../../assets";

import styles from "./BaseLayout.module.css";

interface Props {
    children?: ReactNode;
}

export const BaseLayout: React.FC<Props> = ({
    children
}): ReactElement => {
    return (
        <> 
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <Link 
                        to={path.INDEX}
                        className={styles.link} >
                        <Icon icon={icons.home} size="medium"></Icon>
                    </Link>
                    <Link
                        to={path.SEARCH}
                        className={styles.link}>
                        <Icon icon={icons.search} size="medium"></Icon>
                    </Link>
                </nav>
            </header>
            <main className={styles.main}>
                {children}
            </main>
        </>
    );
}
