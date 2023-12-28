import { Icon } from "@iconify-icon/solid";
import { type TeamMember, type TeamMembers } from "@script/constants";
import { fetchJson, uri } from "@script/utils";
import { Suspense, createEffect, createResource, createSignal, splitProps, type JSX } from "solid-js";
import '@style/animations.css';

type BinderProps = {
    class: string;
    url: URL
};

const fetchTeam = async (url: URL) => {
    return fetchJson(url, uri('/api/tm/@All.json'));
}

const BinderSkeleton = (props: BinderProps) => {
    return (
        <section
            class={`flex flex-wrap w-full h-fit justify-around ${props.class}`}
        >
            <CardSkeleton
                direction="left"
            />
            <CardSkeleton
                direction="right"
            />
            <CardSkeleton
                direction="left"
            />
        </section>
    );
}

const CardSkeleton = (props: {direction?: "left" | "right";}) => {
    let fillLines = [];
    for (let i = 0; i < 8; i++) {
        fillLines.push(<div class="w-full h-[1ch] py-1 skeleton my-1 rounded-full"></div>)
    }
    return (
        <div
            class={`w-full p-4 flex items-center flex-col ${props.direction === "left" ? "md:flex-row" : "md:flex-row-reverse"
                }`}
        >
            <div class='mb-4'>
                <div class={`w-[15rem] h-[7rem] aspect-video rounded-md shadow-sm ml-auto skeleton`}></div>
                <div class="w-[12ch] h-[1ch] rounded-full mx-auto skeleton mt-2"></div>
                <div class="flex h-[1ch] rounded-full gap-2 mx-auto mt-3 w-[24ch] skeleton"></div>
            </div>
            <div class="flex flex-col justify-center items-center w-full p-8">
                <div class="w-[calc(100%-1rem)] h-[1ch] py-1 skeleton ml-auto my-1 rounded-full"></div>
                {fillLines}
                <div class="w-[calc(100%-3rem)] h-[1ch] py-1 skeleton mr-auto my-1 rounded-full"></div>
                <SocialsSkeleton />
            </div>
        </div>
    );
}

const SocialsSkeleton = () => {
    return (
        <div class="flex flex-col gap-1 justify-center w-full">
            <div class="mt-4 mb-2">
                <div class="w-[40%] h-[3px] mx-auto bg-zinc-700/10 text-transparent my-[.1rem] rounded-lg">-</div>
                <div class="w-[20%] h-[3px] mx-auto bg-zinc-700/10 text-transparent rounded-lg">-</div>
            </div>
            <div class="flex justify-center gap-3">
                <div class="w-5 h-5 skeleton rounded-full"></div>
                <div class="w-5 h-5 skeleton rounded-full"></div>
                <div class="w-5 h-5 skeleton rounded-full"></div>
            </div>
        </div>
    );
};

export const Binder = (props: BinderProps) => {
    const [team, {mutate, refetch}] = createResource<TeamMembers, URL>(props.url, fetchTeam);

    return (
        <Suspense fallback={<BinderSkeleton {...props} />}>
            <section
                class={`flex flex-wrap w-full h-fit justify-around ${props.class}`}
            >
                {
                    team() !== undefined &&
                    Object.entries(team() as TeamMembers).map(([tag, info], idx) => {
                        const [data, rest] = splitProps(info, ["content"]);
                        return (
                            <Card
                                name={tag}
                                direction={idx % 2 === 0 ? "left" : "right"}
                                {...rest}
                            >
                                {data.content}
                            </Card>
                        );
                    })
                }
            </section>
        </Suspense>
    );
};

type CardProps = {
    name: string;
    children?: JSX.Element | string;
    direction?: "left" | "right";
} & Omit<TeamMember, 'content'>;

const Card = (props: CardProps) => {
    return (
        <div
            class={`w-full p-4 flex items-center flex-col ${props.direction === "left" ? "md:flex-row" : "md:flex-row-reverse"
                }`}
        >
            <div class={`mb-4`}>
                <img
                    class={`w-[25rem] rounded-md shadow-sm ${"ml-auto"}`}
                    src={props.img}
                    alt={`${props.name} Profile Picture`}
                />
                {props.personal ? (
                    <a
                        href={props.personal.href}
                        title={props.personal.name}
                        target="_blank"
                        class={`w-full hover:underline flex justify-center`}
                    >
                        <em class="text-sm">{props.name}</em>
                    </a>
                ) : (
                    <div class="w-fit mx-auto">
                        <em class="text-sm">{props.name}</em>
                    </div>
                )}
                <div class="flex gap-2 justify-center mt-3">
                    {
                        <strong class="text-sm text-center">
                            {props.titles?.join(" & ")}
                        </strong>
                    }
                </div>
            </div>
            <div class="flex flex-col justify-center items-center w-full p-8">
                <p class="indent-4">
                    {props.children}
                </p>
                {props.socials && <Socials links={props.socials} />}
            </div>
        </div>
    );
};

type SocialsProps = {
    links: { [key: string]: { href: string, icon: string } };
};

const Socials = (props: SocialsProps) => {
    return (
        <div class="flex flex-col gap-1 justify-center w-full">
            <div class="mt-4 mb-2">
                <div class="w-[40%] h-[3px] mx-auto bg-zinc-700/10 text-transparent my-[.1rem] rounded-lg">-</div>
                <div class="w-[20%] h-[3px] mx-auto bg-zinc-700/10 text-transparent rounded-lg">-</div>
            </div>
            <div class="flex justify-center gap-3">
                {
                    Object.entries(props.links).map(([name, info]) => (
                        <a
                            href={info.href}
                            target="_blank"
                            title={`${name} ↗`}
                            class="text-zinc-700/60 hover:text-zinc-700/90"
                        >

                            <Icon icon={info.icon} inline mode="svg" width="1.25rem" height="1.25rem" />
                        </a>
                    ))
                }
            </div>
        </div>
    );
};
