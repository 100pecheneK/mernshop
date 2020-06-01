import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"

const Pagination = ({path, totalPages, currentPage}) => {
    const pageNumbers = []

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    const getPagePrev = () => {
        return currentPage - 1 === 0 ? 1 : currentPage - 1
    }
    const gegPageNext = () => {
        return currentPage + 1 > totalPages ? totalPages : currentPage + 1
    }
    return (
        <ul className="pagination">
            <li className={currentPage === 1 ? "disabled" : "waves-effect"}>
                <Link to={`${path}/${getPagePrev()}`}><i className="material-icons">chevron_left</i></Link>
            </li>
            {pageNumbers.map(number => (
                <li key={number} className={number === currentPage ? "active" : "waves-effect"}>
                    <Link to={`${path}/${number}`}>{number}</Link>
                </li>
            ))}
            <li className={currentPage === totalPages ? "disabled" : "waves-effect"}>
                <Link to={`${path}/${gegPageNext()}`}><i
                    className="material-icons">chevron_right</i></Link>
            </li>
        </ul>
    )
}

Pagination.propTypes = {
    path: PropTypes.string.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
}

export default Pagination
