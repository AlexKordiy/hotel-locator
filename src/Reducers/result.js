import { createReducer } from 'redux-act';

const initialState = {
    serverData: {},
    page: 0,
    rowsPerPage: 10
};

export default createReducer({
    FETCH_DATA: (state, payload) => ({ ...state, serverData: payload }),
    SET_PAGE: (state, payload) => ({ ...state, page: payload }),
    SET_ROWS_PER_PAGE: (state, payload) => ({ ...state, rowsPerPage: payload })
}, initialState);