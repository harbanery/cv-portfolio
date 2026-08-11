"use client";

import { Tag, Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { buildSkillGroups } from "@/helpers/cvHelpers";
import type { CvSkills } from "@/models/types";

const { Text } = Typography;

export default function CvSkills({ skills }: { skills: CvSkills }) {
  const { locale } = useLocale();
  const groups = buildSkillGroups(skills, locale);

  return (
    <div className="flex flex-col gap-3">
      {groups.map((group, i) => (
        <div key={i} className="flex items-start gap-3">
          <Text strong style={{ minWidth: 95, fontSize: 13, paddingTop: 1 }}>
            {group.label}:
          </Text>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {group.items.map((skill, j) => (
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
