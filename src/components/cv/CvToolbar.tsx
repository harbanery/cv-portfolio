"use client";

import {
  DownloadOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { App, Button, Space, Tooltip } from "antd";
import { useState } from "react";
import { useLocale } from "@/components/locale/LocaleProvider";
import LanguageToggle from "@/components/locale/LanguageToggle";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useAvatarMode } from "@/components/avatar/AvatarProvider";
import { useCvMode } from "@/components/cv/CvModeProvider";
import { downloadCvPdf } from "@/services/cvPdfDownload";

export default function CvToolbar() {
  const { t, locale } = useLocale();
  const { message } = App.useApp();
  const {
    avatar,
    hydrated: avatarHydrated,
    toggle: toggleAvatar,
  } = useAvatarMode();
  const {
    cvMode,
    hydrated: cvModeHydrated,
    toggle: toggleCvMode,
  } = useCvMode();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await downloadCvPdf(locale, "CV.pdf", avatarHydrated && avatar);
    } catch {
      message.error(t("cv.downloadError"));
    } finally {
      setLoading(false);
    }
  };

  const resolvedCvMode = cvModeHydrated ? cvMode : false;

  return (
    <div className="no-print sticky top-0 z-50 flex flex-wrap items-center justify-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-800">
      <Space size="small">
        <ThemeToggle />
        <LanguageToggle />
        <Tooltip
          title={resolvedCvMode ? t("cvmode.disable") : t("cvmode.enable")}
        >
          <Button
            type={resolvedCvMode ? "primary" : "default"}
            icon={<FileTextOutlined />}
            onClick={toggleCvMode}
            aria-label={t("cvmode.enableWebsite")}
          />
        </Tooltip>
        <Tooltip title={avatar ? t("avatar.disable") : t("avatar.enable")}>
          <Button
            type={avatar ? "primary" : "default"}
            icon={<UserOutlined />}
            onClick={toggleAvatar}
            aria-label={t("avatar.enableAvatar")}
          />
        </Tooltip>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
          loading={loading}
        >
          <span className="hidden sm:inline">{t("cv.download")}</span>
        </Button>
      </Space>
    </div>
  );
}
