import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/Layout';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const response = await api.get('/patients/');

      console.log('FULL PATIENT RESPONSE:', response.data);

      let patientData = [];

      // Handle DRF paginated response
      if (response.data && Array.isArray(response.data.results)) {
        patientData = response.data.results;
      }
      // Handle normal array response
      else if (Array.isArray(response.data)) {
        patientData = response.data;
      }

      console.log('PATIENT COUNT:', patientData.length);
      console.log('PATIENT DATA:', patientData);

      // Sort newest first
      const sortedPatients = patientData.sort((a, b) => b.id - a.id);

      setPatients(sortedPatients);
    } catch (error) {
      console.error('Patient fetch failed:', error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: '2rem' }}>
          <h2>Loading patients...</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: '1rem' }}>
        {/* Header */}
        <div
          style={{
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '2rem',
                color: '#111827',
              }}
            >
              👥 Patients Management
            </h1>

            <p
              style={{
                color: '#6b7280',
                marginTop: '0.5rem',
              }}
            >
              Manage patient records, profiles, and medical information.
            </p>
          </div>

          <button
            onClick={() => navigate('/patients/new')}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '0.85rem 1.25rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '0.95rem',
            }}
          >
            ➕ Add Patient
          </button>
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
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ margin: 0 }}>Patients Directory</h3>

            <span
              style={{
                background: '#dcfce7',
                color: '#166534',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                fontWeight: '600',
              }}
            >
              {patients.length} Registered
            </span>
          </div>

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
                {patients.length === 0 ? (
                  <tr>
                    <td
                      colSpan='5'
                      style={{
                        padding: '3rem',
                        textAlign: 'center',
                        color: '#6b7280',
                      }}
                    >
                      No patients found
                    </td>
                  </tr>
                ) : (
                  patients.map((patient) => (
                    <tr key={patient.id}>
                      <td style={tdStyle}>{patient.id}</td>
                      <td style={tdStyle}>{patient.user}</td>
                      <td style={tdStyle}>{patient.phone || 'N/A'}</td>
                      <td style={tdStyle}>{patient.gender || 'Unknown'}</td>
                      <td style={tdStyle}>
                        {patient.blood_group || 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const thStyle = {
  padding: '1rem 1.25rem',
  textAlign: 'left',
  fontWeight: '600',
};

const tdStyle = {
  padding: '1rem 1.25rem',
};