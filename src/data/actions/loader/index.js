import {makeActionCreator} from '../../util/redux';
import types from './types';

const actions = {
  initLoading: makeActionCreator(types.INIT_LOADING),
  finishLoading: makeActionCreator(types.FINALIZE_LOADING),
  set: makeActionCreator(types.SET),
};

export {actions as default};
