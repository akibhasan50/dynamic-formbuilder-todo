import ReactPaginateRaw from 'react-paginate';
import styles from './Pagination.module.css';

const ReactPaginate = ReactPaginateRaw.default || ReactPaginateRaw;

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const handlePageClick = (event) => {
    // react-paginate uses 0-based indexing for pages
    onPageChange(event.selected + 1);
  };

  return (
    <div id="pagination-controls">
      <ReactPaginate
        breakLabel="…"
        nextLabel="Next →"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        previousLabel="← Prev"
        forcePage={currentPage - 1} // 0-based indexing
        containerClassName={styles.pagination}
        pageClassName={styles.pageItem}
        pageLinkClassName={styles.pageBtn}
        previousClassName={styles.pageItem}
        previousLinkClassName={`${styles.pageBtn} ${styles.navBtn}`}
        nextClassName={styles.pageItem}
        nextLinkClassName={`${styles.pageBtn} ${styles.navBtn}`}
        breakClassName={styles.pageItem}
        breakLinkClassName={styles.ellipsis}
        activeClassName={styles.activePageItem}
        activeLinkClassName={styles.pageBtnActive}
        disabledClassName={styles.disabledItem}
        disabledLinkClassName={styles.disabledLink}
      />
      <p className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}
