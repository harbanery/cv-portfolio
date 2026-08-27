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
  const resolvedAvatar = avatarHydrated ? avatar : false;

  return (
    <div className="no-print sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-800">
      <div className="flex max-w-7xl mx-auto items-center justify-center sm:justify-end gap-1 sm:gap-2 overflow-x-auto">
        <Space size="small" wrap>
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
          <Tooltip
            title={resolvedAvatar ? t("avatar.disable") : t("avatar.enable")}
          >
            <Button
              type={resolvedAvatar ? "primary" : "default"}
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
            <span className="hidden xs:inline sm:inline">
              {t("cv.download")}
            </span>
          </Button>
        </Space>
      </div>
    </div>
  );
}
