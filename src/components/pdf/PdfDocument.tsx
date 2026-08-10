import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  registerCvFont,
  PDF_COLORS,
  MAX_PROJECTS_PDF,
  MAX_HIGHLIGHTS_PDF,
  MAX_WORK_HIGHLIGHTS_PDF,
} from "./fontConfig";
import type { CvData, Locale } from "@/models/types";
import {
  buildSkillGroups,
  emailDisplay,
  emailHref,
  formatDate,
  formatDateRange,
  locationText,
  phoneDisplay,
  phoneHref,
  urlDisplay,
} from "@/helpers/cvHelpers";
import type { ContactLabels, ProjectLinkLabels } from "@/helpers/pdfHelpers";

registerCvFont();

/**
 * Aturan tipografi PDF:
 * - Heading (nama & judul section): 14–16 pt.
 * - Teks isi: 10–12 pt.
 * - Tanpa grafik, progress bar, ikon/simbol rumit, maupun tabel.
 */
const styles = StyleSheet.create({
  page: {
    fontFamily: "Calibri",
    fontSize: 11,
    color: PDF_COLORS.text,
    padding: "40pt 44pt",
    backgroundColor: "#ffffff",
    lineHeight: 1.5,
  },
  // Header
  name: {
    fontSize: 16,
    fontWeight: 700,
    color: PDF_COLORS.heading,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: PDF_COLORS.secondary,
    marginBottom: 8,
  },
  contactLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 2,
  },
  contactItem: {
    flexDirection: "row",
    marginRight: 14,
  },
  contactLabel: {
    fontSize: 10,
    color: PDF_COLORS.light,
    marginRight: 4,
  },
  contactValue: {
    fontSize: 10,
    color: PDF_COLORS.secondary,
  },
  contactLink: {
    fontSize: 10,
    color: PDF_COLORS.link,
    textDecoration: "underline",
  },
  divider: {
    borderBottomWidth: 1.5,
    borderBottomColor: PDF_COLORS.border,
    marginVertical: 14,
  },
  // Section
  sectionWrap: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: PDF_COLORS.heading,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  sectionUnderline: {
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLORS.border,
    marginBottom: 8,
  },
  // Summary
  summaryText: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 14,
  },
  // Items
  itemWrap: {
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: PDF_COLORS.heading,
  },
  itemSubtitle: {
    fontSize: 11,
    color: PDF_COLORS.secondary,
  },
  itemMeta: {
    fontSize: 10,
    color: PDF_COLORS.light,
    marginBottom: 3,
  },
  itemSummary: {
    fontSize: 11,
    color: PDF_COLORS.secondary,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  bulletList: {
    marginTop: 2,
    paddingLeft: 14,
  },
  bulletItem: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  mutedLine: {
    fontSize: 10,
    color: PDF_COLORS.light,
    lineHeight: 1.5,
    marginTop: 1,
  },
  // Skills
  skillRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  skillLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: PDF_COLORS.heading,
    minWidth: 130,
  },
  skillItems: {
    fontSize: 11,
    color: PDF_COLORS.secondary,
    flex: 1,
  },
  // Projects
  projectLinkLine: {
    flexDirection: "row",
    marginBottom: 1,
  },
  projectLinkLabel: {
    fontSize: 10,
    color: PDF_COLORS.light,
    marginRight: 4,
  },
  projectLink: {
    fontSize: 10,
    color: PDF_COLORS.link,
    textDecoration: "underline",
  },
});

function SectionTitle({ title }: { title: string }) {
  return (
    <View wrap={false}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionUnderline} />
    </View>
  );
}

function PdfHeader({
  data,
  contactLabels,
}: {
  data: CvData;
  contactLabels: ContactLabels;
}) {
  const { basics, contact } = data;

  const primaryContacts: { label: string; node: React.ReactNode }[] = [
    {
      label: contactLabels.email,
      node: (
        <Link style={styles.contactLink} src={emailHref(contact.email)}>
          {emailDisplay(contact.email)}
        </Link>
      ),
    },
    {
      label: contactLabels.phone,
      node: (
        <Link style={styles.contactLink} src={phoneHref(contact.phone)}>
          {phoneDisplay(contact.phone)}
        </Link>
      ),
    },
    {
      label: contactLabels.location,
      node: (
        <Text style={styles.contactValue}>{locationText(basics.location)}</Text>
      ),
    },
  ];

  const secondaryContacts: { label: string; node: React.ReactNode }[] = [
    {
      label: contactLabels.linkedin,
      node: (
        <Link style={styles.contactLink} src={contact.linkedin}>
          {urlDisplay(contact.linkedin)}
        </Link>
      ),
    },
    {
      label: contactLabels.github,
      node: (
        <Link style={styles.contactLink} src={contact.github}>
          {urlDisplay(contact.github)}
        </Link>
      ),
    },
  ];

  return (
    <View>
      <Text style={styles.name}>{basics.name}</Text>
      <Text style={styles.label}>{basics.label}</Text>
      <View style={styles.contactLine}>
        {primaryContacts.map((c, i) => (
          <View key={`p-${i}`} style={styles.contactItem}>
            <Text style={styles.contactLabel}>{c.label}</Text>
            {c.node}
          </View>
        ))}
      </View>
      <View style={styles.contactLine}>
        {secondaryContacts.map((c, i) => (
          <View key={`s-${i}`} style={styles.contactItem}>
            <Text style={styles.contactLabel}>{c.label}</Text>
            {c.node}
          </View>
        ))}
      </View>
      <View style={styles.divider} />
    </View>
  );
}

