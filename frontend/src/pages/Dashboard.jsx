import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div
      style={{
        padding: "2rem",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "2rem", fontSize: "2.2rem" }}>
        🏥 Smart Clinic Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Doctors Card */}
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "0.5rem" }}>👨‍⚕️ Doctors</h2>
          <p style={{ color: "#4b5563" }}>
            Manage doctors and schedules
          </p>

          <Link
            to="/doctors"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              padding: "0.75rem 1.25rem",
              background: "#2563eb",
              color: "white",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            View Doctors
          </Link>
        </div>

        {/* Patients Card */}
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "0.5rem" }}>🧑‍🤝‍🧑 Patients</h2>
          <p style={{ color: "#4b5563" }}>
            Manage patient records and profiles
          </p>

          <Link
            to="/patients"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              padding: "0.75rem 1.25rem",
              background: "#059669",
              color: "white",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            View Patients
          </Link>
        </div>

        {/* Appointments Card */}
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "0.5rem" }}>📅 Appointments</h2>
          <p style={{ color: "#4b5563" }}>
            Monitor appointment bookings and status
          </p>

          <Link
            to="/appointments"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              padding: "0.75rem 1.25rem",
              background: "#7c3aed",
              color: "white",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            View Appointments
          </Link>
        </div>

        {/* Queue Card */}
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "0.5rem" }}>🎫 Queue</h2>
          <p style={{ color: "#4b5563" }}>
            Live queue management and token tracking
          </p>

          <Link
            to="/queue"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              padding: "0.75rem 1.25rem",
              background: "#ea580c",
              color: "white",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            View Queue
          </Link>
        </div>
      </div>
    </div>
  );
}