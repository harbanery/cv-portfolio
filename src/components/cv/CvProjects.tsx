"use client";

import { LinkOutlined } from "@ant-design/icons";
import { Tag, Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { pickLocale } from "@/helpers/cvHelpers";
import type { ProjectItem } from "@/models/types";
import SourceBadge from "./SourceBadge";

const { Text, Paragraph } = Typography;

export default function CvProjects({ items }: { items: ProjectItem[] }) {
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-4">
      {items.map((project, i) => (
        <div key={i}>
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <Text strong style={{ fontSize: 15 }}>
              {project.name}
            </Text>
            <SourceBadge source={project.source} />
          </div>
          <Paragraph
            style={{ marginTop: 4, marginBottom: 4, fontSize: 13, lineHeight: 1.6 }}
          >
            {pickLocale(project.description, locale)}
          </Paragraph>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex flex-wrap gap-1">
              {project.techStack.map((tech, j) => (
                <Tag key={j} color="blue" style={{ marginInlineEnd: 0 }}>
                  {tech}
                </Tag>
              ))}
            </div>
            {project.link && (
              <a
                href={`https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-600"
              >
                <LinkOutlined />
                {project.link}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
