"use client";

import { Divider, Typography } from "antd";
import type { ReactNode } from "react";

const { Title } = Typography;

export default function CvSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="cv-section mb-8 last:mb-0">
      <Title
        level={4}
        style={{
          marginTop: 0,
          marginBottom: 4,
          color: "#6366f1",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontSize: 15,
        }}
      >
        {title}
      </Title>
      <Divider style={{ marginTop: 0, marginBottom: 20 }} />
      {children}
    </section>
  );
}
