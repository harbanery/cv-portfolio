"use client";

import { Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { formatDateRange, pickLocale } from "@/helpers/cvHelpers";
import type { OrganizationItem } from "@/models/types";
import SourceBadge from "./SourceBadge";

const { Text } = Typography;

export default function CvOrganizations({
  items,
}: {
  items: OrganizationItem[];
}) {
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-4">
      {items.map((org, i) => (
        <div key={i}>
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <Text strong style={{ fontSize: 15 }}>
                {pickLocale(org.position, locale)}
              </Text>
              <span className="mx-2 text-gray-400">|</span>
              <Text type="secondary">{org.organization}</Text>
            </div>
            <SourceBadge source={org.source} />
          </div>
          <div className="flex items-center justify-between flex-wrap text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            <Text type="secondary" style={{ fontSize: 12 }}>
              {formatDateRange(org.startDate, org.endDate, locale)}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {pickLocale(org.location, locale)}
            </Text>
          </div>
          {org.description.length > 0 && (
            <ul
              className="mt-1 mb-0 pl-5 list-disc list-outside text-sm"
              style={{ lineHeight: 1.6 }}
            >
              {org.description.map((desc, j) => (
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
