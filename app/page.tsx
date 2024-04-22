"use server";
import { redirect } from 'next/navigation'

export default async function AuthCheck() {

  redirect('/login')
}

