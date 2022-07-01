import React, { useState } from 'react';
import MovieDataService from "../services/movies";
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const AddReview = ({ user }) => {
    const navigate = useNavigate()
    // hook useNavigate will enable us to send our user back to the movie page when the review has been submitted.
    let params = useParams();

    let editing = false;   // indicating whether it's a new review or existing one
    let initialReviewState = "";

    let location = useLocation();
    console.log(location);

    //TODO::
    if (location.state && location.state.currentReview) {
        editing = true;
        initialReviewState = location.state.currentReview.text
    }

    // useState hook is used to create the review object itself
    const [review, setReview] = useState(initialReviewState);
    // check whether review was submitted or not, starting with false

    //when user type something in text box
    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }

    const saveReview = () => {
        var data = {
            review: review,
            name: user.name,
            user_id: user.googleId,
            movie_id: params.id // get movie id from url
        }

        if (editing) {
            //TODO : Handle case where an existing review is being updated

            data.review_id = location.state.currentReview._id
            MovieDataService.updateReview(data)
                // .then(response => {
                //     setSubmitted(true);
                //     console.log(response.data);
                // })
                .then(response => {
                    navigate("/movies/" + params.id)
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            MovieDataService.createReview(data)
                .then(response => {
                    navigate("/movies/" + params.id)
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <Container className="main-container">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        review={review}
                        onChange={onChangeReview}
                        defaultValue={editing ? location.state.currentReview.review : ""}

                    />
                </Form.Group>
                <Button variant="primary" onClick={saveReview}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
};


export default AddReview;