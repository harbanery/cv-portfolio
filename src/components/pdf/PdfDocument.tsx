import nodePath from "node:path";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import { registerCvFont, PDF_COLORS, MAX_ITEMS_PDF } from "./fontConfig";
import type { CvData, Locale } from "@/models/types";
import { pickLocale, formatDateRange } from "@/helpers/cvHelpers";
import type { ContactLabels, ProjectLinkLabels } from "@/helpers/pdfHelpers";

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
    fontSize: 16,
    fontWeight: 700,
    color: PDF_COLORS.heading,
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 12,
    color: PDF_COLORS.secondary,
    marginBottom: 10,
  },
  contactLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 2,
  },
  contactLabel: {
    fontSize: 10,
    color: PDF_COLORS.light,
    marginRight: 4,
  },
  contactValue: {
    fontSize: 10,
    color: PDF_COLORS.secondary,
    marginRight: 14,
  },
  contactLink: {
    fontSize: 10,
    color: PDF_COLORS.link,
    textDecoration: "underline",
    marginRight: 14,
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
  skillsText: {
    fontSize: 11,
    color: PDF_COLORS.secondary,
    lineHeight: 1.7,
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
    marginBottom: 2,
  },
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
  locale,
  contactLabels,
}: {
  data: CvData;
  locale: Locale;
  contactLabels: ContactLabels;
}) {
  const { profile } = data;
  const locText = pickLocale(profile.contact.location, locale);

  // Baris kontak utama: email, phone, location.
  // Format: "label value" — label tidak bisa diklik, hanya value yang clickable.
  // Tanpa pemisah "|".
  const primaryContacts: { label: string; node: React.ReactNode }[] = [
    {
      label: contactLabels.email,
      node: (
        <Link
          style={styles.contactLink}
          src={`mailto:${profile.contact.email}`}
        >
          {profile.contact.email}
        </Link>
      ),
    },
    {
      label: contactLabels.phone,
      node: (
        <Link
          style={styles.contactLink}
          src={`tel:${profile.contact.phone.replace(/\s/g, "")}`}
        >
          {profile.contact.phone}
        </Link>
      ),
    },
    {
      label: contactLabels.location,
      node: <Text style={styles.contactValue}>{locText}</Text>,
    },
  ];

  // Baris kontak sekunder: website, linkedin, github (opsional).
  const secondaryContacts: { label: string; node: React.ReactNode }[] = [];
  if (profile.contact.website) {
    secondaryContacts.push({
      label: contactLabels.website,
      node: (
        <Link
          style={styles.contactLink}
          src={`https://${profile.contact.website}`}
        >
          {profile.contact.website}
        </Link>
      ),
    });
  }
  if (profile.contact.linkedin) {
    secondaryContacts.push({
      label: contactLabels.linkedin,
      node: (
        <Link
          style={styles.contactLink}
          src={`https://${profile.contact.linkedin}`}
        >
          {profile.contact.linkedin}
        </Link>
      ),
    });
  }
  if (profile.contact.github) {
    secondaryContacts.push({
      label: contactLabels.github,
      node: (
        <Link
          style={styles.contactLink}
          src={`https://${profile.contact.github}`}
        >
          {profile.contact.github}
        </Link>
      ),
    });
  }

  return (
    <View>
      <View style={styles.headerRow}>
        {profile.avatar && (
          // react-pdf Image doesn't support alt prop
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            style={styles.avatar}
            src={nodePath.join(process.cwd(), "public", profile.avatar)}
          />
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.jobTitle}>
            {pickLocale(profile.title, locale)}
          </Text>
          {/* {primaryContacts.map((c, i) => (
            <View key={`p-${i}`} style={styles.contactLine}>
              <Text style={styles.contactLabel}>{c.label}</Text>
              {c.node}
            </View>
          ))} */}
          <View style={styles.contactLine}>
            {primaryContacts.map((c, i) => (
              <View key={`s-${i}`} style={{ flexDirection: "row" }}>
                <Text style={styles.contactLabel}>{c.label}</Text>
                {c.node}
              </View>
            ))}
          </View>
          {secondaryContacts.length > 0 && (
            <View style={styles.contactLine}>
              {secondaryContacts.map((c, i) => (
                <View key={`s-${i}`} style={{ flexDirection: "row" }}>
                  <Text style={styles.contactLabel}>{c.label}</Text>
                  {c.node}
                </View>
              ))}
            </View>
          )}
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
          <Text style={styles.itemTitle}>{pickLocale(edu.degree, locale)}</Text>
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

function PdfSkills({ items }: { items: CvData["skills"]; locale: Locale }) {
  const allSkills = items.flatMap((group) => group.skills);
  return <Text style={styles.skillsText}>{allSkills.join(", ")}</Text>;
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
      {items.slice(0, MAX_ITEMS_PDF).map((project, i) => (
        <View key={i} style={styles.itemWrap} wrap={false}>
          <Text style={styles.projectTitle}>{project.name}</Text>
          <Text style={styles.projectDesc}>
            {pickLocale(project.description, locale)}
          </Text>
          <Text style={styles.projectTech}>{project.techStack.join(", ")}</Text>
          {project.websiteLink && (
            <View style={styles.projectLinkLine}>
              <Text style={styles.projectLinkLabel}>
                {projectLinkLabels.website}
              </Text>
              <Link
                style={styles.projectLink}
                src={`https://${project.websiteLink}`}
              >
                {project.websiteLink}
              </Link>
            </View>
          )}
          {project.sourceCodeLink && (
            <View style={styles.projectLinkLine}>
              <Text style={styles.projectLinkLabel}>
                {projectLinkLabels.sourceCode}
              </Text>
              <Link
                style={styles.projectLink}
                src={`https://${project.sourceCodeLink}`}
              >
                {project.sourceCodeLink}
              </Link>
            </View>
          )}
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
    organizations: string;
    certifications: string;
    skills: string;
    projects: string;
  };
  contactLabels: ContactLabels;
  projectLinkLabels: ProjectLinkLabels;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 1. Header + Ringkasan Profil */}
        <PdfHeader data={data} locale={locale} contactLabels={contactLabels} />
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

        {/* 8. Portfolio (page baru) */}
        {data.projects.length > 0 && (
          <View break style={styles.sectionWrap} wrap={false}>
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
