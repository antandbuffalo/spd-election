import React, { useEffect, useState } from 'react';
import FlipNumbers from 'react-flip-numbers';
import { getUsers } from '../service/api';
import './HostAnalytics.scss';

const HostAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersData = await getUsers();
        if (usersData) {
          setData(usersData);
          setError(null);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err) {
        setError('Error fetching user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="host-analytics">Loading...</div>;
  }

  if (error) {
    return <div className="host-analytics error">{error}</div>;
  }

  // Group by hostname and count
  const hostnameCounts = data.reduce((acc, item) => {
    const hostname = item.hostname || 'Unknown';
    acc[hostname] = (acc[hostname] || 0) + 1;
    return acc;
  }, {});

  // Convert to array and sort by last seen date
  const stats = Object.entries(hostnameCounts)
    .map(([hostname, count]) => ({
      hostname,
      count,
      lastSeen: Math.max(...data
        .filter(item => item.hostname === hostname)
        .map(item => item.createdAt))
    }))
    .sort((a, b) => b.lastSeen - a.lastSeen); // Sort by lastSeen in descending order

  return (
    <div className="host-analytics">
      <h3>Hostname Statistics</h3>
      <div className="stats-list">
        {stats.map((stat) => (
          <div key={stat.hostname} className="stat-item">
            <div className="hostname">{stat.hostname}</div>
            <div className="count">
              <FlipNumbers
                height={18}
                width={14}
                numbers={stat.count.toString()}
                perspective={100}
                play
                duration={3}
              />
            </div>
            <div className="last-seen">
              {new Date(stat.lastSeen).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostAnalytics;
