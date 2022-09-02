import { h, createRef } from 'preact';
import { useState, useCallback } from "preact/hooks";
import "./blogs.scss";

export function Blogs({ ...props }) {
    const [page, setPage] = useState(0);
    const nextButtonDisabled = () => page === maxPage;
    const prevButtonDisabled = () => page === 0;

    const pageSize = 8;

    const maxPage = Math.ceil(props.blogs.length / pageSize) - 1;

    const increment = useCallback(() => {
        if (page < maxPage) {
            setPage(page + 1);
        }
    }, [page])

    const decrement = useCallback(() => {
        if (page > 0) {
            setPage(page - 1);
        }
    }, [page])

    const beginning = (e) => {
        e.preventDefault();

        setPage(0);
    }

    const end = (e) => {
        e.preventDefault();

        setPage(maxPage);
    }

    const jump = (e, val) => {
        e.preventDefault();

        setPage(val);
    }

    let posts = [];
    props.blogs.forEach((blog) => {
        posts.push(
            <li class="blog-list-item">
                <a class="post" href={blog.url}>
                    <p class="title"><strong>{blog.frontmatter.title}</strong></p>
                    <p class="date">
                        <time datetime={blog.frontmatter.pubDate}>
                            ~ {new Date(blog.frontmatter.pubDate).toLocaleDateString('en-us', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </time>
                    </p>
                </a>
            </li>
        )
    })

    const startItem = page * pageSize;
    console.log(startItem, Math.min(startItem + pageSize, posts.length));
    const endItem = Math.min(startItem + pageSize, posts.length);

    const paginationText = () => {
        let output = [];
        const current = page + 1;
        const minSur = Math.max(1, current - 1);
        const maxSur = Math.min(maxPage + 1, current + 1);

        for (let i = minSur; i <= maxSur; i++) {
            if (i === current) {
                output.push(
                    <p class="selected">{i}</p>
                )
            } else {
                output.push(
                    <p><a href="#" onClick={(e) => jump(e, i - 1)}>{i}</a></p>
                )
            }
        }

        if (current > 2) {
            output = [<p><a href="#" onClick={(e) => jump(e, 0)}>1 ...</a></p>].concat(output);
        }

        if (current < maxPage) {
            output.push(<p><a href="#" onClick={(e) => jump(e, maxPage)}>... {maxPage + 1}</a></p>);
        }

        return output;
    }

    return (
        <>
            <div class="blog-list">
                <ul>
                    {posts.slice(startItem, endItem)}
                </ul>
            </div>
            <div id="pagination" className={`d-flex align-items-center ${maxPage > 1 ? "" : "d-none"}`}>
                <a
                    href="#"
                    onclick={beginning}
                    className={prevButtonDisabled() ? "d-none" : ""}>
                    &lt;&lt;
                </a>
                <button onclick={decrement} disabled={prevButtonDisabled()} aria-label="Previous page of blogs"><p>&lt;</p></button>
                <div class="d-flex">
                    {paginationText()}
                </div>
                <button onclick={increment} disabled={nextButtonDisabled()} aria-label="Nex page of blogs"><p>&gt;</p></button>
                <a
                    href="#"
                    onclick={end}
                    className={nextButtonDisabled() ? "d-none" : ""}>
                    &gt;&gt;
                </a>
            </div>
        </>
    );
}

