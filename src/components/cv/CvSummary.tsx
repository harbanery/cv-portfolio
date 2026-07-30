"use client";

import { Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { pickLocale } from "@/helpers/cvHelpers";
import type { LocalizedText } from "@/models/types";

const { Paragraph } = Typography;

export default function CvSummary({ summary }: { summary: LocalizedText }) {
  const { locale } = useLocale();

  return (
    <Paragraph style={{ marginBottom: 32, lineHeight: 1.7 }}>
      {pickLocale(summary, locale)}
    </Paragraph>
  );
}
