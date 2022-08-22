import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from 'graphql/mutations';
import get from 'lodash/get';
import { message } from 'antd';

export function createSnapComment(data, callback) {
  return async (dispatch, getState) => {
    let latestHistoryId = get(getState(), 'history.data.id');
    // Temporary work around for cannot fetch latest history
    if (!latestHistoryId) {
      const { id: recordId } = getState().record;
      const code = get(getState(), 'room.currentRecord.syncCode');
      if (recordId) {
        try {
          const {
            data: {
              createHistory: { id: historyId },
            },
          } = await API.graphql(
            graphqlOperation(mutations.createHistory, {
              input: {
                time: new Date(),
                code,
                historyRecordId: recordId,
              },
            }),
          );
          latestHistoryId = historyId;
        } catch (error) {
          console.log(error);
        }
      }
    }
    // End
    if (latestHistoryId) {
      try {
        const params = {
          input: {
            time: new Date(),
            author: window.localStorage.getItem('username') || 'Unknown',
            snapCommentHistoryId: latestHistoryId,
            ...data,
          },
        };
        await API.graphql(
          graphqlOperation(mutations.createSnapComment, params),
        );
        !!callback && callback();
      } catch (error) {
        console.log(error);
        message.error('Add comment failed');
      }
    }
  };
}
