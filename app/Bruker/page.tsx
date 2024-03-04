'use client'
import React from 'react'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const page = () => {

    const {data: session}: any = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin?callbackUrl=/Bruker");
        }
    })

  return (
    <div>Bruker Side
        <p>{session?.user?.email}</p>
        <p>{session?.user?.name}</p>

        <p>{session?.user?.role}</p>


    </div>
  )
}

export default page