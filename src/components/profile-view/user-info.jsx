import React from 'react';

function UserInfo({ email, name }) {
  return (
    <>
      <h4>Your Info</h4>
      <p>User: {name}</p>
      <p>Email: {email}</p>
    </>
  );
}

export default UserInfo;