function PdfExperience({
  items,
  locale,
}: {
  items: CvData["work"];
  locale: Locale;
}) {
  return (
    <View>
      {items.map((exp, i) => (
        <View key={i} style={styles.itemWrap} wrap={false}>
          <View style={styles.itemRow}>
            <Text style={styles.itemTitle}>{exp.position}</Text>
            <Text style={styles.itemMeta}>
              {formatDateRange(exp.startDate, exp.endDate, locale)}
            </Text>
          </View>
          <Text style={styles.itemSubtitle}>
            {exp.company}
            {exp.location ? `  ·  ${exp.location}` : ""}
          </Text>
          {exp.summary ? (
            <Text style={styles.itemSummary}>{exp.summary}</Text>
          ) : null}
          {exp.highlights.length > 0 && (
            <View style={styles.bulletList}>
              {exp.highlights
                .slice(0, MAX_WORK_HIGHLIGHTS_PDF)
                .map((desc, j) => (
                  <Text key={j} style={styles.bulletItem}>
                    {`\u2022 ${desc}`}
                  </Text>
                ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

function PdfEducation({
  items,
  locale,
}: {
  items: CvData["education"];
  locale: Locale;
}) {
  return (
    <View>
      {items.map((edu, i) => (
        <View key={i} style={styles.itemWrap} wrap={false}>
          <View style={styles.itemRow}>
            <Text style={styles.itemTitle}>{edu.institution}</Text>
            <Text style={styles.itemMeta}>
              {formatDateRange(edu.startDate, edu.endDate, locale)}
            </Text>
          </View>
          <Text style={styles.itemSubtitle}>
            {edu.field}
            {edu.degree ? `  ·  ${edu.degree}` : ""}
            {edu.grade ? `  ·  GPA: ${edu.grade}` : ""}
          </Text>
          {edu.courses.length > 0 && (
            <Text style={styles.mutedLine}>{edu.courses.join(" · ")}</Text>
          )}
          {edu.highlights.length > 0 && (
            <View style={styles.bulletList}>
              {edu.highlights
                .slice(0, MAX_WORK_HIGHLIGHTS_PDF)
                .map((desc, j) => (
                  <Text key={j} style={styles.bulletItem}>
                    {`\u2022 ${desc}`}
                  </Text>
                ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

function PdfCertifications({
  items,
  locale,
}: {
  items: CvData["certifications"];
  locale: Locale;
}) {
  return (
    <View>
      {items.map((cert, i) => (
        <View key={i} style={styles.itemWrap} wrap={false}>
          <View style={styles.itemRow}>
            <Text style={styles.itemTitle}>{cert.name}</Text>
            <Text style={styles.itemMeta}>{formatDate(cert.date, locale)}</Text>
          </View>
          <Text style={styles.itemSubtitle}>
            {cert.issuer}
            {cert.credentialId ? `  ·  ${cert.credentialId}` : ""}
          </Text>
        </View>
      ))}
    </View>
  );
}

function PdfSkills({ data, locale }: { data: CvData; locale: Locale }) {
  const groups = buildSkillGroups(data.skills, locale);
  return (
    <View>
      {groups.map((group, i) => (
        <View key={i} style={styles.skillRow} wrap={false}>
          <Text style={styles.skillLabel}>{group.label}</Text>
          <Text style={styles.skillItems}>{group.items.join(", ")}</Text>
        </View>
      ))}
    </View>
  );
}

function PdfLanguages({ items }: { items: CvData["languages"] }) {
  return (
    <View style={styles.bulletList}>
      {items.map((lang, i) => (
        <Text key={i} style={styles.bulletItem}>
          {`\u2022 ${lang.language} \u2014 ${lang.fluency}`}
        </Text>
      ))}
    </View>
  );
}

function PdfProjects({
  items,
  locale,
  projectLinkLabels,
}: {
  items: CvData["projects"];
  locale: Locale;
  projectLinkLabels: ProjectLinkLabels;
}) {
  return (
    <View>
      {items
        ?.filter((p) => !p.disabled)
        ?.slice(0, MAX_PROJECTS_PDF)
        .map((project, i) => (
          <View key={i} style={styles.itemWrap} wrap={false}>
            <View style={styles.itemRow}>
              <Text style={styles.itemTitle}>{project.name}</Text>
              <Text style={styles.itemMeta}>
                {formatDateRange(project.startDate, project.endDate, locale)}
              </Text>
            </View>
            <Text style={styles.itemSubtitle}>{project.role}</Text>
            {project.description ? (
              <Text style={styles.itemSummary}>{project.description}</Text>
            ) : null}
            {project.techStack.length > 0 && (
              <Text style={styles.mutedLine}>
                {project.techStack.join(" · ")}
              </Text>
            )}
            {project.highlights.length > 0 && (
              <View style={styles.bulletList}>
                {project.highlights.slice(0, MAX_HIGHLIGHTS_PDF).map((h, j) => (
                  <Text key={j} style={styles.bulletItem}>
                    {`\u2022 ${h}`}
                  </Text>
                ))}
              </View>
            )}
            {project.metrics.length > 0 && (
              <Text style={styles.mutedLine}>
                {project.metrics
                  .map((m) => `${m.metric}: ${m.value}`)
                  .join("  |  ")}
              </Text>
            )}
            {project.url.website ? (
              <View style={styles.projectLinkLine}>
                <Text style={styles.projectLinkLabel}>
                  {projectLinkLabels.website}
                </Text>
                <Link style={styles.projectLink} src={project.url.website}>
                  {urlDisplay(project.url.website)}
                </Link>
              </View>
            ) : null}
            {project.url.sourceCode ? (
              <View style={styles.projectLinkLine}>
                <Text style={styles.projectLinkLabel}>
                  {projectLinkLabels.sourceCode}
                </Text>
                <Link style={styles.projectLink} src={project.url.sourceCode}>
                  {urlDisplay(project.url.sourceCode)}
                </Link>
              </View>
            ) : null}
          </View>
        ))}
    </View>
  );
}

function PdfAwards({
  items,
  locale,
}: {
  items: CvData["awards"];
  locale: Locale;
}) {
  return (
    <View>
      {items.map((award, i) => (
        <View key={i} style={styles.itemWrap} wrap={false}>
          <View style={styles.itemRow}>
            <Text style={styles.itemTitle}>{award.title}</Text>
            <Text style={styles.itemMeta}>
              {formatDate(award.date, locale)}
            </Text>
          </View>
          <Text style={styles.itemSubtitle}>{award.issuer}</Text>
        </View>
      ))}
    </View>
  );
}

export default function PdfDocument({
  data,
  locale,
  sectionTitles,
  contactLabels,
  projectLinkLabels,
}: {
  data: CvData;
  locale: Locale;
  sectionTitles: {
    experience: string;
    education: string;
    certifications: string;
    skills: string;
    languages: string;
    projects: string;
    awards: string;
  };
  contactLabels: ContactLabels;
  projectLinkLabels: ProjectLinkLabels;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 1. Header + Ringkasan Profil */}
        <PdfHeader data={data} contactLabels={contactLabels} />
        <Text style={styles.summaryText}>{data.basics.summary}</Text>

        {/* 2. Pengalaman Kerja */}
        <View style={styles.sectionWrap}>
          <SectionTitle title={sectionTitles.experience} />
          <PdfExperience items={data.work} locale={locale} />
        </View>

        {/* 3. Pendidikan */}
        <View style={styles.sectionWrap}>
          <SectionTitle title={sectionTitles.education} />
          <PdfEducation items={data.education} locale={locale} />
        </View>

        {/* 4. Sertifikasi */}
        {data.certifications.length > 0 && (
          <View style={styles.sectionWrap}>
            <SectionTitle title={sectionTitles.certifications} />
            <PdfCertifications items={data.certifications} locale={locale} />
          </View>
        )}

        {/* 5. Keahlian */}
        <View style={styles.sectionWrap}>
          <SectionTitle title={sectionTitles.skills} />
          <PdfSkills data={data} locale={locale} />
        </View>

        {/* 6. Portfolio */}
        {data.projects.length > 0 && (
          <View break style={styles.sectionWrap}>
            <SectionTitle title={sectionTitles.projects} />
            <PdfProjects
              items={data.projects}
              locale={locale}
              projectLinkLabels={projectLinkLabels}
            />
          </View>
        )}
      </Page>
    </Document>
  );
}
