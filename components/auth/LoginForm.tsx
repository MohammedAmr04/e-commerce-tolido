"use client";

import { Form, Input, Button, Typography, notification } from "antd";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { NotificationArgsProps } from "antd";
import { useDarkLightContext } from "../services/context/DarkLightProvider";

const { Title } = Typography;

interface FieldType {
  email: string;
  password: string;
}

type NotificationType = "success" | "error" | "info" | "warning";

export default function LoginForm() {
  const t = useTranslations("auth");
  const { isDark } = useDarkLightContext(); // "light" | "dark"

  const [api, contextHolder] = notification.useNotification();

  // 🔔 Notification helper
  const openNotification = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
      placement: "topRight",
      className: isDark ? "bg-background text-text" : "",
    } as NotificationArgsProps);
  };

  const onFinish = (values: FieldType) => {
    console.log("Success:", values);

    // Simulated login logic
    if (values.email === "test@tolido.com" && values.password === "123456") {
      openNotification(
        "success",
        t("loginSuccessTitle"),
        t("loginSuccessDesc")
      );
    } else {
      openNotification("error", t("loginFailTitle"), t("loginFailDesc"));
    }
  };

  const onFinishFailed = () => {
    openNotification("warning", t("formErrorTitle"), t("formErrorDesc"));
  };

  return (
    <div
      className={`flex justify-center items-center py-15  px-4 ${
        isDark ? "bg-background" : "bg-backgroundSoft"
      }`}
    >
      {contextHolder}
      <div className="bg-card shadow-md rounded-2xl p-6 w-full max-w-md transition-all">
        <Title className="!text-text text-3xl font-semibold text-center mb-6 poppins">
          {t("loginTitle")}
        </Title>

        <Form<FieldType>
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Email */}
          <Form.Item<FieldType>
            name="email"
            className="!mb-4"
            rules={[
              { required: true, message: t("emailRequired") },
              { type: "email", message: t("emailInvalid") },
            ]}
          >
            <Input
              placeholder={t("emailPlaceholder")}
              size="large"
              className="bg-input text-text placeholder-gray-400 focus:placeholder-primary"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item<FieldType>
            name="password"
            className="!mb-4"
            rules={[
              { required: true, message: t("passwordRequired") },
              { min: 6, message: t("passwordMinLength") },
            ]}
          >
            <Input.Password
              placeholder={t("passwordPlaceholder")}
              size="large"
              className="bg-input text-text placeholder-gray-400 focus:placeholder-primary"
            />
          </Form.Item>

          {/* Remember + Forget */}
          <div className="flex justify-between items-center mb-4 font-semibold text-gray-500">
            <Link
              href="/forgot-password"
              className="hover:text-primary hover:underline transition-colors"
            >
              {t("forgotPassword")}
            </Link>
          </div>

          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="w-full !font-semibold !rounded-full bg-primary hover:bg-secondary text-light transition-all"
            >
              {t("loginButton")}
            </Button>
          </Form.Item>

          {/* Register */}
          <p className="text-center text-gray-500 font-medium">
            {t("noAccount")}{" "}
            <Link
              href="signup"
              className="font-semibold text-primary hover:underline"
            >
              {t("registerNow")}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
