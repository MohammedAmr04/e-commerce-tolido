"use client";

import { useState } from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import type { NotificationArgsProps } from "antd";
import { useTranslations } from "next-intl";
import { useDarkLightContext } from "../services/context/DarkLightProvider";
import {
  useForgetPasswordMutation,
  useResetPasswordMutation,
  ErrorResponse,
} from "../services/api/auth/useAuthMutations";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");

  const { mutate: forgetPassword, isPending: isSending } =
    useForgetPasswordMutation();
  const { mutate: resetPassword, isPending: isResetting } =
    useResetPasswordMutation();

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

  // Step 1 — Send Email
  const onFinishStep1 = (values: Step1Type) => {
    setEmail(values.email);
    forgetPassword(values, {
      onSuccess: () => {
        openNotification("success", t("otpSentTitle"), t("otpSentDesc"));
        setStep(2);
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        openNotification(
          "error",
          t("emailNotFoundTitle"),
          error.response?.data?.message || t("emailNotFoundDesc")
        );
      },
    });
  };

  // Step 2 — Verify OTP & Reset Password
  const onFinishStep2 = (values: Step2Type) => {
    resetPassword(
      { email, ...values },
      {
        onSuccess: () => {
          openNotification(
            "success",
            t("passwordResetSuccessTitle"),
            t("passwordResetSuccessDesc")
          );
          router.push("/login");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
          openNotification(
            "error",
            t("passwordResetFailTitle"),
            error.response?.data?.message || t("passwordResetFailDesc")
          );
        },
      }
    );
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
                loading={isSending}
                className="w-full !font-semibold !rounded-full bg-primary hover:bg-secondary text-light transition-all"
              >
                {t("sendCode")}
              </Button>
            </Form.Item>
          </Form>
        ) : (
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
              <Input.OTP length={6} size="large" className="otp-inputs" />
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
                loading={isResetting}
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
