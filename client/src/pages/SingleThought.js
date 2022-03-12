import React from 'react';

import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';

// import the new ReactionList component
import ReactionList from '../components/ReactionList';

const SingleThought = props => {
  
  // grab the id from window using react
  const { id: thoughtId } = useParams();
  console.log(thoughtId);

  //to obtain the singlethought data
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }
  });
  
  const thought = data?.thought || {};
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {/* thought reaction add here */}
      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
    </div>
  );
};

export default SingleThought;
