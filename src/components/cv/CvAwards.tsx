"use client";

import { Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { formatDate } from "@/helpers/cvHelpers";
import type { CvAwardItem } from "@/models/types";

const { Text } = Typography;

export default function CvAwards({ items }: { items: CvAwardItem[] }) {
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-2">
      {items.map((award, i) => (
        <div key={i} className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <Text strong style={{ fontSize: 13 }}>
              {award.title}
            </Text>
            <span className="mx-1.5 text-gray-400">|</span>
            <Text type="secondary" style={{ fontSize: 13 }}>
              {award.issuer}
            </Text>
          </div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {formatDate(award.date, locale)}
          </Text>
        </div>
      ))}
    </div>
  );
}
