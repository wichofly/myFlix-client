import React, { useState, useEffect } from 'react';
import Link from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

import './profile-view.scss';

export function ProfileView({ movies, onUpdateUserInfo, user }) {
  const favoriteMovieList = movies.filter((movies) => {});

  const getUser = () => {};

  const handleSubmit = (e) => {};

  const removeFav = (id) => {};

  const handleUpdate = (e) => {};

  useEffect(() => {});

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.username} email={user.email} />
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
      </Row>
    </Container>
  );
}
