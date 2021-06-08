import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Image from "../../common/Image"

const useStyles = makeStyles((theme) => ({
    choose: {
        textAlign: "center",
        margin: "0 auto",
        paddingBottom: theme.spacing(8),
    },
    cardInfo: {
        height: "280px",
        margin: "20px",
        border: "solid 1px",
        borderRadius: "10px",
        position: "relative",
    },
    cardImage: {
        width: " 100%",
        height: " 210px",
        margin: "auto",
        borderRadius: "10px 10px 0 0",
        objectFit: "cover"
    },
    description: {
        position: "absolute",
        width: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "45px",
        fontSize: "16px",
        fontWeight: 700,
        color: "#323312"

    },
    buttonCard: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "10px",
        height: "30px",
        backgroundColor: "#cf7b3c"
    },
    pagination: {
        margin: "16px auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
}));

export default function Choose(props) {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [visibleSize, setVisibleSize] = useState(3);
    const Last = page * visibleSize;
    const First = Last - visibleSize;

    const ShowMoreItems = () => {
        setVisibleSize(5);
    };

    const ShowLessItems = () => {
        setPage(1);
        setVisibleSize(3);
    };

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <section>
            <Container className={classes.choose}>
                <Typography variant="h4" className={classes.title}>
                    {props.data.title}
                </Typography>
                <div>
                    {props.data.photobook.slice(First, Last).map((cardInfo, index) => {
                        return <div className={classes.cardInfo}>
                            <Image className={classes.cardImage} {...cardInfo.img} />
                            <Typography variant="h5" className={classes.description}>{cardInfo.description + "  " + cardInfo.price}</Typography>
                            <Button variant="contained" color="primary" className={classes.buttonCard}> すぐ作成 </Button>
                        </div>
                    })}
                </div>
                {visibleSize === 3 ? (
                    <div className={classes.button}>
                        <Button variant="contained" color="primary" onClick={ShowMoreItems}> もっと見る </Button>
                    </div>
                ) : null}

                {visibleSize === 5 ? (
                    <div className={classes.pagination}>
                        <Pagination
                            count={Math.ceil(props.data.photobook.length / visibleSize)}
                            color="primary"
                            page={page}
                            onChange={handleChange}
                            shape="rounded"
                            disabled={false}
                        />
                        <Button variant="contained" color="primary" onClick={ShowLessItems}> キャンセル </Button>
                    </div>
                ) : null}
            </Container>
        </section>
    );
}

Choose.propTypes = {
    data: PropTypes.any.isRequired,
};
