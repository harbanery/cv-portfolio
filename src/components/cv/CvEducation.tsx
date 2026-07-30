"use client";

import { Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { formatDateRange, pickLocale } from "@/helpers/cvHelpers";
import type { EducationItem } from "@/models/types";
import SourceBadge from "./SourceBadge";

const { Text } = Typography;

export default function CvEducation({
  items,
}: {
  items: EducationItem[];
}) {
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-4">
      {items.map((edu, i) => (
        <div key={i}>
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <Text strong style={{ fontSize: 15 }}>
                {pickLocale(edu.degree, locale)}
              </Text>
              <span className="mx-2 text-gray-400">|</span>
              <Text type="secondary">{edu.institution}</Text>
            </div>
            <SourceBadge source={edu.source} />
          </div>
          <div className="flex items-center justify-between flex-wrap text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            <Text type="secondary" style={{ fontSize: 12 }}>
              {pickLocale(edu.field, locale)}
              {edu.gpa ? ` | GPA: ${edu.gpa}` : ""}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {formatDateRange(edu.startDate, edu.endDate, locale)}
            </Text>
          </div>
          {edu.description && edu.description.length > 0 && (
            <ul
              className="mt-1 mb-0 pl-5 list-disc list-outside text-sm"
              style={{ lineHeight: 1.6 }}
            >
              {edu.description.map((desc, j) => (
                <li key={j} className="mb-0.5">
                  {pickLocale(desc, locale)}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
