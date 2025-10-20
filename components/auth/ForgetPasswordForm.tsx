"use client";

import { useState } from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import type { NotificationArgsProps } from "antd";
import { useTranslations } from "next-intl";
import { useDarkLightContext } from "../services/context/DarkLightProvider";

const { Title } = Typography;

type NotificationType = "success" | "error" | "info" | "warning";

interface Step1Type {
  email: string;
}
interface Step2Type {
  otp: string;
  newPassword: string;
}

export default function ForgetPasswordForm() {
  const t = useTranslations("auth");
  const { isDark } = useDarkLightContext();
  const [api, contextHolder] = notification.useNotification();

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  console.log(email);
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

  // 🔹 Step 1 — Send Email
  const onFinishStep1 = async (values: Step1Type) => {
    console.log("Email submitted:", values);
    setEmail(values.email);

    try {
      // Simulate API call
      // await axios.post("/api/auth/forgot-password", { email: values.email });

      openNotification("success", t("otpSentTitle"), t("otpSentDesc"));
      setStep(2);
    } catch (error) {
      console.error("Email sending failed:", error);
      openNotification(
        "error",
        t("emailNotFoundTitle"),
        t("emailNotFoundDesc")
      );
    }
  };

  // 🔹 Step 2 — Verify OTP & Reset Password
  const onFinishStep2 = async (values: Step2Type) => {
    console.log("OTP + New Password submitted:", values);

    try {
      // Simulate API call
      // await axios.post("/api/auth/reset-password", { email, ...values });

      openNotification(
        "success",
        t("passwordResetSuccessTitle"),
        t("passwordResetSuccessDesc")
      );
    } catch (e) {
      console.error("Password reset failed:", e);
      openNotification(
        "error",
        t("passwordResetFailTitle"),
        t("passwordResetFailDesc")
      );
    }
  };

  return (
    <div
      className={`flex justify-center items-center py-15 px-4 ${
        isDark ? "bg-background" : "bg-backgroundSoft"
      }`}
    >
      {contextHolder}

      <div className="bg-card shadow-md rounded-2xl p-6 w-full max-w-md transition-all">
        <Title className="!text-text text-3xl font-semibold text-center mb-6 poppins">
          {step === 1 ? t("forgetTitle") : t("resetPasswordTitle")}
        </Title>

        {step === 1 ? (
          // Step 1 Form
          <Form<Step1Type>
            name="forgetPassword"
            layout="vertical"
            onFinish={onFinishStep1}
            autoComplete="off"
          >
            <Form.Item<Step1Type>
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

            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full !font-semibold !rounded-full bg-primary hover:bg-secondary text-light transition-all"
              >
                {t("sendCode")}
              </Button>
            </Form.Item>
          </Form>
        ) : (
          // Step 2 Form
          <Form<Step2Type>
            name="resetPassword"
            layout="vertical"
            onFinish={onFinishStep2}
            autoComplete="off"
          >
            <Form.Item<Step2Type>
              name="otp"
              className="!mb-4"
              rules={[{ required: true, message: t("otpRequired") }]}
            >
              <Input
                placeholder={t("otpPlaceholder")}
                size="large"
                className="bg-input text-text placeholder-gray-400 focus:placeholder-primary"
              />
            </Form.Item>

            <Form.Item<Step2Type>
              name="newPassword"
              className="!mb-4"
              rules={[
                { required: true, message: t("passwordRequired") },
                { min: 6, message: t("passwordMinLength") },
              ]}
            >
              <Input.Password
                placeholder={t("newPasswordPlaceholder")}
                size="large"
                className="bg-input text-text placeholder-gray-400 focus:placeholder-primary"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full !font-semibold !rounded-full bg-primary hover:bg-secondary text-light transition-all"
              >
                {t("resetPassword")}
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
}
