import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MainContainer from '/imports/components/main/mainContainer';

import 'bootstrap';
import '/imports/scss/app.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

Meteor.startup(() => {
  render(<MainContainer/>, document.getElementById('ostraka-react-target'));
});
