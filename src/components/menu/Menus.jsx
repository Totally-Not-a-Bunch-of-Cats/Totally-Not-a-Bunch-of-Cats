import { h, Fragment } from 'preact';
import "../../scss/main.scss";
import "./menus.scss";

export const DesktopMenu = ({ ...props }) => {
    let links = [];

    if (props.links) {
        for (let i = 0; i < props.links.length; i++) {
            const data = props.links[i];
            links.push(
                <a
                    href={data.link}
                    aria-label={data.aria}
                    title={data.title !== "" ? data.title : ""}
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
                    href={data.link}
                    aria-label={data.aria}
                    title={data.title !== "" ? data.title : ""}
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
            <div class="mobile">

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
                    <button class="menu-link" onclick={e => {
                        document.body.classList.toggle("hide-overflow");
                        document.getElementsByClassName("menu")[0].classList.toggle("open");
                        document.getElementsByClassName("menu-overlay")[0].classList.toggle("open");
                    }}>
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