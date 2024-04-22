import { Card, CardHeader, CardContent} from '@mui/material'
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Unstable_Grid2';

const LoginLoading = () => {
    return (
        <Card variant="outlined" sx={{width: "25%", position: "absolute", top: "45%", left: "50%", transform: "translateX(-50%) translateY(-45%)"}}>
        <CardHeader title="Login" />
        <CardContent>
            <Grid container spacing={2} flexDirection="column">
              <Grid textAlign="left">
                <Skeleton variant='rectangular' height={40} />
              </Grid>
              <Grid textAlign="left"> 
                <Skeleton variant='rectangular' height={40} />
              </Grid>
            <Grid container spacing={2} justifyContent="center">
                <Grid>
                    <Skeleton variant='rectangular' width={60} height={30} />
                </Grid>
                <Grid>
                    <Skeleton variant='rectangular' width={60} height={30} />
                </Grid>
            </Grid>
            </Grid>
        </CardContent>
      </Card>
    )
}

export default LoginLoading;