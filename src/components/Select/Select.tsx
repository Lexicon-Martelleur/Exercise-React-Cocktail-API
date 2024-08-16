import { ReactElement } from "react";
import { v4 as uuid } from "uuid";

import styles from "./Select.module.css";

interface Props {
    name: string;
    value: string;
    options: string[];
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export const Select: React.FC<Props> = ({
    name,
    value,
    options,
    onChange
}): ReactElement => {
    return (
        <select className={styles.select}
            id={name}
            name={name}
            value={value}
            onChange={onChange}>
            {options.map(value => (
            <option 
                key={uuid()}
                value={value.toLowerCase()}>
                {value}
            </option>
            ))}
        </select>
    );
}
