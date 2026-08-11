"use client";

import {
  EnvironmentOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import type { CvBasics, CvContact } from "@/models/types";
import {
  emailDisplay,
  emailHref,
  locationText,
  urlDisplay,
} from "@/helpers/cvHelpers";
import { useAvatarMode } from "@/components/avatar/AvatarProvider";

const { Title, Text } = Typography;

function ContactLinks({
  contacts,
  justify,
}: {
  contacts: { icon: React.ReactNode; text: string; href?: string }[];
  justify: "center" | "start";
}) {
  const justifyClass = justify === "center" ? "justify-center" : "justify-start";
  return (
    <div className={`flex flex-wrap ${justifyClass} items-center gap-x-4 gap-y-1`}>
      <div
        className={`flex flex-wrap ${justifyClass} gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400`}
      >
        {contacts.map((c, i) =>
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
    </div>
  );
}

export default function CvHeader({
  basics,
  contact,
  websiteMode = false,
}: {
  basics: CvBasics;
  contact: CvContact;
  websiteMode?: boolean;
}) {
  const { avatar, hydrated } = useAvatarMode();
  const showAvatar = hydrated && avatar;

  const contacts: { icon: React.ReactNode; text: string; href?: string }[] = [
    {
      icon: <MailOutlined />,
      text: emailDisplay(contact.email),
      href: emailHref(contact.email),
    },
    {
      icon: <EnvironmentOutlined />,
      text: locationText(basics.location),
    },
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

  const nameBlock = (
    <>
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
    </>
  );

  if (showAvatar || websiteMode) {
    return (
      <header className="flex items-center gap-6">
        {showAvatar && (
          /* Avatar rasio 35x45mm (413x531px @ 300DPI) */
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/images/me.png"
            alt={basics.name}
            className="flex-shrink-0 w-[88px] h-[113px] object-cover rounded-lg border border-gray-200 dark:border-gray-700"
          />
        )}
        <div className="flex-1 min-w-0">
          {nameBlock}
          <ContactLinks contacts={contacts} justify="start" />
        </div>
      </header>
    );
  }

  return (
    <header className="text-center">
      {nameBlock}
      <ContactLinks contacts={contacts} justify="center" />
    </header>
  );
}
