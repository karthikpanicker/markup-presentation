import navigationStyles from './navigation.module.css';
import PropTypes from 'prop-types';
import React, {useState} from "react";

export default function Navigation({initialSlide, totalSlides, notifyPageChange}) {
    const [currentPage, setCurrentPage] = useState(initialSlide);
    const handlePageChange = (isIncrement) => {
        let newPage = currentPage;
        if (isIncrement && currentPage < totalSlides - 1) {
            newPage += + 1;
        } else if (!isIncrement && currentPage > 0){
            newPage -= 1;
        }
        setCurrentPage(newPage);
        if (notifyPageChange) notifyPageChange(newPage);
    }
    const buttonClass = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`;
    const disabledButtonClass = `${buttonClass} opacity-50 cursor-not-allowed`
    return (
        <div className={`text-center p-5`}>
            <button onClick={() => handlePageChange(false)}
                    className={`${(currentPage == 0 )? disabledButtonClass : buttonClass} mr-5 `}
                    disabled={currentPage === 0}> &lt; </button>
            <span> {currentPage + 1} / {totalSlides}</span>
            <button onClick={() => {handlePageChange(true);}}
                    className={`${(currentPage === totalSlides - 1) ? disabledButtonClass: buttonClass} ml-5`}
                    disabled={currentPage === totalSlides - 1}> &gt;
            </button>
        </div>
    );
}

Navigation.propTypes = {
    initialSlide: PropTypes.number.isRequired,
    totalSlides: PropTypes.number.isRequired,
    notifyPageChange: PropTypes.func,
}
