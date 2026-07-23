import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/Layout';

export default function CreateAppointment() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState({
    doctor: '',
    patient: '',
    appointment_date: '',
    appointment_time: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await api.get('/doctors/');
      setDoctors(response.data.results || response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get('/patients/');
      setPatients(response.data.results || response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      await api.post('/appointments/', {
        doctor: parseInt(formData.doctor),
        patient: parseInt(formData.patient),
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        notes: formData.notes,
      });

      setMessage('Appointment booked successfully!');

      setTimeout(() => {
        navigate('/appointments');
      }, 1500);
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        setMessage(JSON.stringify(error.response.data));
      } else {
        setMessage('Failed to book appointment');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', color: '#111827' }}>
            📅 Book Appointment
          </h1>

          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
            Create a new appointment and generate a queue token automatically.
          </p>
        </div>

        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
            border: '1px solid #f1f5f9',
          }}
        >
          {message && (
            <div
              style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                borderRadius: '10px',
                background: message.includes('successfully')
                  ? '#dcfce7'
                  : '#fee2e2',
                color: message.includes('successfully')
                  ? '#166534'
                  : '#991b1b',
                fontWeight: '600',
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem',
              }}
            >
              <div>
                <label style={labelStyle}>Select Doctor</label>

                <select
                  name='doctor'
                  value={formData.doctor}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value=''>Choose a doctor</option>

                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      Doctor #{doctor.id}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Select Patient</label>

                <select
                  name='patient'
                  value={formData.patient}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value=''>Choose a patient</option>

                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      Patient #{patient.id} (User {patient.user})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Appointment Date</label>

                <input
                  type='date'
                  name='appointment_date'
                  value={formData.appointment_date}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Appointment Time</label>

                <input
                  type='time'
                  name='appointment_time'
                  value={formData.appointment_time}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Notes</label>

                <textarea
                  name='notes'
                  value={formData.notes}
                  onChange={handleChange}
                  rows='4'
                  placeholder='Optional appointment notes'
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                marginTop: '2rem',
              }}
            >
              <button
                type='button'
                onClick={() => navigate('/appointments')}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: '10px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Cancel
              </button>

              <button
                type='submit'
                disabled={loading}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: loading ? '#93c5fd' : '#2563eb',
                  color: 'white',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                }}
              >
                {loading ? 'Booking...' : '🎫 Book Appointment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: '600',
  color: '#374151',
};

const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  borderRadius: '10px',
  border: '1px solid #d1d5db',
  outline: 'none',
  fontSize: '0.95rem',
  boxSizing: 'border-box',
};