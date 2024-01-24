import React, { useState, useEffect } from 'react';
import Link from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

import './profile-view.scss';

export function ProfileView({ movies, onUpdateUserInfo, user }) {
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);
  let token = localStorage.getItem('token');

  useEffect(() => {
    // take the favorite movie ids
    const favMovieIds = user.favoriteMovies;
    const favoriteMovieListLocal = [];
    movies.forEach((movie) => {
      // if movie id is in favMovieIds, then add to favMovieList
      if (favMovieIds.includes(movie._id)) {
        favoriteMovieListLocal.push(movie);
      }
    });
    setFavoriteMovieList(favoriteMovieListLocal);
  }, [movies]);

  const getUser = () => {
    axios
      .get(`https://wichoflix.onrender.com/users/${currentUser}`, {
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

  const removeFav = (id) => {
    let url = `https://wichoflix.onrender.com/users/${localStorage.getItem(
      'user'
    )}/movies/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      ...user,
    };
    axios
      .put(`https://wichoflix.onrender.com/users/${user.username}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.setItem('user', JSON.stringify(user));
      });
  };

  const deleteUser = () => {
    axios
      .delete(`https://wichoflix.onrender.com/users/${user.username}`, {
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

  const updateFavoriteMovieList = (newFavMovies) => {
    setFavoriteMovieList(newFavMovies);
  };

  useEffect(() => {
    getUser;
  });

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card style={{background: '#bae1db'}}>
            <Card.Body>
              <UserInfo name={user.username} email={user.email} />
              <Button className="mt-3" variant="dark" onClick={deleteUser}>
                Delete User
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser handleSubmit={handleSubmit} user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <FavoriteMovies
          favoriteMovieList={favoriteMovieList}
          movies={movies}
          user={user}
          updateFavoriteMovieList={updateFavoriteMovieList}
        />
      </Row>
    </Container>
  );
}
