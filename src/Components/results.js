import React, { Component, Fragment } from 'react';
import LayoutGrid from './LayoutGrid';
import { connect } from 'react-redux';
import AppCard from './AppCard';

import Table, {
    TableFooter,
    TablePagination,
    TableRow,
} from 'material-ui/Table';
import PaginationActions from './PaginationActions';

import { SET_PAGE, SET_ROWS_PER_PAGE } from '../Actions/result';


class ResultsView extends Component {
    handleChangePage = (event, page) => {
        this.props.onSET_PAGE(page);
    };

    handleChangeRowsPerPage = event => {
        this.props.onSET_ROWS_PER_PAGE(event.target.value);
    };

    render() {
        const AppCards = () =>
            this.props.resultState.results.slice(this.props.page * this.props.rowsPerPage, this.props.page * this.props.rowsPerPage + this.props.rowsPerPage).map(
                (val, index) => <AppCard
                    key={index}
                    name={val.property_name}
                    logo={(val.images.length > 0) ? val.images[0].url : 'static/img/house.png'}
                    description={
                        <Fragment>
                            <p>Адресс: {`${val.address.line1} ${val.address.city} ${val.address.postal_code} ${val.address.country}`}</p>
                            <ul>{val.contacts.map((contact, ind) => <li key={ind}>{contact.type} {contact.detail}</li>)}</ul>
                            <p>Удобства:</p>
                            <ul>{val.amenities.map((amenities, ind) => <li key={ind}>{amenities.description}</li>)}</ul>
                            <p>Номера в продаже:</p>
                            <ul>{val.rooms.map((room, ind) => <li key={ind}>{room.room_type_info.room_type} {`${room.total_amount.amount} ${room.total_amount.currency}`}</li>)}</ul>
                        </Fragment>
                    }
                />);
        const data = this.props.resultState.results;
        return (
            <Fragment>
                <LayoutGrid
                    spacing={16} rows={(data) ? AppCards() : ''}
                    xs={12} sm={6} md={4} lg={2}
                />
                <Table>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={3}
                                count={(data) ? data.length : 0}
                                rowsPerPage={this.props.rowsPerPage}
                                page={this.props.page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                Actions={PaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    resultState: state.result.serverData,
    page: state.result.page,
    rowsPerPage: state.result.rowsPerPage
});
const mapDispatchToProps = dispatch => ({
    onSET_PAGE: payload => dispatch(SET_PAGE(payload)),
    onSET_ROWS_PER_PAGE: payload => dispatch(SET_ROWS_PER_PAGE(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultsView); 