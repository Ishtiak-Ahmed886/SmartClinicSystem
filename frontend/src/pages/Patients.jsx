import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients/");

      setPatients(response.data.results || response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f3f4f6",
        }}
      >
        <h2>Loading patients...</h2>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f3f4f6",
        }}
      >
        <h2 style={{ color: "red" }}>{error}</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", margin: 0 }}>
          🧑‍🤝‍🧑 Patients List
        </h1>

        <div
          style={{
            background: "#059669",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            fontWeight: "bold",
          }}
        >
          Total: {patients.length}
        </div>
      </div>

      {/* Table Container */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          {/* Table Header */}
          <thead
            style={{
              background: "#059669",
              color: "white",
            }}
          >
            <tr>
              <th style={{ padding: "1rem", textAlign: "left" }}>ID</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                User ID
              </th>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                Phone
              </th>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                Gender
              </th>
              <th style={{ padding: "1rem", textAlign: "left" }}>
                Blood Group
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr
                  key={patient.id}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "white")
                  }
                >
                  <td style={{ padding: "1rem", fontWeight: "600" }}>
                    {patient.id}
                  </td>

                  <td style={{ padding: "1rem" }}>{patient.user}</td>

                  <td style={{ padding: "1rem" }}>
                    {patient.phone || "N/A"}
                  </td>

                  <td style={{ padding: "1rem" }}>
                    {patient.gender ? (
                      <span
                        style={{
                          background:
                            patient.gender.toLowerCase() === "male"
                              ? "#dbeafe"
                              : "#fce7f3",
                          color:
                            patient.gender.toLowerCase() === "male"
                              ? "#1e40af"
                              : "#be185d",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "999px",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                        }}
                      >
                        {patient.gender}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>

                  <td style={{ padding: "1rem" }}>
                    {patient.blood_group ? (
                      <span
                        style={{
                          background: "#fee2e2",
                          color: "#991b1b",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "999px",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                        }}
                      >
                        {patient.blood_group}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    padding: "3rem",
                    textAlign: "center",
                    color: "#6b7280",
                  }}
                >
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}