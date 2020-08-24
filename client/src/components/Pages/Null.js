import React from 'react';

export default function Null(props) {
  const { text } = props;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <span className="mt-3 p-4 bg-grad rounded-pill">
        {text}
      </span>
      <img className="null-image" alt="null" src="null.png" />
    </div>
  );
}
