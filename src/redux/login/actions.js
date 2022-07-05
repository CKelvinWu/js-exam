import { Auth, API, graphqlOperation } from 'aws-amplify';
import filter from 'lodash/filter';
import { createJEUser as createJEUserGraphQL } from 'graphql/mutations';
import { listJEUsers } from './queries';
import {
  AUTO_LOGIN,
  SET_USERNAME,
  SET_HOSTINGS,
  DEL_HOSTINGS,
  LOGOUT,
} from './constants';

const getJEUserByName = name =>
  API.graphql(
    graphqlOperation(listJEUsers, {
      filter: { name: { eq: name } },
      limit: 1000,
    }),
  )
    .then(resp => {
      if (!resp.data.listJEUsers.items.length) {
        throw Error('user not found');
      }
      return resp.data.listJEUsers.items[0];
    })
    .catch(err => console.warn('getJEUserByName error:', err));
const createJEUser = name =>
  API.graphql(
    graphqlOperation(createJEUserGraphQL, {
      input: { name },
    }),
  )
    .then(resp => resp.data.createJEUser)
    .catch(err => console.error('createJEUser error:', err));

export function autoLogin() {
  return async dispatch => {
    const result = await Auth.signIn('Interviewee', 'Interviewee@123456');
    dispatch({
      type: AUTO_LOGIN,
      isLogin: !!result,
    });
  };
}

export function setUsername(data) {
  localStorage.setItem('username', data);
  return async dispatch => {
    try {
      const jeUser =
        (await getJEUserByName(localStorage.username)) ||
        (await createJEUser(localStorage.username));

      localStorage.setItem('jeUser', JSON.stringify(jeUser));
      if (jeUser.room) {
        dispatch(setHostings(jeUser.room.id));
      }
    } catch (error) {
      console.log('error:', error);
    }
    dispatch({
      type: SET_USERNAME,
      data,
    });
  };
}

export function setHostings(roomId) {
  const hostings = JSON.parse(localStorage.getItem('hostings')) || [];
  hostings.push(roomId);
  localStorage.setItem('hostings', JSON.stringify(hostings));
  return {
    type: SET_HOSTINGS,
    data: hostings,
  };
}

export function deleteHostings(roomId) {
  let hostings = JSON.parse(localStorage.getItem('hostings'));
  hostings = filter(hostings, id => id !== roomId);
  localStorage.setItem('hostings', JSON.stringify(hostings));
  return {
    type: DEL_HOSTINGS,
    data: hostings,
  };
}

export function clearUser() {
  localStorage.removeItem('username');
  localStorage.removeItem('hostings');
  localStorage.removeItem('jeUser');
  return {
    type: LOGOUT,
  };
}
