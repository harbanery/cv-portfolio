"use client";

import { Tag, Tooltip } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { pickLocale } from "@/helpers/cvHelpers";
import { SOURCE_CONFIG, type DataSource } from "@/models/sources";

export default function SourceBadge({ source }: { source: DataSource }) {
  const { t, locale } = useLocale();
  const config = SOURCE_CONFIG[source];

  return (
    <Tooltip title={t("cv.source.tooltip")}>
      <Tag
        color={config.color}
        style={{ marginInlineEnd: 0, fontSize: 11, lineHeight: "18px" }}
      >
        {pickLocale(config.label, locale)}
      </Tag>
    </Tooltip>
  );
}
