import {takeEvery, put, select} from 'redux-saga/effects';
import actionsLoader from '../actions/loader';
import typesLoader from '../actions/loader/types';
import selectorsLoader from '../selectors/loader';

function* handleInitLoading(action = null) {
  if (action && action.payload) {
    yield put(
      actionsLoader.set({
        key: 'text',
        value: action.payload,
      }),
    );
    return;
  }
  const defaultText = yield select(selectorsLoader.defaultTextLoader);
  const hasText = yield select(selectorsLoader.textLoader);
  if (defaultText && defaultText !== hasText) {
    yield put(
      actionsLoader.set({
        key: 'text',
        value: defaultText,
      }),
    );
  }
}

const sagas = [takeEvery(typesLoader.INIT_LOADING, handleInitLoading)];

export {sagas as default};
