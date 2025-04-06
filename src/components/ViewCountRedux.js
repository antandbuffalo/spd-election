import React from 'react';
import { useGetViewCountQuery } from '../store/api/apiSlice';

const ViewCountRedux = () => {
  const { data, isLoading, isError, refetch } = useGetViewCountQuery();

  if (isLoading) return <div>Loading view count...</div>;
  if (isError) return <div>Error loading view count</div>;

  return (
    <div>
      <h3>View Count (Redux): {data?.count || 0}</h3>
      <button onClick={refetch}>Refresh Count</button>
    </div>
  );
};

export default ViewCountRedux;