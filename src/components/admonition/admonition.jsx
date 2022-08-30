import { Component } from 'preact';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome';

import "./admonition.scss";
import "../../scss/main.scss";
export class Admonition extends Component {
    render(props, state) {
        return (
            <>
                <div class="admonition mb-6">
                    {props.icon &&
                        <div class="icon">
                            <FontAwesomeIcon
                                icon={props.icon === undefined ? "circle-info" : props.icon}
                                className={props.color === undefined ? "path-blue-gray" : 'path-' + props.color}
                            />
                        </div>
                    }
                    <div>
                        {props.children}
                    </div>
                </div>
            </>
        );
    }
}