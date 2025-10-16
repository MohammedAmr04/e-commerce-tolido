"use client";

import { JSX} from "react";
import {
  
  Button,
  Input,
  Typography,
  Form,
  Select,
} from "antd";
import "./style.css"
const { Title, Text } = Typography;
const { Option } = Select;

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function ProfileSettings(): JSX.Element {
  const [form] = Form.useForm<ProfileFormValues>();

 
  const handleSave = (): void => {
    const values = form.getFieldsValue();
    console.log("Profile Saved ", values);
  };

  const handleCancel = (): void => {
    form.resetFields();
  };

  return (
    <div
      className="
      min-h-screen 
      p-8 
      bg-[var(--color-background)] 
      text-[var(--color-text)]
    "
    >
      {/* Header */}
      <div className="mb-8">
        <Title
          level={2}
          className="!text-primary !mb-1 !font-bold"
        >
          My Profile
        </Title>
        <Text className="!text-[var(--color-text)]/70">
          Manage your account information and preferences
        </Text>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar Section */}
        {/* Form Section */}
        <Form<ProfileFormValues>
          form={form}
          requiredMark={false}
          layout="vertical"
          className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4"
          initialValues={{
            name: "Sarah",          gender: "female",

            email: "sarah.johnson@email.com",
            phone: "+1 (555) 123-4567",
            address: "123 Main Street, Apt 4B\nNew York, NY 10001",
          }}
        >
          <Form.Item label="Name"  name="name">
            <Input size="large" className="bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-text)] rounded-lg" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input size="large" className="bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-text)] rounded-lg" />
          </Form.Item>

        {/* Gender */}
        <Form.Item label="Gender" name="gender">
          <Select
            size="large"
            placeholder="Select gender"
            styles={{popup:{root:{
              backgroundColor: "var(--color-card)",
              color: "var(--color-text)",
            }}}}
            className="text-[var(--color-text)]"
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>


          <Form.Item label="Phone Number" name="phone">
            <Input size="large" className="bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-text)] rounded-lg" />
          </Form.Item>

          <Form.Item  label="Address" name="address" className="md:col-span-2">
            <Input.TextArea
              rows={3}
              className="bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-text)] rounded-lg  resize-none"
            />
          </Form.Item>

          <div className="flex gap-4  md:col-span-2">
            <Button
              type="primary"
              size="large"
              // className="!bg-[var(--color-accent)] !border-none px-6"
              onClick={handleSave}
            >
              Save Changes
            </Button>
            <Button
            size="large"
              className="!bg-transparent !border !border-[var(--color-border)] px-6 text-[var(--color-text)]"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
