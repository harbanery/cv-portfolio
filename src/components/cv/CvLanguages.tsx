"use client";

import { Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { pickLocale } from "@/helpers/cvHelpers";
import type { LanguageItem } from "@/models/types";

const { Text } = Typography;

export default function CvLanguages({ items }: { items: LanguageItem[] }) {
  const { locale } = useLocale();

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1">
      {items.map((lang, i) => (
        <Text key={i} style={{ fontSize: 13 }}>
          <Text strong>{pickLocale(lang.language, locale)}</Text>
          <span className="text-gray-400 mx-1">|</span>
          <Text type="secondary">{pickLocale(lang.proficiency, locale)}</Text>
        </Text>
      ))}
    </div>
  );
}
