"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

/**
 * Generates a range of page items including first, last, neighbors, and ellipses.
 */
function generatePages(current: number, total: number): (number | string)[] {
	const delta = 1;
	let left = current - delta;
	let right = current + delta;

	if (left < 1) {
		right += 1 - left;
		left = 1;
	}
	if (right > total) {
		left -= right - total;
		right = total;
	}
	left = Math.max(left, 1);
	right = Math.min(right, total);

	const pages: (number | string)[] = [];
	for (let i = 1; i <= total; i++) {
		if (
			i === 1 ||
			i === total ||
			(i >= left && i <= right)
		) {
			pages.push(i);
		} else if (
			i === left - 1 && left > 2 ||
			i === right + 1 && right < total - 1
		) {
			pages.push("...");
		}
	}
	return pages;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	const pages = generatePages(currentPage, totalPages);

	return (
		<nav
			className="flex items-center justify-center space-x-2 mt-10"
			aria-label="Pagination"
		>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50 transition-colors duration-200 dark:bg-gray-800 dark:hover:bg-gray-700"
				aria-label="Previous page"
			>
				<ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
			</button>

			{pages.map((page, idx) =>
				typeof page === "number" ? (
					<button
						key={idx}
						onClick={() => onPageChange(page)}
						aria-current={page === currentPage ? "page" : undefined}
						className={`
              px-4 py-2 rounded-lg shadow transition transform duration-200 hover:scale-105
              ${page === currentPage
								? "bg-purple-600 text-white dark:bg-purple-500"
								: "bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
							}
            `}
					>
						{page}
					</button>
				) : (
					<span
						key={idx}
						className="px-2 text-gray-500 dark:text-gray-400 select-none"
					>
						{page}
					</span>
				)
			)}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50 transition-colors duration-200 dark:bg-gray-800 dark:hover:bg-gray-700"
				aria-label="Next page"
			>
				<ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
			</button>
		</nav>
	);
}
