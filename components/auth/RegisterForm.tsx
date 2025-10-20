"use client";

import React from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useDarkLightContext } from "../services/context/DarkLightProvider";

const { Title } = Typography;

type RegisterFields = {
  email: string;
  password: string;
};

export default function Register() {
  const { isDark } = useDarkLightContext();
  const t = useTranslations("auth");

  const onFinish = (values: RegisterFields) => {
    console.log("Register data:", values);
    message.success(t("registerSuccess"));
  };

  const onFinishFailed = () => {
    message.error(t("registerFailed"));
  };

  return (
    <div
      className={`flex justify-center items-center py-15  px-4 ${
        isDark ? "bg-background" : "bg-backgroundSoft"
      }`}
    >
      <div className="bg-card shadow-md rounded-2xl p-6 w-full max-w-md transition-all">
        <Title level={2} className=" !text-text text-center mb-6 font-semibold">
          {t("registerTitle")}
        </Title>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
              className={`!rounded-xl ${
                isDark
                  ? "bg-input text-text placeholder-gray-400"
                  : "bg-input text-text placeholder-gray-500"
              }`}
            />
          </Form.Item>

          <Form.Item<RegisterFields>
            name="password"
            rules={[
              { required: true, message: t("passwordRequired") },
              { min: 6, message: t("passwordMin") },
            ]}
          >
            <Input.Password
              placeholder={t("passwordPlaceholder")}
              size="large"
              className={`!rounded-xl ${
                isDark
                  ? "bg-input text-text placeholder-gray-400"
                  : "bg-input text-text placeholder-gray-500"
              }`}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full !font-semibold !rounded-full bg-primary hover:bg-secondary text-light transition-all"
            >
              {t("registerButton")}
            </Button>
          </Form.Item>

          <p className="text-center text-gray-500">
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
