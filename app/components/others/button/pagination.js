const Pagination = ({ currentPage, totalPages }) => {
    const pages = [...Array(totalPages).keys()].map(num => num + 1);
    return (
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          {pages.map(page => (
            <li key={page}>
              <a
                href="#"
                className={`py-2 px-3 leading-tight ${page === currentPage ? 'text-blue-600 border-blue-600' : 'text-gray-500'} bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Pagination;
  