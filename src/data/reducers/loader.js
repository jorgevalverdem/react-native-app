import types from '../actions/loader/types';
import {createReducer} from '../util/redux';

export const INITIAL_STATE = {
  loading: false,
  defaultText: null,
  text: null,
};
const reducer = createReducer(INITIAL_STATE, {
  [types.INIT_LOADING]: (state) => ({
    ...state,
    loading: true,
  }),
  [types.FINALIZE_LOADING]: (state) => ({
    ...state,
    loading: false,
  }),
  [types.SET]: (state, action) => ({
    ...state,
    [action.payload.key]: action.payload.value,
  }),
});

export default reducer;
