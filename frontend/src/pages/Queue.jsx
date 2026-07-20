import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Queue() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQueue();

    // Auto refresh every 5 seconds
    const interval = setInterval(fetchQueue, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchQueue = async () => {
    try {
      const response = await api.get("/queue/");
      setQueues(response.data.results || response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const currentQueue = queues.find((q) => q.status === "in_progress");
  const nextQueue = queues.find((q) => q.status === "waiting");
  const waitingCount = queues.filter((q) => q.status === "waiting").length;
  const completedCount = queues.filter(
    (q) => q.status === "completed"
  ).length;

  const getStatusStyle = (status) => {
    switch (status) {
      case "in_progress":
        return {
          background: "#dbeafe",
          color: "#1e40af",
        };
      case "waiting":
        return {
          background: "#fef3c7",
          color: "#92400e",
        };
      case "completed":
        return {
          background: "#dcfce7",
          color: "#166534",
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
    return <h2 style={{ padding: "2rem" }}>Loading queue...</h2>;
  }

  return (
    <div
      style={{
        padding: "2rem",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "2rem", fontSize: "2rem" }}>
        🎫 Live Queue Dashboard
      </h1>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            Current Token
          </div>
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#2563eb",
            }}
          >
            {currentQueue ? `#${currentQueue.token_number}` : "--"}
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            Next Token
          </div>
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#ea580c",
            }}
          >
            {nextQueue ? `#${nextQueue.token_number}` : "--"}
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            Waiting Patients
          </div>
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#7c3aed",
            }}
          >
            {waitingCount}
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            Completed Today
          </div>
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#059669",
            }}
          >
            {completedCount}
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#ea580c", color: "white" }}>
            <tr>
              <th style={{ padding: "1rem", textAlign: "left" }}>Token</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Appointment ID</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {queues.map((queue) => (
              <tr
                key={queue.id}
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                <td style={{ padding: "1rem", fontWeight: "bold" }}>
                  #{queue.token_number}
                </td>

                <td style={{ padding: "1rem" }}>
                  {queue.appointment}
                </td>

                <td style={{ padding: "1rem" }}>
                  <span
                    style={{
                      ...getStatusStyle(queue.status),
                      padding: "0.35rem 0.85rem",
                      borderRadius: "999px",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                  >
                    {queue.status.replace("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p
        style={{
          marginTop: "1rem",
          color: "#6b7280",
          fontSize: "0.875rem",
        }}
      >
        🔄 Auto-refreshing every 5 seconds
      </p>
    </div>
  );
}