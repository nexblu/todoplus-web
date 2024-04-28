const TaskPagination = (prop) => {
    let { indexOfLastTask, list, currentPage, prevPage, nextPage, goToFirstPage, goToLastPage } = prop

    return (
        <>
            <nav className="pagination" aria-label="Page navigation example">
                <ul className="flex justify-center">
                    <li className="page-item">
                        <button className="rounded-l-lg page-link flex items-center justify-center w-10 h-10 bg-[#E9ECEF] text-[#212529] font-bold focus:outline-none focus:shadow-outline" onClick={currentPage === 1 ? null : goToFirstPage}>
                            &laquo;
                        </button>
                    </li>
                    <li className="page-item">
                        <button className="page-link flex items-center justify-center w-10 h-10 bg-[#E9ECEF] text-[#212529] font-bold focus:outline-none focus:shadow-outline" onClick={currentPage === 1 ? null : prevPage}>
                            {'<'}
                        </button>
                    </li>
                    <li className="page-item">
                        <button className="page-link flex items-center justify-center w-10 h-10 bg-[#68A4F1] text-white font-bold focus:outline-none focus:shadow-outline">
                            {currentPage}
                        </button>
                    </li>
                    <li className="page-item">
                        <button className="page-link flex items-center justify-center w-10 h-10 bg-[#E9ECEF] text-[#212529] font-bold focus:outline-none focus:shadow-outline" onClick={indexOfLastTask >= list.length ? null : nextPage}>
                            {'>'}
                        </button>
                    </li>
                    <li className="page-item">
                        <button className="rounded-r-lg page-link flex items-center justify-center w-10 h-10 bg-[#E9ECEF] text-[#212529] font-bold focus:outline-none focus:shadow-outline" onClick={indexOfLastTask >= list.length ? null : goToLastPage}>
                            &raquo;
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default TaskPagination