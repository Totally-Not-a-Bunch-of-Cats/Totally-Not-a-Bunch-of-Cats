import { uri } from "./utils";

export const members: string[] = ['@Zachary Boehm'] as const;

export type TeamMember = {
    img: string,
    titles: string[],
    personal?: { name: string, href: string },
    socials?: { [key: string]: { href: string, icon: string } },
    content: string
};
export type TeamMembers = {[K in typeof members[number]]: TeamMember};
export type Link = { uri: string; description?: string; extern?: boolean }

export const menu: {[key: string]: Link} = {
    Home: { uri: uri("/") },
    Blog: { uri: uri("/blog/") },
    Team: { uri: uri("/team/") },
    Projects: { uri: uri("/project/") },
}