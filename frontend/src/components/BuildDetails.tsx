import React from 'react';
import { useParams } from 'react-router-dom';

const BuildDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Build Details - {id}</h1>
      {/* Add your build details content here */}
    </div>
  );
};

export default BuildDetails;