import { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';

export default function Queue() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQueues();
  }, []);

  const fetchQueues = async () => {
    try {
      const response = await api.get('/queue/');
      setQueues(response.data.results || response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'waiting':
        return { background: '#fef3c7', color: '#92400e' };
      case 'in_progress':
        return { background: '#dbeafe', color: '#1d4ed8' };
      case 'completed':
        return { background: '#dcfce7', color: '#166534' };
      case 'cancelled':
        return { background: '#fee2e2', color: '#991b1b' };
      default:
        return { background: '#f3f4f6', color: '#374151' };
    }
  };

  if (loading) {
    return (
      <Layout>
        <h2>Loading queue...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1
            style={{
              margin: 0,
              fontSize: '2rem',
              color: '#111827',
            }}
          >
            🎫 Queue Management
          </h1>

          <p
            style={{
              color: '#6b7280',
              marginTop: '0.5rem',
            }}
          >
            Monitor live queue activity, token progression, patient flow, and waiting status.
          </p>
        </div>

        {/* Table Card */}
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
            border: '1px solid #f1f5f9',
          }}
        >
          {/* Card Header */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ margin: 0, color: '#111827' }}>
              Live Queue Monitor
            </h3>

            <span
              style={{
                background: '#fef3c7',
                color: '#92400e',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: '600',
              }}
            >
              {queues.filter((q) => q.status === 'waiting').length} Waiting
            </span>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <thead
                style={{
                  background: '#2563eb',
                  color: 'white',
                }}
              >
                <tr>
                  <th style={thStyle}>Queue ID</th>
                  <th style={thStyle}>Token</th>
                  <th style={thStyle}>Appointment</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Created</th>
                </tr>
              </thead>

              <tbody>
                {queues.map((queue) => (
                  <tr
                    key={queue.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <td style={tdStyle}>
                      <strong>{queue.id}</strong>
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          background: '#ede9fe',
                          color: '#5b21b6',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '999px',
                          fontSize: '0.85rem',
                          fontWeight: '700',
                        }}
                      >
                        T-{queue.token_number}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      #{queue.appointment}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          ...getStatusStyle(queue.status),
                          padding: '0.35rem 0.8rem',
                          borderRadius: '999px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          textTransform: 'capitalize',
                        }}
                      >
                        {queue.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      {new Date(queue.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Summary */}
        <div
          style={{
            marginTop: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          <div style={summaryCard('#fef3c7')}>
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>
              {queues.filter((q) => q.status === 'waiting').length}
            </div>
            <div style={{ color: '#92400e', fontWeight: '600' }}>
              Waiting
            </div>
          </div>

          <div style={summaryCard('#dbeafe')}>
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>
              {queues.filter((q) => q.status === 'in_progress').length}
            </div>
            <div style={{ color: '#1d4ed8', fontWeight: '600' }}>
              In Progress
            </div>
          </div>

          <div style={summaryCard('#dcfce7')}>
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>
              {queues.filter((q) => q.status === 'completed').length}
            </div>
            <div style={{ color: '#166534', fontWeight: '600' }}>
              Completed
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Reusable styles
const thStyle = {
  padding: '1rem 1.25rem',
  textAlign: 'left',
  fontWeight: '600',
};

const tdStyle = {
  padding: '1rem 1.25rem',
};

const summaryCard = (bg) => ({
  background: bg,
  borderRadius: '16px',
  padding: '1.25rem',
  border: '1px solid rgba(0,0,0,0.05)',
});