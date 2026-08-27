"use client";

import { Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { formatDateRange } from "@/utils/cvUtils";
import type { CvEducationItem } from "@/models/types";

const { Text } = Typography;

export default function CvEducation({ items }: { items: CvEducationItem[] }) {
  const { locale, t } = useLocale();

  return (
    <div className="flex flex-col gap-4">
      {items.map((edu, i) => (
        <div key={i}>
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="min-w-0">
              <Text strong style={{ fontSize: 15 }}>
                {edu.institution}
              </Text>
              <span className="mx-2 text-gray-400">|</span>
              <Text type="secondary">{edu.field}</Text>
            </div>
            <Text
              type="secondary"
              style={{ fontSize: 12 }}
              className="whitespace-nowrap"
            >
              {formatDateRange(edu.startDate, edu.endDate, locale)}
            </Text>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            <Text type="secondary" style={{ fontSize: 12 }}>
              {edu.degree}
              {edu.degree && edu.grade ? " | " : ""}
              {edu.grade ? `${t("education.gpa")}: ${edu.grade}` : ""}
            </Text>
          </div>
          {edu.courses.length > 0 && (
            <Text
              type="secondary"
              style={{ display: "block", fontSize: 12, marginTop: 2 }}
            >
              {edu.courses.join(" · ")}
            </Text>
          )}
          {edu.highlights.length > 0 && (
            <ul
              className="mt-1 mb-0 pl-5 list-disc list-outside text-sm"
              style={{ lineHeight: 1.6 }}
            >
              {edu.highlights.map((desc, j) => (
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
