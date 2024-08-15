import React, { ReactElement, ReactNode } from "react";

import styles from "./SelectButton.module.css"

interface Props {
    children?: ReactNode;
    type?: "submit" | "button" | "reset"
    onSelect?: () => void;
}

export const SelectButton: React.FC<Props> = ({
    children,
    type,
    onSelect = () => {}
}): ReactElement => {
    return (
        <button className={styles.selectBtn}
            type={type}
            onClick={_ => { onSelect() }}>
            {children} 
        </button>
    );
}
