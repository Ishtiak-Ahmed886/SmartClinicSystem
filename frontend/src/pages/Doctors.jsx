import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/Layout';

export default function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await api.get('/doctors/');
      setDoctors(response.data.results || response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <h2>Loading doctors...</h2>
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
            👨‍⚕️ Doctors Management
          </h1>

          <p
            style={{
              color: '#6b7280',
              marginTop: '0.5rem',
            }}
          >
            Manage doctor profiles, specialization, chamber information, and
            availability.
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
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <h3 style={{ margin: 0, color: '#111827' }}>
                Doctors Directory
              </h3>

              <p
                style={{
                  margin: '0.35rem 0 0',
                  color: '#6b7280',
                  fontSize: '0.9rem',
                }}
              >
                Manage doctor profiles, specialization, chamber information, and availability.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  background: '#dbeafe',
                  color: '#1d4ed8',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                }}
              >
                {doctors.length} Active
              </span>

              <button
                onClick={() => navigate('/doctors/new')}
                style={{
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                ➕ Add Doctor
              </button>
            </div>
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
                  <th style={thStyle}>Specialization</th>
                  <th style={thStyle}>BMDC</th>
                  <th style={thStyle}>Experience</th>
                  <th style={thStyle}>Fee</th>
                  <th style={thStyle}>Chamber</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {doctors.map((doctor) => (
                  <tr
                    key={doctor.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <td style={tdStyle}>
                      <strong>{doctor.id}</strong>
                    </td>

                    <td style={tdStyle}>
                      {doctor.specialization || 'N/A'}
                    </td>

                    <td style={tdStyle}>
                      {doctor.bmdc_number || 'N/A'}
                    </td>

                    <td style={tdStyle}>
                      {doctor.experience_years} years
                    </td>

                    <td style={tdStyle}>
                      <strong>৳{doctor.consultation_fee}</strong>
                    </td>

                    <td style={tdStyle}>
                      {doctor.chamber_name || 'N/A'}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          background: doctor.is_available
                            ? '#dcfce7'
                            : '#fee2e2',
                          color: doctor.is_available
                            ? '#166534'
                            : '#991b1b',
                          padding: '0.35rem 0.8rem',
                          borderRadius: '999px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                        }}
                      >
                        {doctor.is_available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                                        <td style={tdStyle}>
                      <button
                        onClick={() => navigate(`/doctors/${doctor.id}/edit`)}
                        style={{
                          background: '#2563eb',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 0.85rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600',
                        }}
                      >
                        ✏️ Edit
                      </button>
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