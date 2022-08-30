import { Component } from 'preact';
import "./admonition.scss";
import "../../scss/main.scss";

import { FontAwesomeIcon } from '@aduh95/preact-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export class Admonition extends Component {
    render(props, state) {
        return (
            <>
                <div class="admonition mb-6">
                    <div class="icon">
                        <FontAwesomeIcon
                            icon={props.icon === undefined ? "circle-info" : props.icon}
                            className={props.color === undefined ? "path-blue-gray" : 'path-' + props.color}
                        />
                    </div>
                    <div>
                        {props.children}
                    </div>
                </div>
            </>
        );
    }
}