"use client";

import { Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { formatDate } from "@/helpers/cvHelpers";
import type { CertificationItem } from "@/models/types";
import SourceBadge from "./SourceBadge";

const { Text } = Typography;

export default function CvCertifications({
  items,
}: {
  items: CertificationItem[];
}) {
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-2">
      {items.map((cert, i) => (
        <div key={i} className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <Text strong style={{ fontSize: 13 }}>
              {cert.name}
            </Text>
            <span className="mx-1.5 text-gray-400">|</span>
            <Text type="secondary" style={{ fontSize: 13 }}>
              {cert.issuer}
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Text type="secondary" style={{ fontSize: 12 }}>
              {formatDate(cert.date, locale)}
            </Text>
            <SourceBadge source={cert.source} />
          </div>
        </div>
      ))}
    </div>
  );
}
