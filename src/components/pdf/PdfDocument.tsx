import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { registerInterFont, PDF_COLORS, MAX_ITEMS_PDF } from "./fontConfig";
import type { CvData, Locale } from "@/models/types";
import { pickLocale, formatDateRange } from "@/helpers/cvHelpers";
import { SOURCE_CONFIG } from "@/models/sources";

registerInterFont();

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    color: PDF_COLORS.text,
    padding: "36pt 40pt",
    backgroundColor: "#ffffff",
    lineHeight: 1.5,
  },
  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerInfo: {
    flex: 1,
    textAlign: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    color: PDF_COLORS.primary,
    marginBottom: 6,
  },
  contacts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  contactItem: {
    fontSize: 8,
    color: PDF_COLORS.secondary,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLORS.border,
    marginVertical: 12,
  },
  // Sections
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: PDF_COLORS.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLORS.border,
    marginBottom: 8,
  },
  sectionWrap: {
    marginBottom: 14,
  },
  // Summary
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 14,
  },
  // Item (experience, education, org)
  itemWrap: {
    marginBottom: 8,
  },
  itemHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemTitle: {
    fontSize: 10,
    fontWeight: 700,
  },
  itemSeparator: {
    color: PDF_COLORS.light,
  },
  itemSubtitle: {
    fontSize: 10,
    color: PDF_COLORS.secondary,
  },
  itemMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 1,
    marginBottom: 2,
  },
  itemMeta: {
    fontSize: 8,
    color: PDF_COLORS.light,
  },
  bulletList: {
    marginTop: 2,
    paddingLeft: 12,
  },
  bulletItem: {
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 1,
  },
  // Skills
  skillRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  skillCategory: {
    fontSize: 9,
    fontWeight: 700,
    minWidth: 120,
  },
  skillItems: {
    fontSize: 9,
    color: PDF_COLORS.secondary,
    flex: 1,
  },
  // Certifications
  certRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  // Languages
  langRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 2,
  },
  // Source badge
  badge: {
    fontSize: 7,
    color: "#ffffff",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
  },
  // Projects
  techText: {
    fontSize: 8,
    color: PDF_COLORS.primary,
    marginTop: 2,
  },
  linkText: {
    fontSize: 8,
    color: PDF_COLORS.primary,
  },
});

function SourceTag({ source }: { source: string }) {
  const config = SOURCE_CONFIG[source as keyof typeof SOURCE_CONFIG];
  if (!config) return null;
  return (
    <Text style={[styles.badge, { backgroundColor: config.color }]}>
      {config.label.en}
    </Text>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <View wrap={false}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionDivider} />
    </View>
  );
}

