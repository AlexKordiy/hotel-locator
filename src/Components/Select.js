import React, { Component } from 'react';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';


export default class SelectInput extends Component {
    render() {
        const classes = this.props.classes;
        const warning = (this.props.val.error) ? this.props.helperText : '';
        return (
            <TextField
                select
                label={this.props.label}
                className={classes.textField}
                value={this.props.val.current}
                error={this.props.val.error}
                onChange={this.props.callback}
                SelectProps={{ MenuProps: { className: classes.menu } }}
                helperText={warning}
                margin="normal">
                {this.props.items.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </TextField>
        );
    }
}