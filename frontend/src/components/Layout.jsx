import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f3f4f6",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          background: "#0f172a",
          color: "white",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
            🏥 Smart Clinic
          </h2>
          <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
            Healthcare ERP
          </p>
        </div>

        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            flex: 1,
          }}
        >
          <SidebarLink to="/dashboard" icon="📊" label="Dashboard" />
          <SidebarLink to="/doctors" icon="👨‍⚕️" label="Doctors" />
          <SidebarLink to="/patients" icon="🧑‍🤝‍🧑" label="Patients" />
          <SidebarLink to="/appointments" icon="📅" label="Appointments" />
          <SidebarLink to="/queue" icon="🎫" label="Queue" />
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "0.85rem",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            marginTop: "1rem",
          }}
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Navbar */}
        <header
          style={{
            background: "white",
            padding: "1rem 2rem",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <h3 style={{ margin: 0, color: "#111827" }}>
              Smart Clinic Management System
            </h3>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "0.9rem" }}>
              Daffodil International University • CSE499
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              A
            </div>
            <div>
              <div style={{ fontWeight: "600", color: "#111827" }}>
                Admin
              </div>
              <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                System Administrator
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: "2rem" }}>{children}</div>
      </main>
    </div>
  );
}

function SidebarLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.85rem 1rem",
        borderRadius: "12px",
        color: "#e2e8f0",
        textDecoration: "none",
        transition: "all 0.2s",
        fontWeight: "500",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#1e293b";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <span style={{ fontSize: "1.2rem" }}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}