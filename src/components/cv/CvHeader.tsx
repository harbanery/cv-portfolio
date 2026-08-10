"use client";

import {
  EnvironmentOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import type { CvBasics, CvContact } from "@/models/types";
import {
  emailDisplay,
  emailHref,
  locationText,
  phoneDisplay,
  phoneHref,
  urlDisplay,
} from "@/helpers/cvHelpers";

const { Title, Text } = Typography;

export default function CvHeader({
  basics,
  contact,
}: {
  basics: CvBasics;
  contact: CvContact;
}) {
  const primaryContacts: {
    icon: React.ReactNode;
    text: string;
    href?: string;
  }[] = [
    {
      icon: <MailOutlined />,
      text: emailDisplay(contact.email),
      href: emailHref(contact.email),
    },
    {
      icon: <EnvironmentOutlined />,
      text: locationText(basics.location),
    },
  ];

  const linkContacts: { icon: React.ReactNode; text: string; href: string }[] =
    [
      {
        icon: <LinkedinOutlined />,
        text: urlDisplay(contact.linkedin),
        href: contact.linkedin,
      },
      {
        icon: <GithubOutlined />,
        text: urlDisplay(contact.github),
        href: contact.github,
      },
    ];

  return (
    <header className="text-center">
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
        {basics.name}
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
        {basics.title ?? basics.label}
      </Text>
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
          {primaryContacts.map((c, i) =>
            c.href ? (
              <a
                key={i}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  c.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
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
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-400 dark:text-gray-500">
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
