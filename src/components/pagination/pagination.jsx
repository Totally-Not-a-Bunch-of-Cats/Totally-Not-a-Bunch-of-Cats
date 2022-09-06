import { h, createRef } from 'preact';
import { useState, useCallback } from "preact/hooks";
import "./pagination.scss";

export function Pagination({ ...props }) {

    const { total, pageSize, currentPage, onPageChange } = props;

    const maxPage = Math.ceil(total / pageSize) - 1;

    const increment = useCallback(() => {
        if (currentPage < maxPage) {
            onPageChange(currentPage + 1);
        }
    }, [currentPage])

    const decrement = useCallback(() => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    }, [currentPage])

    const beginning = (e) => {
        e.preventDefault();

        onPageChange(0);
    }

    const end = (e) => {
        e.preventDefault();

        onPageChange(maxPage);
    }

    const jump = (e, val) => {
        e.preventDefault();

        if (val <= maxPage && val >= 0) {
            onPageChange(val);
        }
    }

    const paginationText = () => {
        let output = [];
        const current = currentPage + 1;
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
            <div id="pagination" className={`d-flex align-items-center ${maxPage > 0 ? "" : "d-none"}`}>
                <a
                    href="#"
                    onclick={beginning}
                    className={currentPage === 0 ? "d-none" : ""}>
                    &lt;&lt;
                </a>
                <button onclick={decrement} disabled={currentPage === 0} aria-label="Previous page of items"><p>&lt;</p></button>
                <div class="d-flex">
                    {paginationText()}
                </div>
                <button onclick={increment} disabled={currentPage === maxPage} aria-label="Nex page of items"><p>&gt;</p></button>
                <a
                    href="#"
                    onclick={end}
                    className={currentPage === maxPage ? "d-none" : ""}>
                    &gt;&gt;
                </a>
            </div>
        </>
    );
}