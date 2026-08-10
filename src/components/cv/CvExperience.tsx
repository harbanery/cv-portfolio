"use client";

import { Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { formatDateRange } from "@/helpers/cvHelpers";
import type { CvWorkItem } from "@/models/types";

const { Text } = Typography;

export default function CvExperience({ items }: { items: CvWorkItem[] }) {
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-4">
      {items.map((exp, i) => (
        <div key={i}>
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <Text strong style={{ fontSize: 15 }}>
                {exp.position}
              </Text>
              <span className="mx-2 text-gray-400">|</span>
              <Text type="secondary">{exp.company}</Text>
            </div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {formatDateRange(exp.startDate, exp.endDate, locale)}
            </Text>
          </div>
          {exp.location && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              {exp.location}
            </Text>
          )}
          {exp.summary && (
            <Text
              type="secondary"
              style={{ display: "block", fontSize: 13, marginTop: 2 }}
            >
              {exp.summary}
            </Text>
          )}
          {exp.highlights.length > 0 && (
            <ul
              className="mt-1 mb-0 pl-5 list-disc list-outside text-sm"
              style={{ lineHeight: 1.6 }}
            >
              {exp.highlights.map((desc, j) => (
                <li key={j} className="mb-0.5">
                  {desc}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
