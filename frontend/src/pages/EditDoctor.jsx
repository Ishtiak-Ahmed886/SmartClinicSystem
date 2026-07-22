import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/Layout';

export default function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    specialization: '',
    bmdc_number: '',
    experience: '',
    consultation_fee: '',
    chamber: '',
    department: 1,
    is_available: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Load existing doctor data
  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const response = await api.get(`/doctors/${id}/`);
      const doctor = response.data;

      setFormData({
        specialization: doctor.specialization || '',
        bmdc_number: doctor.bmdc_number || '',
        experience: doctor.experience || '',
        consultation_fee: doctor.consultation_fee || '',
        chamber: doctor.chamber || '',
        department: doctor.department || 1,
        is_available: doctor.is_available ?? true,
      });
    } catch (error) {
      console.error(error);
      setMessage('Failed to load doctor data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Update doctor
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage('');

    try {
      await api.patch(`/doctors/${id}/`, {
        specialization: formData.specialization,
        bmdc_number: formData.bmdc_number,
        experience: parseInt(formData.experience),
        consultation_fee: formData.consultation_fee,
        chamber: formData.chamber,
        department: parseInt(formData.department),
        is_available: formData.is_available,
      });

      setMessage('Doctor updated successfully!');

      setTimeout(() => {
        navigate('/doctors');
      }, 1500);
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        setMessage(JSON.stringify(error.response.data));
      } else {
        setMessage('Failed to update doctor');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <h2>Loading doctor data...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', color: '#111827' }}>
            ✏️ Edit Doctor
          </h1>

          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
            Update doctor profile information and availability status.
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
          {/* Message */}
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
                <label style={labelStyle}>Specialization</label>
                <input
                  type='text'
                  name='specialization'
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>BMDC Number</label>
                <input
                  type='text'
                  name='bmdc_number'
                  value={formData.bmdc_number}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Experience (Years)</label>
                <input
                  type='number'
                  name='experience'
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Consultation Fee</label>
                <input
                  type='number'
                  name='consultation_fee'
                  value={formData.consultation_fee}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Chamber Name</label>
                <input
                  type='text'
                  name='chamber'
                  value={formData.chamber}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

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
                disabled={saving}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: saving ? '#93c5fd' : '#2563eb',
                  color: 'white',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                }}
              >
                {saving ? 'Updating...' : '💾 Update Doctor'}
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