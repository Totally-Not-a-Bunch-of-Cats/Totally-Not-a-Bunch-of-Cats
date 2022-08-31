import { h, Component } from 'preact';
import { FAIcon } from '../FAIcon';

import "./admonition.scss";
import "../../scss/main.scss";
export class Admonition extends Component {
    render(props, state) {
        return (
            <>
                <div class="admonition mb-6">
                    {props.icon !== undefined &&
                        <div class="icon">
                            <FAIcon
                                icon={props.icon === undefined ? "circle-info" : props.icon}
                                class={props.color === undefined ? "path-blue-gray" : 'path-' + props.color}
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