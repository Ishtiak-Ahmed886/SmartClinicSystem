import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/Layout';

export default function CreatePatient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: '',
    phone: '',
    date_of_birth: '',
    gender: 'male',
    blood_group: 'A+',
    address: '',
    emergency_contact: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
            await api.post('/patients/', {
        user: parseInt(formData.user),
        phone: formData.phone,
        date_of_birth: formData.date_of_birth,
        gender: formData.gender,
        blood_group: formData.blood_group,
        address: formData.address,
        emergency_contact: formData.emergency_contact,

        // Backend required fields
        nid_number: '1234567890',
        occupation: 'Student',
      });

      setMessage('Patient created successfully!');

      setTimeout(() => {
        navigate('/patients');
      }, 1500);
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        setMessage(JSON.stringify(error.response.data));
      } else {
        setMessage('Failed to create patient');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', color: '#111827' }}>
            ➕ Create New Patient
          </h1>

          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
            Register a new patient in the Smart Clinic ERP system.
          </p>
        </div>

        {/* Form Card */}
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
              {/* User ID */}
              <div>
                <label style={labelStyle}>User ID</label>
                <input
                  type='number'
                  name='user'
                  value={formData.user}
                  onChange={handleChange}
                  placeholder='11'
                  required
                  style={inputStyle}
                />
              </div>

              {/* Phone */}
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type='text'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='017XXXXXXXX'
                  required
                  style={inputStyle}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label style={labelStyle}>Date of Birth</label>
                <input
                  type='date'
                  name='date_of_birth'
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              {/* Gender */}
              <div>
                <label style={labelStyle}>Gender</label>
                <select
                  name='gender'
                  value={formData.gender}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </select>
              </div>

              {/* Blood Group */}
              <div>
                <label style={labelStyle}>Blood Group</label>
                <select
                  name='blood_group'
                  value={formData.blood_group}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value='A+'>A+</option>
                  <option value='A-'>A-</option>
                  <option value='B+'>B+</option>
                  <option value='B-'>B-</option>
                  <option value='AB+'>AB+</option>
                  <option value='AB-'>AB-</option>
                  <option value='O+'>O+</option>
                  <option value='O-'>O-</option>
                </select>
              </div>

              {/* Emergency Contact */}
              <div>
                <label style={labelStyle}>Emergency Contact</label>
                <input
                  type='text'
                  name='emergency_contact'
                  value={formData.emergency_contact}
                  onChange={handleChange}
                  placeholder='017XXXXXXXX'
                  required
                  style={inputStyle}
                />
              </div>

              {/* Address */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Address</label>
                <textarea
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  rows='3'
                  placeholder='Full address'
                  required
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                marginTop: '2rem',
                flexWrap: 'wrap',
              }}
            >
              <button
                type='button'
                onClick={() => navigate('/patients')}
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
                {loading ? 'Saving...' : '💾 Save Patient'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

// Styles
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