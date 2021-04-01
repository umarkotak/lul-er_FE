import React from 'react'

import {
    Grid,
    Container,
    Typography,

 } from '@material-ui/core'

 
export default function Lobby() {
    return (
        <div>
           <Container>
               <Grid container style={{ marginTop : 100 }} justify='center'>
                    <Typography variant="h4" component="h4" color='textPrimary'>
                        Lobby
                    </Typography>
               </Grid>
           </Container>
        </div>
    )
}
