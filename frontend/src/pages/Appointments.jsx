import { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments/');
      setAppointments(response.data.results || response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'confirmed':
        return {
          background: '#dcfce7',
          color: '#166534',
        };

      case 'pending':
        return {
          background: '#fef3c7',
          color: '#92400e',
        };

      case 'completed':
        return {
          background: '#dbeafe',
          color: '#1d4ed8',
        };

      case 'cancelled':
        return {
          background: '#fee2e2',
          color: '#991b1b',
        };

      default:
        return {
          background: '#f3f4f6',
          color: '#374151',
        };
    }
  };

  if (loading) {
    return (
      <Layout>
        <h2>Loading appointments...</h2>
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
            📅 Appointments Management
          </h1>

          <p
            style={{
              color: '#6b7280',
              marginTop: '0.5rem',
            }}
          >
            Monitor booking activity, appointment workflow, token generation, and patient scheduling.
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
              Appointment Workflow
            </h3>

            <span
              style={{
                background: '#ede9fe',
                color: '#5b21b6',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: '600',
              }}
            >
              {appointments.length} Total
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
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Time</th>
                  <th style={thStyle}>Token</th>
                  <th style={thStyle}>Doctor</th>
                  <th style={thStyle}>Patient</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <td style={tdStyle}>
                      <strong>{appointment.id}</strong>
                    </td>

                    <td style={tdStyle}>
                      {appointment.appointment_date}
                    </td>

                    <td style={tdStyle}>
                      {appointment.appointment_time}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          background: '#dbeafe',
                          color: '#1d4ed8',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '999px',
                          fontSize: '0.85rem',
                          fontWeight: '700',
                        }}
                      >
                        #{appointment.token_number}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      Doctor #{appointment.doctor}
                    </td>

                    <td style={tdStyle}>
                      Patient #{appointment.patient}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          ...getStatusStyle(appointment.status),
                          padding: '0.35rem 0.8rem',
                          borderRadius: '999px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          textTransform: 'capitalize',
                        }}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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