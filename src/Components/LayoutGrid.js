import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

function LayoutGrid(props) {
    const { classes } = props;

    const gridItem = (inbox) => (
        <Grid item xs={props.xs} sm={props.sm} md={props.md} lg={props.lg}>
            {inbox}
        </Grid>);

    const body = (Array.isArray(props.rows)) ? (props.rows.map((val, index) =>
        <Fragment key={index}>{gridItem(val)}</Fragment>)) : gridItem(props.rows);

    return (
        <div className={classes.root}>
            <Grid container spacing={props.spacing}
                alignItems={props.alignItems}
                direction={props.direction}
                justify={props.justify}
            >
                {body}
            </Grid>
        </div>
    );
}

LayoutGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LayoutGrid);