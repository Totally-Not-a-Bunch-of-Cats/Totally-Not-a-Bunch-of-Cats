import { h, Fragment } from 'preact';
import "../../../styles/global.scss";
import "./menus.scss";
import { FAIcon } from "../../FAIcons/FAIcon";

export const DesktopMenu = ({ ...props }) => {
    let links = [];

    if (props.links) {
        for (let i = 0; i < props.links.length; i++) {
            const data = props.links[i];
            links.push(
                <a
                    class="h5 m-0 p-0"
                    href={props.permalink + data.link}
                    aria-label={data.aria}
                    title={data.title ? data.title : ""}
                >
                    {data.text}
                </a>
            );
        }
    }

    return (
        <>
            <div id="nav-links" class="desktop">
                {links}
            </div>
        </>
    )
}

export const MobileMenu = ({ ...props }) => {

    let links = [];

    if (props.links) {
        for (let i = 0; i < props.links.length; i++) {
            const data = props.links[i];
            links.push(
                <a
                    class="h5 m-0 p-0"
                    href={props.permalink + data.link}
                    aria-label={data.aria}
                    title={data.title ? data.title : ""}
                    onclick={e => {
                        document.body.classList.toggle("hide-overflow");
                        document.getElementsByClassName("menu")[0].classList.toggle("open");
                        document.getElementsByClassName("menu-overlay")[0].classList.toggle("open");
                    }}
                >
                    {data.text}
                </a>
            );
        }
    }

    
    return (
        <>
            <div id="mobile-menu" class="mobile menu-mobile">

                {/* 
                 Hamburger menu inspired by Dronca Raul from CodePen
                 Dronca Raul: https://codepen.io/rauldronca
                 CodePen:     https://codepen.io/rauldronca/pen/jrjqyb
                */}

                <div class="menu-overlay">
                    <div class="overlay-info">
                        {links}
                    </div>
                </div>

                <div class="menu">
                    <span class="menu-circle"></span>
                    <input id="mobile-expanded" hidden />
                    <button
                        class="menu-link"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-label="Collapse or expand the menu"
                        onclick={e => {
                            document.body.classList.toggle("hide-overflow");
                            document.body.classList.toggle("open");
                            document.getElementsByClassName("menu")[0].classList.toggle("open");
                            document.getElementsByClassName("menu-overlay")[0].classList.toggle("open");

                            if (document.getElementById("menu").classList.contains("open")) {
                                const button = document.getElementsByClassName("menu-link")[0];
                                button.setAttribute("aria-expanded", "false");
                            } else {
                                const button = document.getElementsByClassName("menu-link")[0];
                                button.setAttribute("aria-expanded", "true");
                            }
                        }}
                    >
                        <span class="menu-icon">
                            <span class="menu-line menu-line-1"></span>
                            <span class="menu-line menu-line-2"></span>
                            <span class="menu-line menu-line-3"></span>
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}