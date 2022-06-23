import {call, spawn, all} from 'redux-saga/effects';
import loader from './loader';

const sagasWeb = [
  ...loader,
];

const sagas =
sagasWeb;

export function* handleError(errorParam) {
  yield errorParam;
}

export default function* rootSaga() {
  yield all(
    sagas.map((saga) =>
      spawn(function* listenErrors() {
        let isSyncError = false;
        const resetSyncError = () => {
          isSyncError = false;
        };
        let httpError = false;
        while (true) {
          httpError = false;
          isSyncError = true;
          try {
            setTimeout(resetSyncError);

            yield call(function* execSaga() {
              yield saga;
            });
          } catch (e) {
            httpError = typeof error.httpError !== 'undefined';
            if (!httpError && isSyncError) {
              throw new Error(
                `${saga.name} was terminated because it threw an exception on startup.`,
              );
            }
            yield call(handleError, e);
          }

          try {
            if (!httpError) {
              // Para evitar que fallas infinitas bloqueen el browser...
              // yield call(delay, 1000);
            }
          } catch (e) {
            throw new Error(
              `${saga.name} was terminated because it threw an exception on startup.`,
            );
          }
        }
      }),
    ),
  );
}
