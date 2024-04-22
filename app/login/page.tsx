import { Card, CardHeader, CardContent} from '@mui/material'

import LoginForm from './login-form';

export default function Login() {
  return (
    <main>
      <Card variant="outlined" sx={{width: "25%", position: "absolute", top: "45%", left: "50%", transform: "translateX(-50%) translateY(-45%)"}}>
        <CardHeader title="Login" />
        <CardContent>
            <LoginForm />
        </CardContent>
      </Card>
    </main>
  )
}
