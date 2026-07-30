"use client";

import { CodeOutlined, GlobalOutlined } from "@ant-design/icons";
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
        <div key={i} className="flex gap-4">
          {project.image && (
            <div className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.name}
                className="w-32 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
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
            </div>
            {(project.websiteLink || project.sourceCodeLink) && (
              <div className="flex items-center gap-3 flex-wrap mt-1">
                {project.websiteLink && (
                  <a
                    href={`https://${project.websiteLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-600"
                  >
                    <GlobalOutlined />
                    {project.websiteLink}
                  </a>
                )}
                {project.sourceCodeLink && (
                  <a
                    href={`https://${project.sourceCodeLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <CodeOutlined />
                    {project.sourceCodeLink}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
