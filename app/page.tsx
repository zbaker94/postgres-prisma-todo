import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { Card, CardHeader, CardContent, Input, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main >
      <Card variant="outlined" sx={{width: "30%", margin: "auto", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%)"}}>
        <CardHeader title="Login" />
        <CardContent>
          <Grid container spacing={2} flexDirection="column">
            <Grid textAlign="center"><Input placeholder="Username" /></Grid>
            <Grid textAlign="center"> <Input placeholder="Password" type='password' /></Grid>
            <Grid textAlign="right"><Button variant="contained" color="primary">Login</Button></Grid>
          </Grid>
        </CardContent>
      </Card>
    </main>
  )
}
