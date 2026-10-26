import React from 'react'

const Time = () => {
     const now = new Date().toLocaleTimeString();
  return <div>Time: {now}</div>;
};

export default Time;