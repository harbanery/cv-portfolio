"use client";

import { Col, Divider, Row } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { useCvMode } from "./CvModeProvider";
import type { CvData } from "@/models/types";
import CvHeader from "./CvHeader";
import CvSection from "./CvSection";
import CvSummary from "./CvSummary";
import CvExperience from "./CvExperience";
import CvEducation from "./CvEducation";
import CvCertifications from "./CvCertifications";
import CvSkills from "./CvSkills";
import CvLanguages from "./CvLanguages";
import CvProjects from "./CvProjects";
import CvAwards from "./CvAwards";

/** Narrow single-column CV layout (default). */
function CvLayout({ data }: { data: CvData }) {
  const { t } = useLocale();

  return (
    <article className="cv-document w-full max-w-[850px] mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="px-8 sm:px-12 py-8 sm:py-10">
        <CvHeader basics={data.basics} contact={data.contact} />

        <Divider style={{ marginBlock: 24 }} />

        {/* 1. Ringkasan Profil */}
        <CvSummary summary={data.basics.summary} />

        {/* 2. Pengalaman Kerja */}
        <CvSection title={t("section.experience")}>
          <CvExperience items={data.work} />
        </CvSection>

        {/* 3. Pendidikan */}
        <CvSection title={t("section.education")}>
          <CvEducation items={data.education} />
        </CvSection>

        {/* 4. Sertifikasi */}
        {data.certifications.length > 0 && (
          <CvSection title={t("section.certifications")}>
            <CvCertifications items={data.certifications} />
          </CvSection>
        )}

        {/* 5. Keahlian */}
        <CvSection title={t("section.skills")}>
          <CvSkills skills={data.skills} />
        </CvSection>

        {/* 6. Bahasa */}
        {data.languages.length > 0 && (
          <CvSection title={t("section.languages")}>
            <CvLanguages items={data.languages} />
          </CvSection>
        )}

        {/* 7. Portfolio */}
        {data.projects.length > 0 && (
          <CvSection title={t("section.projects")}>
            <CvProjects items={data.projects} />
          </CvSection>
        )}
      </div>
    </article>
  );
}

/** Wide responsive website layout — two-column grid for certain sections. */
function WebsiteLayout({ data }: { data: CvData }) {
  const { t } = useLocale();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-10">
      {/* Header — full width, left-aligned */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-8 sm:p-10 mb-8">
        <CvHeader basics={data.basics} contact={data.contact} websiteMode />
        <Divider style={{ marginBlock: 24 }} />
        <CvSummary summary={data.basics.summary} />
      </div>

      {/* Two-column grid: Experience + Education side by side */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={13}>
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-8 h-full">
            <CvSection title={t("section.experience")}>
              <CvExperience items={data.work} />
            </CvSection>
          </div>
        </Col>
        <Col xs={24} lg={11}>
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-8 h-full">
            <CvSection title={t("section.education")}>
              <CvEducation items={data.education} />
            </CvSection>
            {data.certifications.length > 0 && (
              <CvSection title={t("section.certifications")}>
                <CvCertifications items={data.certifications} />
              </CvSection>
            )}
            {data.languages.length > 0 && (
              <CvSection title={t("section.languages")}>
                <CvLanguages items={data.languages} />
              </CvSection>
            )}
          </div>
        </Col>
      </Row>

      {/* Skills — full width row */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-8 mt-6">
        <CvSection title={t("section.skills")}>
          <CvSkills skills={data.skills} />
        </CvSection>
      </div>

      {/* Portfolio — full width row */}
      {data.projects.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-8 mt-6">
          <CvSection title={t("section.projects")}>
            <CvProjects items={data.projects} type="website" />
          </CvSection>
        </div>
      )}
    </div>
  );
}

export default function CvDocument({ data }: { data: CvData }) {
  const { cvMode, hydrated } = useCvMode();
  const isCvMode = hydrated ? cvMode : true;

  return isCvMode ? <CvLayout data={data} /> : <WebsiteLayout data={data} />;
}

export { default as CvHeader } from "./CvHeader";
export { default as CvSection } from "./CvSection";
export { default as CvSummary } from "./CvSummary";
export { default as CvExperience } from "./CvExperience";
export { default as CvEducation } from "./CvEducation";
export { default as CvCertifications } from "./CvCertifications";
export { default as CvSkills } from "./CvSkills";
export { default as CvLanguages } from "./CvLanguages";
export { default as CvProjects } from "./CvProjects";
export { default as CvAwards } from "./CvAwards";
export { default as CvToolbar } from "./CvToolbar";
