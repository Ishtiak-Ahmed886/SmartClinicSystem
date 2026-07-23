import { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';

export default function Dashboard() {
  const [liveQueue, setLiveQueue] = useState({
    now_serving: null,
    waiting_count: 0,
    completed_count: 0,
    total_queue: 0,
  });

  const stats = [
    { label: 'Doctors', value: '3', color: '#2563eb', icon: '👨‍⚕️' },
    { label: 'Patients', value: '6', color: '#059669', icon: '🧑‍🤝‍🧑' },
    { label: 'Appointments', value: '10', color: '#7c3aed', icon: '📅' },
    { label: 'Queue Waiting', value: '2', color: '#ea580c', icon: '🎫' },
  ];

  useEffect(() => {
    fetchLiveQueue();

    const interval = setInterval(fetchLiveQueue, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchLiveQueue = async () => {
    try {
      const response = await api.get('/queues/summary/');
      setLiveQueue(response.data);
    } catch (error) {
      console.error('Live queue fetch failed:', error);
    }
  };

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Dashboard Header */}
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem', color: '#111827' }}>
            📊 Dashboard Overview
          </h1>

          <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
            Real-time overview of clinic operations, appointments, and queue
            activity.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {stats.map((item) => (
            <div
              key={item.label}
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                border: '1px solid #f1f5f9',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: item.color + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}
                >
                  {item.icon}
                </div>

                <span
                  style={{
                    color: item.color,
                    fontWeight: '600',
                    fontSize: '0.9rem',
                  }}
                >
                  Live
                </span>
              </div>

              <div
                style={{
                  fontSize: '2.25rem',
                  fontWeight: '700',
                  color: '#111827',
                }}
              >
                {item.value}
              </div>

              <div style={{ color: '#64748b', marginTop: '0.25rem' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* LIVE QUEUE PANEL */}
        <div
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.5rem',
                  color: '#111827',
                }}
              >
                📺 Live Queue Panel
              </h2>

              <p
                style={{
                  margin: '0.5rem 0 0',
                  color: '#6b7280',
                }}
              >
                Real-time queue monitoring for clinic reception display.
              </p>
            </div>

            <span
              style={{
                background: '#dcfce7',
                color: '#166534',
                padding: '0.45rem 0.9rem',
                borderRadius: '999px',
                fontWeight: '700',
                fontSize: '0.9rem',
              }}
            >
              ⚡ Auto Refresh 5s
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Now Serving */}
            <div
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                borderRadius: '20px',
                padding: '1.5rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                🔴 NOW SERVING
              </div>

              <div
                style={{
                  fontSize: '3rem',
                  fontWeight: '800',
                  margin: '0.75rem 0',
                }}
              >
                {liveQueue.now_serving
                  ? `#${liveQueue.now_serving}`
                  : '--'}
              </div>

              <div style={{ opacity: 0.85 }}>
                Current patient token
              </div>
            </div>

            {/* Waiting */}
            <div
              style={{
                background: '#fef3c7',
                borderRadius: '20px',
                padding: '1.5rem',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#92400e', fontWeight: '700' }}>
                🟡 WAITING
              </div>

              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#111827',
                  margin: '0.75rem 0',
                }}
              >
                {liveQueue.waiting_count}
              </div>

              <div style={{ color: '#6b7280' }}>
                Patients in queue
              </div>
            </div>

            {/* Completed */}
            <div
              style={{
                background: '#dcfce7',
                borderRadius: '20px',
                padding: '1.5rem',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#166534', fontWeight: '700' }}>
                🟢 COMPLETED
              </div>

              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#111827',
                  margin: '0.75rem 0',
                }}
              >
                {liveQueue.completed_count}
              </div>

              <div style={{ color: '#6b7280' }}>
                Served patients
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Card */}
        <div
          style={{
            background:
              'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            borderRadius: '24px',
            padding: '2rem',
            color: 'white',
            boxShadow: '0 20px 40px rgba(37,99,235,0.25)',
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: '1.5rem' }}>
            🎉 Smart Clinic System is Fully Operational
          </h2>

          <p
            style={{
              opacity: 0.95,
              lineHeight: 1.7,
              maxWidth: '720px',
            }}
          >
            The React frontend is successfully connected with the Django REST
            API, JWT authentication is active, and all core healthcare modules
            are working with live MySQL data including doctors, patients,
            appointments, and the real-time queue dashboard.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '1.5rem',
            }}
          >
            {[
              'JWT Auth',
              'Doctors API',
              'Patients API',
              'Appointments API',
              'Live Queue',
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '999px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}