/* eslint-disable import/first */

jest.mock('aws-amplify', () => ({
  Auth: {},
  API: {},
  graphqlOperation: jest.fn(),
}));

import { Auth, API, graphqlOperation } from 'aws-amplify';
import filter from 'lodash/filter';
import { listJEUsers } from 'graphql/queries';
import * as actions from './actions';
import { AUTO_LOGIN, SET_HOSTINGS, DEL_HOSTINGS, LOGOUT } from './constants';

describe('test login action', () => {
  const dispatch = jest.fn();

  describe('autoLogin', () => {
    beforeAll(async () => {
      jest.resetAllMocks();
      Auth.signIn = jest.fn((name, password) => true);
      await actions.autoLogin()(dispatch);
    });

    it('should trigger Auth.signIn function', async () => {
      expect(Auth.signIn).toBeCalledWith('Interviewee', 'Interviewee@123456');
    });

    it('should dispatch AUTO_LOGIN', async () => {
      expect(dispatch).toBeCalledWith({
        type: AUTO_LOGIN,
        isLogin: true,
      });
    });
  });

  describe('setUserName', () => {
    const username = 'user name';
    const jeUsers = [{ name: username, room: { id: 'id_1' } }];
    const jeUser = jeUsers[0];
    const apiPromise = (success, items) =>
      new Promise((resolve, reject) => {
        if (success)
          resolve({
            data: {
              listJEUsers: {
                items,
              },
            },
          });
        else reject(new Error('api error'));
      });

    let setHosingsSpy;
    beforeAll(async () => {
      jest.resetAllMocks();
      jest.spyOn(Storage.prototype, 'setItem');
      setHosingsSpy = jest
        .spyOn(actions, 'setHostings')
        .mockImplementation(data => ({
          type: SET_HOSTINGS,
          data,
        }));
      API.graphql = jest.fn(() => apiPromise(true, jeUsers));
      graphqlOperation.mockImplementation(() => 'some graphql code');
      await actions.setUsername(username)(dispatch);
    });

    afterAll(() => {
      setHosingsSpy.mockRestore();
    });

    it('should set username to localStorage', () => {
      expect(localStorage.setItem).toBeCalledWith('username', username);
    });

    it('should set jeUser to localStorage', () => {
      expect(localStorage.setItem).toBeCalledWith(
        'jeUser',
        JSON.stringify(jeUser),
      );
    });

    it('should trigger graphql api', () => {
      expect(graphqlOperation).toBeCalledWith(listJEUsers, {
        filter: { name: { eq: username } },
        limit: 1000,
      });
      expect(API.graphql).toBeCalledWith('some graphql code');
    });

    it('should dispatch SET_HOSTINGS if user hosts rooms', () => {
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: SET_HOSTINGS,
        data: 'id_1',
      });
    });

    it('should not dispatch SET_HOSTINGS if no room hosted', async () => {
      dispatch.mockClear();
      API.graphql = jest.fn(() => apiPromise(true, [{}]));
      await actions.setUsername(username)(dispatch);
      expect(dispatch).toBeCalledTimes(1);
    });

    it('should catch error if graphql API return error', async () => {
      const consoleLogSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(jest.fn());
      API.graphql = jest.fn(() => apiPromise(false, null));
      await actions.setUsername(username)(dispatch);
      expect(console.warn).toBeCalledWith(
        'getJEUserByName error:',
        new Error('api error'),
      );
      consoleLogSpy.mockRestore();
    });
  });

  describe('setHostings', () => {
    jest.resetAllMocks();
    const roomId = 'id_1';
    const hostings = ['id_2', 'id_3'];
    const localStorageKey = 'hostings';
    let result;

    beforeAll(() => {
      jest
        .spyOn(Storage.prototype, 'getItem')
        .mockImplementationOnce(key => JSON.stringify(hostings))
        .mockImplementationOnce(key => null);
      result = actions.setHostings(roomId);
    });

    it('should get hosings from localStorage', () => {
      expect(localStorage.getItem).toBeCalledWith(localStorageKey);
    });

    it('should set hosings to localStorage', () => {
      hostings.push(roomId);
      expect(localStorage.setItem).toBeCalledWith(
        localStorageKey,
        JSON.stringify(hostings),
      );
    });

    it('should dispatch SET_HOSTING', () => {
      expect(result).toEqual({ type: SET_HOSTINGS, data: hostings });
    });

    it('should run properly when no previous hostings', () => {
      result = actions.setHostings(roomId);
      expect(localStorage.getItem).toHaveLastReturnedWith(null);
      expect(result).toEqual({
        type: SET_HOSTINGS,
        data: ['id_1'],
      });
    });
  });

  describe('deleteHosting', () => {
    const roomId = 'id_1';
    let hostings = ['id_0', 'id_1', 'id_2'];
    const localStorageKey = 'hostings';
    let result;

    beforeAll(() => {
      jest.resetAllMocks();
      jest
        .spyOn(Storage.prototype, 'getItem')
        .mockImplementation(key => JSON.stringify(hostings));
      result = actions.deleteHostings(roomId);
    });

    it('should get hostings from localStorage', () => {
      expect(localStorage.getItem).toBeCalledWith(localStorageKey);
    });

    it('should set hosings to localStorage', () => {
      hostings = filter(hostings, id => id !== roomId);
      expect(localStorage.setItem).toBeCalledWith(
        localStorageKey,
        JSON.stringify(hostings),
      );
    });

    it('should dispatch DEL_HOSTINGS', () => {
      expect(result).toEqual({
        type: DEL_HOSTINGS,
        data: hostings,
      });
    });
  });

  describe('clearUser', () => {
    let result;

    beforeAll(() => {
      jest.resetAllMocks();
      jest.spyOn(Storage.prototype, 'removeItem');
      result = actions.clearUser();
    });

    it('should remove username from localStorage', () => {
      expect(localStorage.removeItem).toHaveBeenNthCalledWith(1, 'username');
    });

    it('should remove hostings from localStorage', () => {
      expect(localStorage.removeItem).toHaveBeenNthCalledWith(2, 'hostings');
    });

    it('should dispatch LOGOUT', () => {
      expect(result).toEqual({ type: LOGOUT });
    });
  });
});
