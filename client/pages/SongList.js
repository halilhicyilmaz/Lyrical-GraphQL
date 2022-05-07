import React, { useEffect, useState } from "react"
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom'
import { Grid, IconButton, Typography, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import fetchSongs from '../queries/fetchSongs'
import deleteSong from '../queries/deleteSong'
import DeleteIcon from '@mui/icons-material/Delete';

const SongList = () => {
    const history = useNavigate()

    const styles = {
        buttons: {
            color: "white",
            backgroundColor: 'red',
            '&:hover': {
                backgroundColor: 'darkred'
            }
        }
    }
    const [songList, setSongList] = useState([])

    const { loading, error, data, refetch } = useQuery(
        fetchSongs, {
        onCompleted: (data) => {
            data.songs && setSongList(data.songs)
        }
    })

    const [DeleteSong] = useMutation(deleteSong);

    return (
        <Grid container >

            {
                songList.map(({ id, title }, i) => {
                    return <Grid item xs={12} key={i} sx={{ textAlign: "-webkit-center" }}>
                        <Grid item container xs={4} key={i} justifyContent="space-between">
                            <Grid item sx={{ ":hover": { cursor: 'pointer' } }} onClick={() => {
                                history("/song/" + id)
                            }}>
                                <Typography variant='h4' >{title}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton sx={styles.buttons} aria-label="add new song" onClick={() => {
                                    DeleteSong({ variables: { id: id } })
                                    refetch()
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                })
            }
            <Grid item xs={12} sx={{ textAlign: "-webkit-center", marginTop: "20px" }}>
                <Grid item xs={4} textAlign='end'>
                    <IconButton sx={styles.buttons} aria-label="add new song" onClick={() => history("/songs/new")}>
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>

    )


}

export default (SongList)