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

    return (
        <div>
            <button onClick={() => {
                console.log("Clicking button");
                handlePageChange(true);
            }}
                    className={navigationStyles.slideNavButton}> &gt;
            </button>
            <button onClick={() => handlePageChange(false)}
                    className={navigationStyles.slideNavButton}> &lt; </button>
        </div>
    );
}

Navigation.propTypes = {
    initialSlide: PropTypes.number.isRequired,
    totalSlides: PropTypes.number.isRequired,
    notifyPageChange: PropTypes.func,
}
