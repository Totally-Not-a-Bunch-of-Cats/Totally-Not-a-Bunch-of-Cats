import { h, createRef } from 'preact';
import { useState, useMemo } from "preact/hooks";
import { Pagination } from '../pagination/pagination';
import "./projects.scss";

export function Projects({ ...props }) {
    const { data } = props;
    const [currentPage, setCurrentPage] = useState(0);

    const PageSize = 1;

    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <>
            <h1 class="mb-3">Projects</h1>
            <div class="list">
                <ul>
                    {
                        currentData.map((item) => {
                            return (
                                <li class="list-item">
                                    <a class="post" href={item.url}>
                                        <h5 class="title">{item.frontmatter.title}</h5>
                                        <p class="description">
                                            {item.frontmatter.description}
                                        </p>
                                        <div class="tag-list d-flex">
                                            {
                                                item.frontmatter.tags.map(tag => {
                                                    return (
                                                        <div class="tag">
                                                            <p class="small">{tag}</p>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
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