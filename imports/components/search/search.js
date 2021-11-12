import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {goTo} from '/imports/api/navStack/goTo';
import PostView from '/imports/components/feed/postView';
import TopicViewComment from '/imports/components/comments/topicViewComment';
import UserIdentifierWithScore from '/imports/components/profile/userIdentifierWithScore';

const Search = (props) => {
    if(props.alternativeMessage){
        return props.alternativeMessage;
    } else {
        const resultTypes = _.keys(props.searchResults);
        if(resultTypes.length > 1){
            return (
                <>
                    <div style={{paddingBottom: "1rem"}}>Results for "{props.searchQuery}"</div>
                    <div className="accordion">
                    {resultTypes.map((resultType, typeIndex) => {
                        return (
                            <div key={typeIndex} className="accordion-item">
                                <h2 className="accordion-header" id={`resultsHeader${resultType}`}>
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${resultType}Results`} aria-expanded="true" aria-controls="collapseOne">
                                        {props.searchResults[resultType].length} {props.searchResults[resultType].length > 1 ? `${resultType}s` : resultType}
                                    </button>
                                </h2>
                                <div id={`${resultType}Results`} className="accordion-collapse collapse show" aria-labelledby={`resultsHeader${resultType}`} data-bs-parent="#accordionExample">
                                    <div className={resultType === 'Tag' ? "accordion-body justify-content-center tags" : "accordion-body"}>
                                        {props.searchResults[resultType].map((result, resultIndex) => {
                                            return (
                                                <div key={resultIndex}>
                                                    {_getContentDisplay(result, resultType, props.navStack)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div>SEARCH: {props.searchQuery}</div>
                    <div>
                        {resultTypes.map((resultType, typeIndex) => {
                            return (
                                <div key={typeIndex}>
                                    <div>type: {props.searchResults[resultType].length} {props.searchResults[resultType].length > 1 ? `${resultType}s` : resultType}</div>
                                    <div>
                                        {props.searchResults[resultType].map((result, resultIndex) => {
                                            return (
                                                <div key={resultIndex}>
                                                    {_getContentDisplay(result, resultType, props.navStack)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            );
        }
    }
};
Search.propTypes = {
    searchQuery: PropTypes.string,
    alternativeMessage: PropTypes.object,
    searchResults: PropTypes.object,
    navStack: PropTypes.object.isRequired
};
export default Search;

const _getContentDisplay = (content, contentType, navStack) => {
    switch(contentType){
        case 'Post':
            return (
                <PostView
                    post={content}
                    viewSize="medium"
                    navStack={navStack}
                />
            );
            break;
        case 'User':
            return (
                <UserIdentifierWithScore
                    viewSize="large"
                    noninteractive={false}
                    user={content}
                    navStack={navStack}
                />
            );
            break;
        case 'Tag':
            const _handleTagClick = () => {
                goTo(content, 'tag', navStack, "sharedPost", "");
            };
            return (
                <div className="tags searchResults justify-content-center">
                    <span className="tag shared" onClick={_handleTagClick}>#{content.tag}</span>
                </div>
            );
            break;
        case 'Comment':
            return (
                <TopicViewComment
                    comment={content}
                    viewSize='medium'
                    viewType='CommentView'
                    sharedById=''
                    navStack={navStack}
                />
            );
            break;
        default:
            return (
                <div>Looks like you forgot about {contentType}</div>
            )
    };
}
