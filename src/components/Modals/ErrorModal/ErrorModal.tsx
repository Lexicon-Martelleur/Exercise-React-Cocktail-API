import React, { ReactElement, useRef } from "react";

import styles from "./ErrorModal.module.css";
import { icons } from "../../../assets";
import { Icon } from "../../Icon";
import { SelectButton } from "../../Buttons";

interface Props {
    title?: string;
    message: string;
    onClose?: () => void
}

export const ErrorModal: React.FC<Props> = ({
    title,
    message,
    onClose
}): ReactElement => {
    const modal: React.MutableRefObject<HTMLElement | null> = useRef(null);
    
    return (
        <article className={styles.modal} ref={modal}>
            <div className={styles.modalCtr}>
                <div className={styles.modalHeader}>
                    <h3>{title}</h3>
                    <button className={styles.closeButton}
                        onClick={onClose}>
                        <Icon icon={icons.close} size="medium"/>
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <p className={styles.modalMessage}>
                        {message}
                    </p>
                </div>
                <div className={styles.modalFooter}>
                    <SelectButton onSelect={onClose}>
                        Close
                    </SelectButton>
                </div>
            </div>
        </article>
    );
}
