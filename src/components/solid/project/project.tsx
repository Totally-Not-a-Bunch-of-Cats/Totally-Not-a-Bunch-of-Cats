import { uri } from "@script/utils";
import type { CollectionEntry } from "astro:content";
import { createEffect, createSignal } from "solid-js";
import "@style/animations.css";
import "@style/custom.css";
import { Icon } from "@iconify-icon/solid";

type Props = {
  posts: CollectionEntry<"project">[];
};

export function Projects(props: Props) {
  let dialog: HTMLDialogElement;
  const [groupBy, setGroupBy] = createSignal<"platforms" | "tags">("platforms");
  const [selected, setSelected] = createSignal<CollectionEntry<"project">>();
  const [groups, setGroups] = createSignal<{
    [key: string]: CollectionEntry<"project">[];
  }>({});

  const genGroups = (by: "platforms" | "tags") => {
    let ngroups: { [key: string]: CollectionEntry<"project">[] } = {};
    const groupByAssign = (key: string, post: CollectionEntry<"project">) => {
      if (!groups.hasOwnProperty(key)) {
        ngroups[key] = [post];
      } else {
        ngroups[key].push(post);
      }
    };

    for (const post of props.posts) {
      const refer = post.data[by];
      if (!refer) {
        groupByAssign("other", post);
      } else if (refer instanceof Array) {
        if (refer.length === 0) {
          groupByAssign("other", post);
        } else {
          for (const platform of refer) {
            if (!groups.hasOwnProperty(platform)) {
              ngroups[platform] = [post];
            } else {
              ngroups[platform].push(post);
            }
          }
        }
      }
    }
    setGroups(ngroups);
  };

  genGroups(groupBy());

  createEffect(() => {
    genGroups(groupBy());
  });

  const PLATFORMS: Record<string, string> = {
    mobile: "phone",
    desktop: "computer",
    web: "browse",
  };
  const platform = (name: string) => {
    return PLATFORMS[name];
  };

  const chunk = (arr: CollectionEntry<"project">[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };
  // onChange={(e) => setGroupBy(e.target.value)}
  return (
    <div class="columns-1 md:columns-2 gap-8 px-4 w-full">
        {props.posts.map((project) => {
            let titleId = project.slug.replace('/','_') + '-title';
            let descId = project.slug.replace('/','_') + '-desc';
            return <a
                class="block my-4"
                href={uri(`${project.collection}/${project.slug}`)}
                aria-labelledby={titleId}
                aria-aria-describedby={descId}
            >
                <img
                    src={uri(project.data.coverImage)}
                    alt={project.data.title}
                    class="h-auto max-w-full rounded-lg"
                />
                <div class="flex justify-between items-center my-2">
                    <h2 id={titleId} class="text-lg font-bold">{project.data.title}</h2>
                    <div class="flex">
                    {project.data.platforms &&
                        project.data.platforms.map((name) => (
                        <Icon
                            icon={`jam:${platform(name)}`}
                            inline
                            mode="svg"
                            width="1.5rem"
                            height="1.5rem"
                            title={name}
                            aria-label={`Supports ${name} platform`}
                        />
                        ))}
                    </div>
                </div>
                <p id={descId} class="indent-6" aria-label="description">{project.data.description}</p>
            </a>
        })}
    </div>
  );
}
