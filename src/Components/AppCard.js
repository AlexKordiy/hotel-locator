import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import classnames from 'classnames';

const styles = theme => ({
    card: {
        maxWidth: 350
    },
    media: {
        height: 200,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

class AppCard extends Component {
    state = { expanded: false };
    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={this.props.logo}
                        title={this.props.title}
                    />
                    <CardContent><h4> {this.props.name}</h4></CardContent>
                    <CardActions>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {this.props.description}
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

AppCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppCard);
