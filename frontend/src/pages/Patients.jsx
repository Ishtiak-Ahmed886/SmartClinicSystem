import { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get('/patients/');
      setPatients(response.data.results || response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <h2>Loading patients...</h2>
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
            🧑‍🤝‍🧑 Patients Management
          </h1>

          <p
            style={{
              color: '#6b7280',
              marginTop: '0.5rem',
            }}
          >
            Manage patient records, contact information, and medical profile data.
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
              Patients Directory
            </h3>

            <span
              style={{
                background: '#dcfce7',
                color: '#166534',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: '600',
              }}
            >
              {patients.length} Registered
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
                  <th style={thStyle}>User ID</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Gender</th>
                  <th style={thStyle}>Blood Group</th>
                </tr>
              </thead>

              <tbody>
                {patients.map((patient) => (
                  <tr
                    key={patient.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <td style={tdStyle}>
                      <strong>{patient.id}</strong>
                    </td>

                    <td style={tdStyle}>{patient.user}</td>

                    <td style={tdStyle}>
                      {patient.phone || 'N/A'}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          background:
                            patient.gender === 'male'
                              ? '#dbeafe'
                              : patient.gender === 'female'
                              ? '#fce7f3'
                              : '#f3f4f6',
                          color:
                            patient.gender === 'male'
                              ? '#1d4ed8'
                              : patient.gender === 'female'
                              ? '#be185d'
                              : '#374151',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '999px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          textTransform: 'capitalize',
                        }}
                      >
                        {patient.gender || 'Unknown'}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          background: '#fee2e2',
                          color: '#991b1b',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '999px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                        }}
                      >
                        {patient.blood_group || 'N/A'}
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