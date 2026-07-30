"use client";

import {
  EnvironmentOutlined,
  GithubOutlined,
  GlobalOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import { useLocale } from "@/components/locale/LocaleProvider";
import { pickLocale } from "@/helpers/cvHelpers";
import type { CvProfile } from "@/models/types";

const { Title, Text } = Typography;

export default function CvHeader({ profile }: { profile: CvProfile }) {
  const { locale } = useLocale();

  const primaryContacts: { icon: React.ReactNode; text: string; href?: string }[] = [
    {
      icon: <MailOutlined />,
      text: profile.contact.email,
      href: `mailto:${profile.contact.email}`,
    },
    {
      icon: <PhoneOutlined />,
      text: profile.contact.phone,
      href: `tel:${profile.contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: <EnvironmentOutlined />,
      text: pickLocale(profile.contact.location, locale),
    },
  ];

  const linkContacts: { icon: React.ReactNode; text: string; href: string }[] = [
    ...(profile.contact.website
      ? [
          {
            icon: <GlobalOutlined />,
            text: profile.contact.website,
            href: `https://${profile.contact.website}`,
          },
        ]
      : []),
    ...(profile.contact.linkedin
      ? [
          {
            icon: <LinkedinOutlined />,
            text: profile.contact.linkedin,
            href: `https://${profile.contact.linkedin}`,
          },
        ]
      : []),
    ...(profile.contact.github
      ? [
          {
            icon: <GithubOutlined />,
            text: profile.contact.github,
            href: `https://${profile.contact.github}`,
          },
        ]
      : []),
  ];

  return (
    <header className="flex items-center gap-6">
      {profile.avatar && (
        <div className="flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-32 object-cover rounded-lg border-2 border-indigo-500"
          />
        </div>
      )}
      <div className="flex-1 text-center">
        <Title
          level={1}
          style={{
            marginTop: 0,
            marginBottom: 4,
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {profile.name}
        </Title>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: "#6366f1",
            display: "block",
            marginBottom: 12,
          }}
        >
          {pickLocale(profile.title, locale)}
        </Text>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
          {primaryContacts.map((c, i) =>
            c.href ? (
              <a
                key={i}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1 hover:text-indigo-500 dark:hover:text-indigo-400"
              >
                {c.icon}
                {c.text}
              </a>
            ) : (
              <span key={i} className="inline-flex items-center gap-1">
                {c.icon}
                {c.text}
              </span>
            ),
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-400 dark:text-gray-500 mt-1">
          {linkContacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-indigo-500 dark:hover:text-indigo-400"
            >
              {c.icon}
              {c.text}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
