import React from "react";

const Reels: React.FC = () => {

  const getAccessToken = () => {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      acc[name] = value;
      return acc;
    }, {} as { [key: string]: string });

    console.log("Access Token:", cookies['access_token']);
  };

  return (
    <div className="d-flex">
      <button onClick={getAccessToken}>Get Access Token</button>
    </div>
  );
};

export default Reels;
