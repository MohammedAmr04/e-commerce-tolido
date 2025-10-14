import React from 'react'
import { DarkLightProvider } from './DarkLightProvider'
import { AntDProvider } from './AntDProvider'
import { ColorsProvider } from './ColorsProvider'

const UiProvider: React.FC<{ children: React.ReactNode ,isArabic:boolean}> = ({ children,isArabic }) => {
  return (
    <DarkLightProvider>
      <ColorsProvider>
        <AntDProvider isArabic={isArabic} >{children}</AntDProvider>
      </ColorsProvider>
    </DarkLightProvider>
  )
}

export default UiProvider
