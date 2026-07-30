"use client";

import { Divider } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import type { CvData } from "@/models/types";
import CvHeader from "./CvHeader";
import CvSection from "./CvSection";
import CvSummary from "./CvSummary";
import CvExperience from "./CvExperience";
import CvEducation from "./CvEducation";
import CvSkills from "./CvSkills";
import CvCertifications from "./CvCertifications";
import CvLanguages from "./CvLanguages";
import CvProjects from "./CvProjects";

export default function CvDocument({ data }: { data: CvData }) {
  const { t } = useLocale();

  return (
    <article className="cv-document w-full max-w-[850px] mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="px-8 sm:px-12 py-8 sm:py-10">
        <CvHeader profile={data.profile} />

        <Divider style={{ marginBlock: 24 }} />

        <CvSummary summary={data.profile.summary} />

        <CvSection title={t("section.experience")}>
          <CvExperience items={data.experiences} />
        </CvSection>

        <CvSection title={t("section.education")}>
          <CvEducation items={data.education} />
        </CvSection>

        {data.certifications.length > 0 && (
          <CvSection title={t("section.certifications")}>
            <CvCertifications items={data.certifications} />
          </CvSection>
        )}

        <CvSection title={t("section.skills")}>
          <CvSkills groups={data.skills} />
        </CvSection>

        {data.languages.length > 0 && (
          <CvSection title={t("section.languages")}>
            <CvLanguages items={data.languages} />
          </CvSection>
        )}

        {data.projects.length > 0 && (
          <CvSection title={t("section.projects")}>
            <CvProjects items={data.projects} />
          </CvSection>
        )}
      </div>
    </article>
  );
}

export { default as CvHeader } from "./CvHeader";
export { default as CvSection } from "./CvSection";
export { default as CvSummary } from "./CvSummary";
export { default as CvExperience } from "./CvExperience";
export { default as CvEducation } from "./CvEducation";
export { default as CvSkills } from "./CvSkills";
export { default as CvCertifications } from "./CvCertifications";
export { default as CvLanguages } from "./CvLanguages";
export { default as CvProjects } from "./CvProjects";
export { default as CvToolbar } from "./CvToolbar";
export { default as SourceBadge } from "./SourceBadge";
