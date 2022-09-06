import { h } from 'preact';
import { useState, useMemo } from "preact/hooks";
import { Pagination } from '../pagination/pagination';
import "./blogs.scss";

export function Blogs({ ...props }) {
    const { data } = props;
    const PageSize = 1;

    const [currentPage, setCurrentPage] = useState(0);

    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <>
            <h1 class="mb-3'">Posts</h1>
            <div class="blog-list">
                <ul>
                    {
                        currentData.map(item => {
                            return (
                                <li class="blog-list-item">
                                    <a class="post" href={item.url}>
                                        <p class="title"><strong>{item.frontmatter.title}</strong></p>
                                        <p class="date">
                                            <time datetime={item.frontmatter.pubDate}>
                                                ~ {new Date(item.frontmatter.pubDate).toLocaleDateString('en-us', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </time>
                                        </p>
                                    </a>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            <Pagination
                total={data.length}
                pageSize={PageSize}
                currentPage={currentPage}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    );
}

