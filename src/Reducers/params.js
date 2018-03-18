import { createReducer } from 'redux-act';

const initialState = {
    currencies: [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'EUR',
            label: '€',
        },
        {
            value: 'RUB',
            label: '₽',
        }
    ],
    cities: [
        {
            value: 'LWO',
            label: 'Львов'
        },
        {
            value: 'KBP',
            label: 'Борисполь'
        },
        {
            value: 'ODS',
            label: 'Одесса'
        },
        {
            value:'IEV',
            label:'Киев'
        }
    ],
    currency: { current: 'USD', error: false },
    city: { current: 'LWO', error: false },
    check_in: { current: '', error: false },
    check_out: { current: '', error: false },
    radius: { current: 42, error: false },
    max_rate: { current: 500, error: false },
    valid: false,
    spiner: false
};

const validate = (input) => ((input.current) ?
    input : { current: input.current, error: true });

export default createReducer({
    SET_CURRENCY: (state, payload) =>
        ({ ...state, currency: payload }),
    SET_CITY: (state, payload) =>
        ({ ...state, city: payload }),
    SET_CHECK_IN: (state, payload) =>
        ({ ...state, check_in: payload }),
    SET_CHECK_OUT: (state, payload) =>
        ({ ...state, check_out: payload }),
    SET_RADIUS: (state, payload) =>
        ({ ...state, radius: payload }),
    SET_MAX_RATE: (state, payload) =>
        ({ ...state, max_rate: payload }),
    VALIDATE: state =>
        ({
            ...state,
            currency: validate(state.currency),
            city: validate(state.city),
            check_in: validate(state.check_in),
            check_out: validate(state.check_out),
            radius: validate(state.radius),
            max_rate: validate(state.max_rate)
        }),
    VERIFY: (state) => ({
        ...state,
        valid: (
            state.currency.error === true ||
            state.city.error === true ||
            state.check_in.error === true ||
            state.check_out.error === true ||
            state.radius.error === true ||
            state.max_rate.error === true
        ) ? false : true
    }),
    TOGGLE_SPINER: (state) => ({
        ...state,
        spiner: !state.spiner
    })

}, initialState);