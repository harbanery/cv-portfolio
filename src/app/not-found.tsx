"use client";

import { Button, Result } from "antd";
import Link from "next/link";
import { useLocale } from "@/components/locale/LocaleProvider";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <Result
        status="404"
        title="404"
        subTitle={t("notfound.description")}
        extra={
          <Button type="primary">
            <Link href="/">{t("notfound.home")}</Link>
          </Button>
        }
      />
    </div>
  );
}
