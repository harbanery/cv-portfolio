import nodePath from "node:path";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { registerCvFont, PDF_COLORS, MAX_ITEMS_PDF } from "./fontConfig";
import type { CvData, Locale } from "@/models/types";
import { pickLocale, formatDateRange } from "@/helpers/cvHelpers";

registerCvFont();

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
  headerRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 4,
  },
  avatar: {
    width: 72,
    height: 96,
    objectFit: "cover",
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: PDF_COLORS.heading,
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 13,
    color: PDF_COLORS.secondary,
    marginBottom: 6,
  },
  contacts: {
    fontSize: 10,
    color: PDF_COLORS.secondary,
    lineHeight: 1.6,
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
  itemTitle: {
    fontSize: 11,
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
    marginTop: 1,
    marginBottom: 3,
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
  // Skills
  skillRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  skillCategory: {
    fontSize: 11,
    fontWeight: 700,
    minWidth: 130,
    color: PDF_COLORS.heading,
  },
  skillItems: {
    fontSize: 11,
    color: PDF_COLORS.secondary,
    flex: 1,
  },
  // Languages
  langText: {
    fontSize: 11,
    color: PDF_COLORS.secondary,
    marginBottom: 2,
  },
  // Projects
  projectTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: PDF_COLORS.heading,
  },
  projectDesc: {
    fontSize: 11,
    color: PDF_COLORS.secondary,
    marginTop: 2,
    marginBottom: 2,
    lineHeight: 1.5,
  },
  projectTech: {
    fontSize: 10,
    color: PDF_COLORS.light,
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
        {profile.avatar && (
          <Image
            style={styles.avatar}
            src={nodePath.join(process.cwd(), "public", profile.avatar)}
            alt={profile.name}
          />
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.jobTitle}>
            {pickLocale(profile.title, locale)}
          </Text>
          <Text style={styles.contacts}>{contacts.join("  |  ")}</Text>
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
  return (
    <View>
      {items.slice(0, MAX_ITEMS_PDF).map((exp, i) => (
        <View key={i} style={styles.itemWrap} wrap={false}>
          <Text style={styles.itemTitle}>
            {pickLocale(exp.position, locale)}
          </Text>
          <Text style={styles.itemSubtitle}>{exp.company}</Text>
          <Text style={styles.itemMeta}>
            {formatDateRange(exp.startDate, exp.endDate, locale)}
            {"   "}
            {pickLocale(exp.location, locale)}
          </Text>
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
  return (
    <View>
      {items.slice(0, MAX_ITEMS_PDF).map((edu, i) => (
        <View key={i} style={styles.itemWrap} wrap={false}>
          <Text style={styles.itemTitle}>
            {pickLocale(edu.degree, locale)}
          </Text>
          <Text style={styles.itemSubtitle}>{edu.institution}</Text>
          <Text style={styles.itemMeta}>
            {formatDateRange(edu.startDate, edu.endDate, locale)}
            {edu.gpa ? `   |   GPA: ${edu.gpa}` : ""}
          </Text>
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
  return (
    <View>
      {items.slice(0, MAX_ITEMS_PDF).map((org, i) => (
        <View key={i} style={styles.itemWrap} wrap={false}>
          <Text style={styles.itemTitle}>
            {pickLocale(org.position, locale)}
          </Text>
          <Text style={styles.itemSubtitle}>{org.organization}</Text>
          <Text style={styles.itemMeta}>
            {formatDateRange(org.startDate, org.endDate, locale)}
            {"   "}
            {pickLocale(org.location, locale)}
          </Text>
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
        <View key={i} style={styles.itemWrap} wrap={false}>
          <Text style={styles.itemTitle}>{cert.name}</Text>
          <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
          <Text style={styles.itemMeta}>
            {formatDateRange(cert.startDate, cert.endDate, locale)}
          </Text>
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
            {pickLocale(group.category, locale)}
          </Text>
          <Text style={styles.skillItems}>
            {group.skills.join(", ")}
          </Text>
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
    <View>
      {items.map((lang, i) => (
        <Text key={i} style={styles.langText}>
          <Text style={{ fontWeight: 700 }}>
            {pickLocale(lang.language, locale)}
          </Text>
          {" - "}
          {pickLocale(lang.proficiency, locale)}
        </Text>
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
  return (
    <View>
      {items.slice(0, MAX_ITEMS_PDF).map((project, i) => (
        <View key={i} style={styles.itemWrap} wrap={false}>
          <Text style={styles.projectTitle}>{project.name}</Text>
          <Text style={styles.projectDesc}>
            {pickLocale(project.description, locale)}
          </Text>
          <Text style={styles.projectTech}>
            {project.techStack.join(", ")}
            {project.link ? `   |   ${project.link}` : ""}
          </Text>
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
