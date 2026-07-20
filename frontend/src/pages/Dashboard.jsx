import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ padding: "2rem", background: "#f3f4f6", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "2rem" }}>🏥 Smart Clinic Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2>👨‍⚕️ Doctors</h2>
          <p>Manage doctors and schedules</p>
          <Link
            to="/doctors"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "#2563eb",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            View Doctors
          </Link>
        </div>

        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2>📅 Appointments</h2>
          <p>Monitor appointment bookings</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2>🎫 Queue</h2>
          <p>Live queue management system</p>
        </div>
      </div>
    </div>
  );
}