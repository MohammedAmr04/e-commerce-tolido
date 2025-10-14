"use client"

import { ConfigProvider } from 'antd'
import React from 'react'
import { useDarkLightContext } from './DarkLightProvider'
import { ANTD_THEME, ANTD_THEME_DARK } from '../constants/ANT_CONFIG'
import arEG from "antd/locale/ar_EG";
import enUS from "antd/locale/en_US";

export const AntDProvider: React.FC<{ children: React.ReactNode,isArabic:boolean }> = ({
  children,isArabic
}) => {
  const { isDark } = useDarkLightContext()

  return (
    <ConfigProvider direction={isArabic ? "rtl" : "ltr"} locale={isArabic ? arEG : enUS} theme={isDark ? ANTD_THEME_DARK : ANTD_THEME}>
      {children}
    </ConfigProvider>
  )
}
