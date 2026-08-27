"use client";

import { Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { formatDate } from "@/utils/cvUtils";
import type { CvCertificationItem } from "@/models/types";

const { Text, Link } = Typography;

export default function CvCertifications({
  items,
}: {
  items: CvCertificationItem[];
}) {
  const { locale, t } = useLocale();

  return (
    <div className="flex flex-col gap-2">
      {items.map((cert, i) => (
        <div
          key={i}
          className="flex items-start justify-between gap-2 flex-wrap"
        >
          <div className="min-w-0">
            <Text strong style={{ fontSize: 13 }}>
              {cert.name}
            </Text>
            <span className="mx-1.5 text-gray-400">|</span>
            <Text type="secondary" style={{ fontSize: 13 }}>
              {cert.issuer}
            </Text>
            {cert.url && (
              <Link
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12, marginLeft: 8 }}
              >
                {t("cert.view")}
              </Link>
            )}
          </div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {formatDate(cert.date, locale)}
          </Text>
        </div>
      ))}
    </div>
  );
}
