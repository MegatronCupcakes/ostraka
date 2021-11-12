import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {SearchQuery} from '/imports/api/search/searchQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import Search from '/imports/components/search/search';

const SearchContainer = (props) => {
    const {loading, error, data} = useQuery(SearchQuery, {variables: {query: props.navStack.current.viewContent}, pollInterval: 1000});
    let alternativeMessage;
    if(loading){
        alternativeMessage = <Loading />;
    } else if(error){
        alternativeMessage = <Error />;
        console.log("ERROR:", error);
    } else if(data && data.searchSite){
        if(data.searchSite.length < 1){
            alternativeMessage = <Empty message="no results found"/>;
        } else {
            alternativeMessage = null;
        }
    } else {
        alternativeMessage = <Empty message="oops, something went wrong :-("/>;
    }
    return (
        <Search
            searchQuery={props.navStack.current.viewContent}
            alternativeMessage={alternativeMessage}
            searchResults={data && data.searchSite ? _.groupBy(data.searchSite, '__typename') : {}}
            navStack={props.navStack}
        />
    );
};
SearchContainer.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default SearchContainer;
