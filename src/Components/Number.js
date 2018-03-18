import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class NumberInput extends Component {
    render() {
        const classes = this.props.classes;
        const warning = (this.props.val.error) ? this.props.helperText : '';
        return (
            <TextField
                label={this.props.label}
                type="number"
                className={classes.textField}
                InputLabelProps={{ shrink: true }}
                value={this.props.val.current}
                error={this.props.val.error}
                onChange={this.props.callback}
                helperText={warning}
                margin="normal"
            />
        );
    }
}