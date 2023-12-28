import type { APIRoute } from "astro";
import { type TeamMembers } from "@script/constants";
import { uri } from "@script/utils";


const teamMembers: TeamMembers = {
    "@Zachary Boehm": {
        img: uri('blog-placeholder-5.jpg'),
        titles: [
            "Programmer",
            "Website Designer"
        ],
        content: "Bibendum arcu vitae elementum curabitur vitae nunc. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo. Pellentesque sit amet porttitor eget. Egestas congue quisque egestas diam. Sit amet facilisis magna etiam. Ac tortor dignissim convallis aenean et tortor at. Risus in hendrerit gravida rutrum quisque non tellus orci. Scelerisque felis imperdiet proin fermentum leo. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Sed turpis tincidunt id aliquet risus feugiat in ante. Id eu nisl nunc mi ipsum faucibus. Praesent tristique magna sit amet purus gravida.",
        personal: {
            name: "Personal Website",
            href: "https://tired-fox.github.io/Tired-Fox/"
        },
        socials: {
            github: {
                href: "https://github.com/Tired-Fox",
                icon: "mdi:github"
            }
        },
    },
    "@John Doe": {
        img: uri('blog-placeholder-3.jpg'),
        titles: [
            "Programmer",
        ],
        content: "Bibendum arcu vitae elementum curabitur vitae nunc. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo. Pellentesque sit amet porttitor eget. Egestas congue quisque egestas diam. Sit amet facilisis magna etiam. Ac tortor dignissim convallis aenean et tortor at. Risus in hendrerit gravida rutrum quisque non tellus orci.",
        socials: {
            github: {
                href: "https://github.com",
                icon: "mdi:github"
            },
            youtube: {
                href: "https://youtube.com",
                icon: "mdi:youtube"
            }
        },
    }
}

export const GET: APIRoute = async ({params, request }) => {
    const tm = params.tm;
    if (tm === '@All') {
        return new Response(JSON.stringify(teamMembers));
    } else if (tm && teamMembers.hasOwnProperty(tm)) {
        return new Response(JSON.stringify(teamMembers[tm]))
    } else {
        return new Response(JSON.stringify({}))
    }
}


export function getStaticPaths() {
    return [
        { params: { tm: '@Zachary Boehm' } },
        { params: { tm: '@John Doe' } },
        { params: { tm: '@All' } }
    ]
}