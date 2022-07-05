/*
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from 'graphql/mutations';
import { action } from 'utils/actionsHelper';
import { message } from 'antd';
import { setHostings } from 'redux/login/actions';
import { CREATE_ROOM } from './constants';

export const createRoomActions = {
  reset: () => action(CREATE_ROOM.RESET),
  request: data => action(CREATE_ROOM.REQUEST, { data }),
  success: data => action(CREATE_ROOM.SUCCESS, { data }),
  failure: error => action(CREATE_ROOM.FAILURE, { error }),
};

export function createRoom(data) {
  return async dispatch => {
    dispatch(createRoomActions.request(data));
    try {
      const roomNum = Math.floor(Math.random() * 98) + 1;
      const roomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      const createTime = new Date();
      const jeUser = JSON.parse(localStorage.jeUser);

      const { data: testData } = await API.graphql(
        graphqlOperation(mutations.createTest, {
          input: {
            timeBegin: createTime,
            status: 'open',
            testHostId: jeUser.id,
            ...data,
          },
        }),
      );

      const { data: roomData } = await API.graphql(
        graphqlOperation(mutations.createRoom, {
          input: {
            roomTestId: testData.createTest.id,
            roomHostId: jeUser.id,
            description: roomChar + roomNum,
            createTime,
            ...data,
          },
        }),
      );

      await API.graphql(
        graphqlOperation(mutations.createTestJEUser, {
          input: {
            userID: jeUser.id,
            testID: testData.createTest.id,
          },
        }),
      );

      await API.graphql(
        graphqlOperation(mutations.updateJEUser, {
          input: {
            id: jeUser.id,
            jEUserRoomId: roomData.createRoom.id,
            jEUserHostTestId: testData.createTest.id,
          },
        }),
      );

      await API.graphql(
        graphqlOperation(mutations.updateTest, {
          input: {
            id: testData.createTest.id,
            testRoomId: roomData.createRoom.id,
          },
        }),
      );

      dispatch(createRoomActions.success(roomData.createRoom));

      /* add a hosting room into 'hostings' array in local storage */
      dispatch(setHostings(roomData.createRoom.id));
    } catch (error) {
      dispatch(createRoomActions.failure(error));
      message.error('Create room failed');
      console.log(error);
    }
  };
}