function PdfHeader({ data, locale }: { data: CvData; locale: Locale }) {
  const { profile } = data;
  const contacts = [
    profile.contact.email,
    profile.contact.phone,
    pickLocale(profile.contact.location, locale),
    ...(profile.contact.website ? [profile.contact.website] : []),
    ...(profile.contact.linkedin ? [profile.contact.linkedin] : []),
    ...(profile.contact.github ? [profile.contact.github] : []),
  ];

  return (
    <View>
      <View style={styles.headerRow}>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.title}>{pickLocale(profile.title, locale)}</Text>
          <View style={styles.contacts}>
            {contacts.map((c, i) => (
              <Text key={i} style={styles.contactItem}>
                {c}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

function PdfExperience({
  items,
  locale,
}: {
  items: CvData["experiences"];
  locale: Locale;
}) {
  const limited = items.slice(0, MAX_ITEMS_PDF);
  return (
    <View>
      {limited.map((exp, i) => (
        <View key={i} style={styles.itemWrap} wrap={false}>
          <View style={styles.itemHeaderRow}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text style={styles.itemTitle}>
                {pickLocale(exp.position, locale)}
              </Text>
              <Text style={styles.itemSeparator}> | </Text>
              <Text style={styles.itemSubtitle}>{exp.company}</Text>
            </View>
            <SourceTag source={exp.source} />
          </View>
          <View style={styles.itemMetaRow}>
            <Text style={styles.itemMeta}>
              {formatDateRange(exp.startDate, exp.endDate, locale)}
            </Text>
            <Text style={styles.itemMeta}>
              {pickLocale(exp.location, locale)}
            </Text>
          </View>
          {exp.description.length > 0 && (
            <View style={styles.bulletList}>
              {exp.description.map((desc, j) => (
                <Text key={j} style={styles.bulletItem}>
                  {`\u2022 ${pickLocale(desc, locale)}`}
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
  const limited = items.slice(0, MAX_ITEMS_PDF);
  return (
    <View>
      {limited.map((edu, i) => (
        <View key={i} style={styles.itemWrap} wrap={false}>
          <View style={styles.itemHeaderRow}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text style={styles.itemTitle}>
                {pickLocale(edu.degree, locale)}
              </Text>
              <Text style={styles.itemSeparator}> | </Text>
              <Text style={styles.itemSubtitle}>{edu.institution}</Text>
            </View>
            <SourceTag source={edu.source} />
          </View>
          <View style={styles.itemMetaRow}>
            <Text style={styles.itemMeta}>
              {pickLocale(edu.field, locale)}
              {edu.gpa ? ` | GPA: ${edu.gpa}` : ""}
            </Text>
            <Text style={styles.itemMeta}>
              {formatDateRange(edu.startDate, edu.endDate, locale)}
            </Text>
          </View>
          {edu.description && edu.description.length > 0 && (
            <View style={styles.bulletList}>
              {edu.description.map((desc, j) => (
                <Text key={j} style={styles.bulletItem}>
                  {`\u2022 ${pickLocale(desc, locale)}`}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

function PdfOrganizations({
  items,
  locale,
}: {
  items: CvData["organizations"];
  locale: Locale;
}) {
  const limited = items.slice(0, MAX_ITEMS_PDF);
  return (
    <View>
      {limited.map((org, i) => (
        <View key={i} style={styles.itemWrap} wrap={false}>
          <View style={styles.itemHeaderRow}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text style={styles.itemTitle}>
                {pickLocale(org.position, locale)}
              </Text>
              <Text style={styles.itemSeparator}> | </Text>
              <Text style={styles.itemSubtitle}>{org.organization}</Text>
            </View>
            <SourceTag source={org.source} />
          </View>
          <View style={styles.itemMetaRow}>
            <Text style={styles.itemMeta}>
              {formatDateRange(org.startDate, org.endDate, locale)}
            </Text>
            <Text style={styles.itemMeta}>
              {pickLocale(org.location, locale)}
            </Text>
          </View>
          {org.description.length > 0 && (
            <View style={styles.bulletList}>
              {org.description.map((desc, j) => (
                <Text key={j} style={styles.bulletItem}>
                  {`\u2022 ${pickLocale(desc, locale)}`}
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
        <View key={i} style={[styles.certRow]} wrap={false}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={styles.itemTitle}>{cert.name}</Text>
            <Text style={styles.itemSeparator}> | </Text>
            <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <Text style={styles.itemMeta}>
              {formatDateRange(cert.startDate, cert.endDate, locale)}
            </Text>
            <SourceTag source={cert.source} />
          </View>
        </View>
      ))}
    </View>
  );
}

function PdfSkills({
  items,
  locale,
}: {
  items: CvData["skills"];
  locale: Locale;
}) {
  return (
    <View>
      {items.map((group, i) => (
        <View key={i} style={styles.skillRow} wrap={false}>
          <Text style={styles.skillCategory}>
            {pickLocale(group.category, locale)}:
          </Text>
          <Text style={styles.skillItems}>{group.skills.join(", ")}</Text>
        </View>
      ))}
    </View>
  );
}

function PdfLanguages({
  items,
  locale,
}: {
  items: CvData["languages"];
  locale: Locale;
}) {
  return (
    <View style={styles.langRow}>
      {items.map((lang, i) => (
        <View key={i}>
          <Text style={styles.itemTitle}>
            {pickLocale(lang.language, locale)}
          </Text>
          <Text style={styles.itemSubtitle}>
            {pickLocale(lang.proficiency, locale)}
          </Text>
        </View>
      ))}
    </View>
  );
}

function PdfProjects({
  items,
  locale,
}: {
  items: CvData["projects"];
  locale: Locale;
}) {
  const limited = items.slice(0, MAX_ITEMS_PDF);
  return (
    <View>
      {limited.map((project, i) => (
        <View key={i} style={styles.itemWrap} wrap={false}>
          <View style={styles.itemHeaderRow}>
            <Text style={styles.itemTitle}>{project.name}</Text>
            <SourceTag source={project.source} />
          </View>
          <Text style={styles.bulletItem}>
            {pickLocale(project.description, locale)}
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.techText}>
              {project.techStack.join(" | ")}
            </Text>
            {project.link && (
              <Text style={styles.linkText}>{project.link}</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

export default function PdfDocument({
  data,
  locale,
  sectionTitles,
}: {
  data: CvData;
  locale: Locale;
  sectionTitles: {
    experience: string;
    education: string;
    organizations: string;
    certifications: string;
    skills: string;
    languages: string;
    projects: string;
  };
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 1. Header + Ringkasan Profil */}
        <PdfHeader data={data} locale={locale} />
        <Text style={styles.summaryText}>
          {pickLocale(data.profile.summary, locale)}
        </Text>

        {/* 2. Pengalaman Kerja */}
        <View style={styles.sectionWrap} wrap={false}>
          <SectionTitle title={sectionTitles.experience} />
          <PdfExperience items={data.experiences} locale={locale} />
        </View>

        {/* 3. Pendidikan */}
        <View style={styles.sectionWrap} wrap={false}>
          <SectionTitle title={sectionTitles.education} />
          <PdfEducation items={data.education} locale={locale} />
        </View>

        {/* 4. Pengalaman Organisasi */}
        <View style={styles.sectionWrap} wrap={false}>
          <SectionTitle title={sectionTitles.organizations} />
          <PdfOrganizations items={data.organizations} locale={locale} />
        </View>

        {/* 5. Sertifikasi */}
        <View style={styles.sectionWrap} wrap={false}>
          <SectionTitle title={sectionTitles.certifications} />
          <PdfCertifications items={data.certifications} locale={locale} />
        </View>

        {/* 6. Keahlian */}
        <View style={styles.sectionWrap} wrap={false}>
          <SectionTitle title={sectionTitles.skills} />
          <PdfSkills items={data.skills} locale={locale} />
        </View>

        {/* 7. Bahasa */}
        {data.languages.length > 0 && (
          <View style={styles.sectionWrap} wrap={false}>
            <SectionTitle title={sectionTitles.languages} />
            <PdfLanguages items={data.languages} locale={locale} />
          </View>
        )}

        {/* 8. Portfolio (page baru) */}
        {data.projects.length > 0 && (
          <View break style={styles.sectionWrap} wrap={false}>
            <SectionTitle title={sectionTitles.projects} />
            <PdfProjects items={data.projects} locale={locale} />
          </View>
        )}
      </Page>
    </Document>
  );
}
