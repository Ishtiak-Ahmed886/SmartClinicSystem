import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments/");
      setAppointments(response.data.results || response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return {
          background: "#dcfce7",
          color: "#166534",
        };
      case "pending":
        return {
          background: "#fef3c7",
          color: "#92400e",
        };
      case "completed":
        return {
          background: "#dbeafe",
          color: "#1e40af",
        };
      case "cancelled":
        return {
          background: "#fee2e2",
          color: "#991b1b",
        };
      default:
        return {
          background: "#f3f4f6",
          color: "#374151",
        };
    }
  };

  if (loading) {
    return <h2 style={{ padding: "2rem" }}>Loading appointments...</h2>;
  }

  return (
    <div
      style={{
        padding: "2rem",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "2rem" }}>
          📅 Appointments
        </h1>

        <div
          style={{
            background: "#7c3aed",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            fontWeight: "bold",
          }}
        >
          Total: {appointments.length}
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#7c3aed", color: "white" }}>
            <tr>
              <th style={{ padding: "1rem", textAlign: "left" }}>Token</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Doctor</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Patient</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Date</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Time</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                <td style={{ padding: "1rem", fontWeight: "bold" }}>
                  #{appointment.token_number}
                </td>

                <td style={{ padding: "1rem" }}>
                  Doctor {appointment.doctor}
                </td>

                <td style={{ padding: "1rem" }}>
                  Patient {appointment.patient}
                </td>

                <td style={{ padding: "1rem" }}>
                  {appointment.appointment_date}
                </td>

                <td style={{ padding: "1rem" }}>
                  {appointment.appointment_time}
                </td>

                <td style={{ padding: "1rem" }}>
                  <span
                    style={{
                      ...getStatusStyle(appointment.status),
                      padding: "0.35rem 0.85rem",
                      borderRadius: "999px",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      textTransform: "capitalize",
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
  );
}