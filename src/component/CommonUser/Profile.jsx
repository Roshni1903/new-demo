import React from "react";

export default function Profile() {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20px', padding: '20px' }}>
      <h2>Profile</h2>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
}
