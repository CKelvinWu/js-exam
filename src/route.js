import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Admin from 'containers/Admin';
import ExamPage from 'containers/ExamPage';
import MainPage from 'containers/MainPage';
import DispatchPage from 'containers/DispatchPage';
import PlaybackPage from 'containers/PlayBackPage';
import EditQuestionPage from 'containers/EditQuestionPage';
import NotFoundPage from 'containers/NotFoundPage';
import CandidateListPage from 'containers/CandidateListPage';
import { checkPermission } from 'utils/auth';

const { PUBLIC_URL } = process.env;

class route extends Component {
  state = {
    shouldLogin: true,
    hasPermission: false,
  };

  async componentDidMount() {
    await this.checkPermission();
  }

  checkPermission = async () => {
    let isAdmin = await checkPermission();
    this.setState({
      hasPermission: isAdmin,
      shouldLogin: !localStorage.username,
    });
  };

  render() {
    const { hasPermission, shouldLogin } = this.state;
    return (
      <Router basename={PUBLIC_URL}>
        <>
          {shouldLogin || hasPermission ? (
            <Switch>
              <Route path="/admin">
                <Admin>
                  <Route exact path="/admin" component={MainPage} />
                  <Route
                    exact
                    path="/admin/dispatch/:roomId"
                    component={DispatchPage}
                  />
                  <Route
                    exact
                    path="/admin/playback/:testId"
                    component={PlaybackPage}
                  />
                  <Route
                    exact
                    path="/admin/add"
                    render={props => <EditQuestionPage {...props} type="add" />}
                  />
                  <Route
                    exact
                    path="/admin/edit"
                    render={props => (
                      <EditQuestionPage {...props} type="edit" />
                    )}
                  />
                  <Route
                    exact
                    path="/admin/candidates"
                    component={CandidateListPage}
                  />
                </Admin>
              </Route>
              <Route exact path="/exam/:roomId" component={ExamPage} />
              <Redirect exact from="/" to="/admin" />
              <Route component={NotFoundPage} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/exam/:roomId" component={ExamPage} />
              <Route component={NotFoundPage} />
            </Switch>
          )}
        </>
      </Router>
    );
  }
}

export default route;
