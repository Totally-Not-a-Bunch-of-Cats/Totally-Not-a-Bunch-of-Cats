import { Component } from 'preact';

import "./Trailer.scss";
import "../../scss/main.scss";

export class Trailer extends Component {
    render(props, state) {
        if (!props.url || props.url === '') {
            return Placeholder();
        } else {
            return (
                <>
                    <div class="trailer mb-1">
                        <iframe
                            src={"https://www.youtube.com/embed/" + props.url.split("v=")[1]}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
                        ></iframe>
                    </div>
                </>
            );
        }
    }
}

function Placeholder() {
    return (
        <>
            <div class="trailer mb-1">
                <div class="trailer-temp">
                    {/* Temp element to fill in for an iframe */}
                    <div>
                        <svg
                            version="1.1"
                            class="fill-cinnamon-satin w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 408.221 408.221"
                        >
                            <g>
                                <g>
                                    <path
                                        d="M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11
        C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012
        c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"
                                    ></path>
                                </g>
                            </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                        </svg>
                        <p class="mt-1 color-cinnamon-satin">
                            <strong>No Trailer Available</strong>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}