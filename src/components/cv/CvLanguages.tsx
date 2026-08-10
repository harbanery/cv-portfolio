"use client";

import { Typography } from "antd";

const { Text } = Typography;

export default function CvLanguages({
  items,
}: {
  items: { language: string; fluency: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1">
      {items.map((lang, i) => (
        <Text key={i} style={{ fontSize: 13 }}>
          <Text strong>{lang.language}</Text>
          <span className="text-gray-400 mx-1">|</span>
          <Text type="secondary">{lang.fluency}</Text>
        </Text>
      ))}
    </div>
  );
}
