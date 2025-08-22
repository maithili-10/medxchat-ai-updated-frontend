import React from "react";
import Card from "../components/Card.tsx";

export default function HealthDashboard() {
  return (
    <div className="grid">
      <Card title="Heart Rate" value="72 bpm" subtitle="Avg: 75 bpm" status="Stable" />
      <Card title="Sleep Quality" value="7.2h" subtitle="85% quality" status="Improving" />
      <Card title="Activity" value="8,547" subtitle="45min active" status="Good" />
      <Card title="Energy Level" value="High" subtitle="Based on activity data" status="Stable" />
    </div>
  );
}
