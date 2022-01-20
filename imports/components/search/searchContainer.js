import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/client';
import _ from 'underscore';
import {SearchQuery} from '/imports/api/search/searchQuery';
import {Loading, Error, Empty} from '/imports/components/loadingStatus/loadingStatus';
import Search from '/imports/components/search/search';

const SearchContainer = (props) => {
    const [tagOffset, setTagOffset] = useState(0);
    const [postOffset, setPostOffset] = useState(0);
    const [commentOffset, setCommentOffset] = useState(0);
    const [userOffset, setUserOffset] = useState(0);

    const {loading, error, data, fetchMore} = useQuery(SearchQuery, {variables: {
        query: props.navStack.current.viewContent
    }, pollInterval: Meteor.settings.public.pollInterval});

    useEffect(() => {
        fetchMore({
            variables: {
                tagOffset: tagOffset,
                postOffset: postOffset,
                commentOffset: commentOffset,
                userOffset: userOffset
            }
        });
    }, [tagOffset, postOffset, commentOffset, userOffset])

    let alternativeMessage;
    if(loading){
        alternativeMessage = <Loading />;
    } else if(error){
        alternativeMessage = <Error />;
        console.log("ERROR:", error);
    } else if(data && data.searchSite){
        if(_.keys(data.searchSite).length < 1){
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
            searchResults={data && data.searchSite ? data.searchSite : {}}
            navStack={props.navStack}
            offsetMap={{
                Tag: {
                    value: tagOffset,
                    set: setTagOffset
                },
                Post: {
                    value: postOffset,
                    set: setPostOffset
                },
                Comment: {
                    value: commentOffset,
                    set: setCommentOffset
                },
                User: {
                    value: userOffset,
                    set: setUserOffset
                }
            }}
        />
    );
};
SearchContainer.propTypes = {
    navStack: PropTypes.object.isRequired
};
export default SearchContainer;
