import React, {useState, useCallback} from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import _ from 'underscore';
import Pagination from '/imports/components/pagination/pagination';

const PaginationContainer = (props) => {
    const pageCount = Math.ceil(props.count / props.pageSize);
    const handleSetCurrentPage = useCallback(_.debounce((page, _currentPage) => {
        if(page === 'previous'){
            if(_currentPage > 1) props.setOffset(Number(_currentPage) - 1);
        } else if(page === 'next'){
            if(_currentPage < pageCount) props.setOffset(Number(_currentPage));
        } else {
            props.setOffset(Number(page) - 1);
        }
    }, 400, true));
    return (
        <Pagination
            content={props.content}
            pageCount={pageCount}
            currentPage={props.offset + 1}
            setCurrentPage={handleSetCurrentPage}
        />
    );
};
PaginationContainer.propTypes = {
    content: PropTypes.array.isRequired,
    count: PropTypes.number,
    pageSize: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    setOffset: PropTypes.func.isRequired
};
export default PaginationContainer;
