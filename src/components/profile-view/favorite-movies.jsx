import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Figure, Button, Card } from 'react-bootstrap';
import axios from 'axios';

import './profile-view.scss';

function FavoriteMovies({ favoriteMovieList }) {
  const getUser = () => {
    axios
      .get(`https://wichoflix.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFavoriteMovies(response.data.favoriteMovies);
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let url = `https://wichoflix.herokuapp.com/users/${localStorage.getItem(
      'user'
    )}/movies/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    useEffect(() => {
      getUser();
    }, []);
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={2}>
            <h4>Favorite Movies</h4>
          </Col>
        </Row>

        <Row>
          {favoriteMovieList.map(({ imageURL, title, _id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${movies._id}`}>
                    <Figure.Image src={imageURL} alt={title} />
                    <Figure.Caption>{title}</Figure.Caption>
                  </Link>
                </Figure>
                <Button
                  variant="secondary"
                  onClick={() => removeFav(movies._id)}
                >
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
