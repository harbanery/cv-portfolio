"use client";

import { CodeOutlined, GlobalOutlined } from "@ant-design/icons";
import { Image, Tag, Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { formatDateRange, urlDisplay } from "@/utils/cvUtils";
import type { CvProjectItem } from "@/models/types";

const { Text, Paragraph } = Typography;

export default function CvProjects({
  items,
  websiteMode = false,
}: {
  items: CvProjectItem[];
  websiteMode?: boolean;
}) {
  const { locale, t } = useLocale();

  return (
    <div className="flex flex-col gap-5">
      {items
        ?.filter((p) => !p.disabled)
        ?.map((project, i) => (
          <div key={i + 1} className="flex flex-col lg:flex-row gap-4">
            {project.images[0] && (
              <div className="shrink-0">
                <Image
                  alt={project.name}
                  className={`${websiteMode ? "w-full sm:!w-[240px] md:!w-[280px]" : "w-full sm:!w-[180px] md:!w-[200px]"} h-auto object-contain rounded-lg border border-gray-200 dark:border-gray-700`}
                  src={project.images[0]}
                  preview={{
                    actionsRender: () => null,
                  }}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <Text strong style={{ fontSize: 15 }}>
                    {project.name}
                  </Text>
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, marginLeft: 8 }}
                  >
                    {project.role}
                    {project.company ? ` - ${project.company}` : ""}
                  </Text>
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {formatDateRange(project.startDate, project.endDate, locale)}
                </Text>
              </div>

              {project.description && (
                <Paragraph
                  style={{
                    marginTop: 4,
                    marginBottom: 4,
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  {project.description}
                </Paragraph>
              )}

              <div className="flex flex-wrap gap-1">
                {project.techStack.map((tech, j) => (
                  <Tag key={j} color="blue" style={{ marginInlineEnd: 0 }}>
                    {tech}
                  </Tag>
                ))}
              </div>

              {project.highlights.length > 0 && (
                <ul
                  className="mt-2 mb-1 pl-5 list-disc list-outside text-sm"
                  style={{ lineHeight: 1.6 }}
                >
                  {project.highlights.map((h, j) => (
                    <li key={j} className="mb-0.5">
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {project.metrics.length > 0 && (
                <div className="mt-2">
                  <Text type="secondary" strong style={{ fontSize: 12 }}>
                    {t("project.metrics")}
                  </Text>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-0.5">
                    {project.metrics.map((m, j) => (
                      <Text key={j} style={{ fontSize: 12 }}>
                        <Text strong>{m.value}</Text>
                        <span className="text-gray-400"> · </span>
                        <Text type="secondary">{m.metric}</Text>
                      </Text>
                    ))}
                  </div>
                </div>
              )}

              {(project.url.website || project.url.sourceCode) && (
                <div className="flex items-center gap-3 flex-wrap mt-1">
                  {project.url.website && (
                    <a
                      href={project.url.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-600"
                    >
                      <GlobalOutlined />
                      {urlDisplay(project.url.website)}
                    </a>
                  )}
                  {project.url.sourceCode && (
                    <a
                      href={project.url.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <CodeOutlined />
                      {urlDisplay(project.url.sourceCode)}
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
