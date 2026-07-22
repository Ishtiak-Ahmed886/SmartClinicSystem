import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/Layout';

export default function CreateDoctor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: '',
    specialization: '',
    bmdc_number: '',
    experience_years: '',
    consultation_fee: '',
    chamber_name: '',
    is_available: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setMessage('');

  try {
    await api.post('/doctors/', {
      user: parseInt(formData.user),
      specialization: formData.specialization,
      bmdc_number: formData.bmdc_number,

      // Backend field names
      experience: parseInt(formData.experience_years),
      consultation_fee: formData.consultation_fee,
      chamber: formData.chamber_name,
      department: 1, // temporary department ID

      is_available: formData.is_available,
    });

    setMessage('Doctor created successfully!');

    setTimeout(() => {
      navigate('/doctors');
    }, 1500);
  } catch (error) {
    console.error(error);

    if (error.response?.data) {
      setMessage(JSON.stringify(error.response.data));
    } else {
      setMessage('Failed to create doctor');
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
            ➕ Create New Doctor
          </h1>

          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
            Add a new doctor profile to the Smart Clinic ERP system.
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
          {/* Success/Error Message */}
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
                  placeholder='9'
                  required
                  style={inputStyle}
                />
              </div>

              {/* Specialization */}
              <div>
                <label style={labelStyle}>Specialization</label>
                <input
                  type='text'
                  name='specialization'
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder='Cardiology'
                  required
                  style={inputStyle}
                />
              </div>

              {/* BMDC */}
              <div>
                <label style={labelStyle}>BMDC Number</label>
                <input
                  type='text'
                  name='bmdc_number'
                  value={formData.bmdc_number}
                  onChange={handleChange}
                  placeholder='A-12345'
                  required
                  style={inputStyle}
                />
              </div>

              {/* Experience */}
              <div>
                <label style={labelStyle}>Experience (Years)</label>
                <input
                  type='number'
                  name='experience_years'
                  value={formData.experience_years}
                  onChange={handleChange}
                  placeholder='5'
                  required
                  style={inputStyle}
                />
              </div>

              {/* Fee */}
              <div>
                <label style={labelStyle}>Consultation Fee</label>
                <input
                  type='number'
                  name='consultation_fee'
                  value={formData.consultation_fee}
                  onChange={handleChange}
                  placeholder='1000'
                  required
                  style={inputStyle}
                />
              </div>

              {/* Chamber */}
              <div>
                <label style={labelStyle}>Chamber Name</label>
                <input
                  type='text'
                  name='chamber_name'
                  value={formData.chamber_name}
                  onChange={handleChange}
                  placeholder='Dhanmondi Smart Chamber'
                  required
                  style={inputStyle}
                />
              </div>

              {/* Availability */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: '600',
                    color: '#374151',
                  }}
                >
                  <input
                    type='checkbox'
                    name='is_available'
                    checked={formData.is_available}
                    onChange={handleChange}
                  />
                  Available for appointments
                </label>
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
                onClick={() => navigate('/doctors')}
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
                {loading ? 'Saving...' : '💾 Save Doctor'}
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