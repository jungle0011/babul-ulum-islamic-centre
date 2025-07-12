import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React, { Suspense } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Babul Ulum Islamic Learning Centre',
  description: 'Premium Islamic Learning & Spiritual Enlightenment Centre founded by Alfa Baba. Specializing in advanced knowledge, spiritual guidance, and Islamic education.',
  keywords: 'Islamic learning, spiritual enlightenment, Islamic education, Alfa Baba, Babul Ulum, Islamic centre',
  authors: [{ name: 'Alfa Baba' }],
  creator: 'Babul Ulum Islamic Learning Centre',
  openGraph: {
    title: 'Babul Ulum Islamic Learning Centre',
    description: 'Premium Islamic Learning & Spiritual Enlightenment Centre',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Babul Ulum Islamic Learning Centre',
    description: 'Premium Islamic Learning & Spiritual Enlightenment Centre',
  },
  icons: {
    icon: [
      { url: '/babul-logo.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/babul-logo.jpg', sizes: '16x16', type: 'image/jpeg' },
    ],
    shortcut: '/babul-logo.jpg',
    apple: '/babul-logo.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
      </body>
    </html>
  )
} 