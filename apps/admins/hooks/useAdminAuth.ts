'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function useAdminAuth() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')

    if (!token) {
      router.replace('/login')
    }
  }, [router])
}