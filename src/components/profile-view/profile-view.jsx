import React, { useState, useEffect } from 'react';
import Link from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

import './profile-view.scss';

export function ProfileView({ movies, onUpdateUserInfo, user }) {
  const favoriteMovieList = movies.filter((movies) => {});

  const getUser = () => {
    axios
      .get(`https://wichoflix.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setBirthday(response.data.birthday);
        setFavoriteMovies(response.data.favoriteMovies);
        console.log(response);
        console.log(response.data.movies);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {};

  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let url = `https://wichoflix.herokuapp.com/users/${localStorage.getItem(
      'user'
    )}/movies/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleUpdate = (e) => {};

  const deleteUser = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios
      .delete(`https://wichoflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        alert('Your profile has been deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log('Error');
      });
  };

  useEffect(() => {
    getUser;
  });

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.username} email={user.email} />
              <Button className="mt-3" variant="primary" onClick={deleteUser}>
                Delete User
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <FavoriteMovies favoriteMovieList={favoriteMovieList} />
        <Button variant="primary" onClick={() => removeFav(movies._id)}>
          Remove from Favorites Movies
        </Button>
      </Row>
    </Container>
  );
}
