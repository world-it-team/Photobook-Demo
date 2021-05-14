import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    choose: {
        textAlign: "center",
        margin: "0 auto",
        paddingBottom: theme.spacing(8),
    }
}));

export default function Choose(props) {
    const classes = useStyles();
    return (
        <section>
            <Container className={classes.choose}>
                <Typography variant="h4" className={classes.title}>
                    {props.data.title}
                </Typography>
            </Container>
        </section>
    );
}

Choose.propTypes = {
    data: PropTypes.any.isRequired,
};
