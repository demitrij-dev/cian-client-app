import React from "react";
import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from "@/app/LayoutComponents/Header/Header";

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  )
}
