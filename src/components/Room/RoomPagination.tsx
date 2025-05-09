interface RoomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void
}

const RoomPagination = ({ currentPage, totalPages, onPageChange }: RoomPaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="pagination justify-content-center d-flex">
        {
          pageNumbers.map(pageNumber => (
            <li
              key={pageNumber}
              className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default RoomPagination