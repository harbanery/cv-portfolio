"use client";

import { Tag, Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { pickLocale } from "@/helpers/cvHelpers";
import type { SkillGroup } from "@/models/types";

const { Text } = Typography;

export default function CvSkills({ groups }: { groups: SkillGroup[] }) {
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-3">
      {groups.map((group, i) => (
        <div key={i} className="flex items-start gap-3 flex-wrap">
          <Text
            strong
            style={{ minWidth: 100, fontSize: 13, paddingTop: 1 }}
          >
            {pickLocale(group.category, locale)}:
          </Text>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {group.skills.map((skill, j) => (
              <Tag key={j} style={{ marginInlineEnd: 0 }}>
                {skill}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
