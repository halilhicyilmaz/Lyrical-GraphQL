import React, { useEffect, useState } from "react"
import {
    useQuery,
    gql
} from "@apollo/client";
import { useNavigate } from 'react-router-dom'
import { Grid, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


const SongList = () => {
    const history = useNavigate()

    const styles = {
        addButton: {
            color: "white",
            backgroundColor: 'red',
            '&:hover': {
                backgroundColor: 'darkred'
            }
        }
    }


    const { loading, error, data } = useQuery(query)
    const [songList, setSongList] = useState([])

    useEffect(() => {
        if (data) {
            setSongList(data.songs)
        }
    }, [data])



    return (
        <Grid container >

            {
                songList.map((song, i) => {
                    return <Grid item xs={12} key={i} sx={{ textAlign: "-webkit-center" }}>
                        <Grid item xs={4} key={i} textAlign='center'>
                            <Typography variant='h4' >{song.title}</Typography>
                        </Grid>
                    </Grid>
                })
            }
            <Grid item xs={12} sx={{ textAlign: "-webkit-center" }}>
                <Grid item xs={4} textAlign='end'>
                    <IconButton sx={styles.addButton} aria-label="add new song" onClick={() => history("/songs/new")}>
                        <AddIcon></AddIcon>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>

    )


}

const query = gql`
{
    songs{
        title
    },
    lyric(id:"626d08c9dba2b82e8b19abac"){
        content
    }
}
`
export default (SongList)