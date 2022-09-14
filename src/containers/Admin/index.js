import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAuthenticator, SignIn } from 'aws-amplify-react';
import { checkPermission } from 'utils/auth/auth';

import NotFoundPage from 'containers/NotFoundPage';
import Header from './Header';
import SignOnModal from './SignOnModal';

class Admin extends Component {
  state = {
    hasPermission: false,
  };

  async componentDidMount() {
    await this.checkPermission();
  }

  checkPermission = async () => {
    const isAdmin = await checkPermission();
    if (isAdmin === 'not authenticated') return;
    this.setState({
      hasPermission: isAdmin,
    });
  };

  render() {
    const { hasPermission } = this.state;
    const { children } = this.props;
    return hasPermission ? (
      <React.Fragment>
        <SignOnModal />
        <Header />
        {children}
      </React.Fragment>
    ) : (
      <NotFoundPage />
    );
  }
}

Admin.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default withAuthenticator(Admin, [<SignIn />]);
