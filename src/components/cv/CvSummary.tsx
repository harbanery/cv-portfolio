"use client";

import { Typography } from "antd";

const { Paragraph } = Typography;

export default function CvSummary({ summary }: { summary: string }) {
  return (
    <Paragraph
      style={{ marginBottom: 32, lineHeight: 1.7, textAlign: "justify" }}
    >
      {summary}
    </Paragraph>
  );
}
