import React from "react";
type Props = {
  title: string;
  button?: React.ReactNode;
  children: React.ReactNode;
};

export default function TableLayout({ title, button, children }: Props) {
  return (
    <div className="container py-16 min-h-[calc(100vh-200px)]">
      <div className="flex justify-between items-center pb-8">
        <h2 className="text-2xl md:text-3xl text-text font-semibold">
          {title}
        </h2>
        {button && button}
      </div>
      {children}
    </div>
  );
}
