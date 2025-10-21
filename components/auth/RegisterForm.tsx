"use client";

import React from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { NotificationArgsProps } from "antd";
import { useDarkLightContext } from "../services/context/DarkLightProvider";
import {
  useRegisterMutation,
  RegisterData,
  ApiResponse,
  RegisterResponse,
  ErrorResponse,
} from "../services/api/auth/useAuthMutations";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const { Title } = Typography;

type RegisterFields = {
  name: string;
  email: string;
  password: string;
};

type NotificationType = "success" | "error" | "info" | "warning";

export default function Register() {
  const t = useTranslations("auth");
  const { isDark } = useDarkLightContext();
  const router = useRouter();

  const registerMutation = useRegisterMutation(); // 🔐 useMutation
  const [api, contextHolder] = notification.useNotification();

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

  const onFinish = (values: RegisterFields) => {
    const payload: RegisterData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    registerMutation.mutate(payload, {
      onSuccess: (res: ApiResponse<RegisterResponse>) => {
        openNotification(
          "success",
          t("registerSuccess"),
          "Account created successfully!"
        );
        const token = res.data?.data?.token;
        if (token) localStorage.setItem("token", token);
        router.push("/profile"); // 🔄 Redirect to profile to complete info
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        openNotification(
          "error",
          t("registerFailed"),
          error.response?.data?.message || "Registration failed!"
        );
      },
    });
  };

  const onFinishFailed = () => {
    openNotification("warning", t("formErrorTitle"), t("formErrorDesc"));
  };

  return (
    <div
      className={`flex justify-center items-center py-15 px-4 ${
        isDark ? "bg-background" : "bg-backgroundSoft"
      }`}
    >
      {contextHolder}
      <div className="bg-card shadow-md rounded-2xl p-6 w-full max-w-md transition-all">
        <Title level={2} className="!text-text text-center mb-6 font-semibold">
          {t("registerTitle")}
        </Title>

        <Form<RegisterFields>
          name="register"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Name */}
          <Form.Item<RegisterFields>
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              placeholder={t("fullName")}
              size="large"
              className="bg-input text-text placeholder-gray-400 !rounded-xl"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item<RegisterFields>
            name="email"
            rules={[
              { required: true, message: t("emailRequired") },
              { type: "email", message: t("emailInvalid") },
            ]}
          >
            <Input
              placeholder={t("emailPlaceholder")}
              size="large"
              className="bg-input text-text placeholder-gray-400 !rounded-xl"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item<RegisterFields>
            name="password"
            rules={[
              { required: true, message: t("passwordRequired") },
              { min: 6, message: t("passwordMinLength") },
            ]}
          >
            <Input.Password
              placeholder={t("passwordPlaceholder")}
              size="large"
              className="bg-input text-text placeholder-gray-400 !rounded-xl"
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="w-full !font-semibold !rounded-full bg-primary hover:bg-secondary text-light transition-all"
              loading={registerMutation.isPending}
            >
              {t("registerButton")}
            </Button>
          </Form.Item>

          {/* Login Link */}
          <p className="text-center text-gray-500 font-medium">
            {t("haveAccount")}{" "}
            <Link
              href="/login"
              className="font-semibold text-[var(--primary-color)] hover:underline"
            >
              {t("loginLink")}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
