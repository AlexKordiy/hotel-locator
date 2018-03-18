import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import { withRouter } from 'react-router-dom';
import LayoutGrid from './LayoutGrid';
import { connect } from 'react-redux';
import {
  SET_CURRENCY,
  SET_CITY,
  SET_CHECK_IN,
  SET_CHECK_OUT,
  SET_RADIUS,
  SET_MAX_RATE,
  VALIDATE,
  VERIFY,
  TOGGLE_SPINER
} from '../Actions/params';

import { FETCH_DATA } from '../Actions/result';

import SelectInput from './Select';
import DataPickerInput from './DataPicker';
import NumberInput from './Number';
import { styles } from './inputstyler';

import { getValues } from '../Utils/api';

const url = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-airport';
const apikey = 'fsdQBvm9eTbUOI6eCe6GvtjRGGedP686';

async function SendRequest(location, checkin, checkout, radius, currency, maxrate) {
  const params = `?apikey=${apikey}&location=${location}&check_in=${checkin}&check_out=${checkout}&radius=${radius}&currency=${currency}&max_rate=${maxrate}`;
  return await getValues(`${url}${params}`);
}

class TextFields extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.resultRedirect = this.resultRedirect.bind(this);
  }
  resultRedirect() {
    this.props.history.push('/result');
  }
  handleChange = name => event => {
    switch (name) {
      case 'select-city':
        this.props.onSET_CITY({ current: event.target.value, error: false });
        break;
      case 'check_in':
        this.props.onSET_CHECK_IN({ current: event.target.value, error: false });
        break;
      case 'check_out':
        this.props.onSET_CHECK_OUT({ current: event.target.value, error: false });
        break;
      case 'radius':
        this.props.onSET_RADIUS({ current: event.target.value, error: false });
        break;
      case 'currency':
        this.props.onSET_CURRENCY({ current: event.target.value, error: false });
        break;
      case 'max_rate':
        this.props.onSET_MAX_RATE({ current: event.target.value, error: false });
        break;
      case 'search':
        new Promise((resolve, reject) => {
          this.props.onVALIDATE()
          this.props.onVERIFY()
          resolve();
        })
          .then(() => {
            if (this.props.paramsState.valid === true) {
              this.props.onTOGGLE_SPINER();
              this.props.onSEND_REQUEST({
                urlparams: [
                  this.props.paramsState.city.current,
                  this.props.paramsState.check_in.current,
                  this.props.paramsState.check_out.current,
                  this.props.paramsState.radius.current,
                  this.props.paramsState.currency.current,
                  this.props.paramsState.max_rate.current
                ],
                redirect: this.resultRedirect
              });
            }
          })
          .catch((err) => console.log(err))
        break;
      default:
        return;
    }
  };

  render() {
    const { classes } = this.props;
    const body = [
      <form className={classes.container}>
        <SelectInput label="Город/Аэропорт"
          classes={classes}
          val={this.props.paramsState.city}
          callback={this.handleChange('select-city')}
          helperText="Пожалуйста укажите Ваш город/аэропорт"
          items={this.props.paramsState.cities}
        />
        <DataPickerInput label="Дата приезда в отель"
          classes={classes}
          val={this.props.paramsState.check_in}
          callback={this.handleChange('check_in')}
          helperText="Пожалуйста укажите Вашу дату приезда"
        />
        <DataPickerInput label="Дата отъезда из отеля"
          classes={classes}
          val={this.props.paramsState.check_out}
          callback={this.handleChange('check_out')}
          helperText="Пожалуйста укажите Вашу дату отъезда"
        />
        <NumberInput label="Радиус (км)"
          id="radius"
          classes={classes}
          val={this.props.paramsState.radius}
          callback={this.handleChange('radius')}
          helperText="Пожалуйста укажите радиус поиска"
        />
        <SelectInput label="Валюта"
          classes={classes}
          val={this.props.paramsState.currency}
          callback={this.handleChange('currency')}
          helperText="Пожалуйста укажите Вашу валюту"
          items={this.props.paramsState.currencies}
        />
        <NumberInput label="Максимальная цена"
          classes={classes}
          val={this.props.paramsState.max_rate}
          callback={this.handleChange('max_rate')}
          helperText="Пожалуйста укажите максимальную цену аренды"
        />
      </form>,
      <Button variant="raised"
        color="primary"
        className={classes.button}
        onClick={this.handleChange('search')}>
        Поиск
    </Button>];
    return (
      <Fragment>
        <div className={classes.root}>
          <LinearProgress color="secondary"
            style={{
              visibility: (this.props.paramsState.spiner)
                ? 'visible' : 'hidden'
            }}
          />
        </div>
        <LayoutGrid
          spacing={16} rows={body}
          xs={12} sm={12} md={12} lg={12}
          alignItems="center"
          direction="column"
          justify="center"
        />
      </Fragment>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onSET_CITY: (payload) => dispatch(SET_CITY(payload)),
  onSET_CURRENCY: (payload) => dispatch(SET_CURRENCY(payload)),
  onSET_CHECK_IN: (payload) => dispatch(SET_CHECK_IN(payload)),
  onSET_CHECK_OUT: (payload) => dispatch(SET_CHECK_OUT(payload)),
  onSET_RADIUS: (payload) => dispatch(SET_RADIUS(payload)),
  onSET_MAX_RATE: (payload) => dispatch(SET_MAX_RATE(payload)),
  onVALIDATE: () => dispatch(VALIDATE()),
  onVERIFY: () => dispatch(VERIFY()),
  onTOGGLE_SPINER: () => dispatch(TOGGLE_SPINER()),

  onSEND_REQUEST: (payload) => {
    const asyncFetchData = () => {
      return dispatch => {
        SendRequest(...payload.urlparams)
          .then((data) => {
            dispatch(FETCH_DATA(data));
            dispatch(TOGGLE_SPINER());
            payload.redirect();
          })
          .catch((error) => { console.log(error) })
      }
    }
    dispatch(asyncFetchData());
  }
});
const mapStateToProps = state => ({
  paramsState: state.params,
  resultState: state.result
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TextFields)));
