import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors/");
      setDoctors(response.data.results || response.data);
    } catch (err) {
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 style={{ padding: "2rem" }}>Loading doctors...</h2>;
  }

  if (error) {
    return <h2 style={{ padding: "2rem", color: "red" }}>{error}</h2>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>👨‍⚕️ Doctors List</h1>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#2563eb", color: "white" }}>
            <tr>
              <th style={{ padding: "1rem", textAlign: "left" }}>ID</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                Specialization
              </th>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                BMDC
              </th>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                Experience
              </th>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                Fee
              </th>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                Chamber
              </th>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr
                key={doctor.id}
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                <td style={{ padding: "1rem" }}>{doctor.id}</td>
                <td style={{ padding: "1rem" }}>
                  {doctor.specialization}
                </td>
                <td style={{ padding: "1rem" }}>
                  {doctor.bmdc_number}
                </td>
                <td style={{ padding: "1rem" }}>
                  {doctor.experience} years
                </td>
                <td style={{ padding: "1rem" }}>
                  ৳{doctor.consultation_fee}
                </td>
                <td style={{ padding: "1rem" }}>
                  {doctor.chamber}
                </td>
                <td style={{ padding: "1rem" }}>
                  <span
                    style={{
                      background: doctor.is_available ? "#dcfce7" : "#fee2e2",
                      color: doctor.is_available ? "#166534" : "#991b1b",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "999px",
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                    }}
                  >
                    {doctor.is_available ? "Available" : "Unavailable"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}