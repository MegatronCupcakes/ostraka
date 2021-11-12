import React from 'react';
import PropTypes from 'prop-types';
import ScoredProfile from '/imports/components/profile/scoredProfile';

const TrendingProfile = (props) => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-8 offset-md-2 mb-3 ma-3" style={{paddingTop: "1rem"}}>
            <ScoredProfile
                viewSize="medium"
                user={props.user}
                navStack={props.navStack}
            />
        </div>
    );
};
TrendingProfile.propTypes = {
    navStack: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};
export default TrendingProfile;
