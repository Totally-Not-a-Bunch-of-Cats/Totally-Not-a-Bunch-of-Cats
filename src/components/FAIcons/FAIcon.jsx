import { h } from 'preact';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome';

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

import "../../styles/global.scss";

export const FAIcon = ({ ...props }) => {
    const icon = props.icon
        ? props.icon
        : ["fas", "circle-info"];

    return (
        <>
            <FontAwesomeIcon
                icon={icon}
                className={props.class === undefined ? "" : props.class}
            />
        </>
    )
}