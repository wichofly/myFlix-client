import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Figure, Button, Card } from 'react-bootstrap';
import axios from 'axios';

import './profile-view.scss';

function FavoriteMovies({ favoriteMovieList, user, updateFavoriteMovieList }) {
  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let url = `https://wichoflix.herokuapp.com/users/${user.username}/movies/${id}`;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        const newFavMovies = favoriteMovieList.filter((m) => m._id !== id);
        updateFavoriteMovieList(newFavMovies);
        user.favoriteMovies = newFavMovies.map((m) => m._id);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('user', user);
      });
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={2} >
            <h4 className='fav-text'>Favorite Movies</h4>
          </Col>
        </Row>

        <Row>
          {favoriteMovieList.map(({ imageURL, title, _id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${_id}`}>
                    <Figure.Image src={imageURL} alt={title} />
                    <Figure.Caption>{title}</Figure.Caption>
                  </Link>
                </Figure>
                <Button variant="secondary" onClick={() => removeFav(_id)}>
                  Remove
                </Button>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FavoriteMovies;
