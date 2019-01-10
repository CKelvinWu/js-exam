const initialState = {
  loading: false,
  id: '',
  syncCode: '',
  timeBegin: null,
  timeEnd: null,
  ques: null,
  videoUrl: '',
};

const record = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_RECORD_STARTED':
    case 'UPDATE_RECORD_STARTED':
      return {
        ...state,
        loading: true,
      };
    case 'CREATE_RECORD_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload.result,
      };
    case 'UPDATE_RECORD_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload.result,
      };
    case 'CREATE_RECORD_FAILURE':
    case 'UPDATE_RECORD_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case 'SET_CURRENT_RECORD': // set current record from room
      return {
        ...state,
        ...action.payload,
      };
    case 'RESET_CURRENT_RECORD': // set current record from room
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default record;
