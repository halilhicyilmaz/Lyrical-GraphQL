import React, { useState } from "react"
import { Button, Grid, IconButton, Typography } from "@mui/material"
import fetchASong from '../queries/fetchASong'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom'
import CustomTextField from "../components/CustomTextField";
import addLyricToSong from "../queries/addLyricToSong";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import likeLyric from "../queries/likeLyric";


const SongDetails = () => {
    const { id } = useParams()

    const styles = {
        buttons: {
            color: "white",
            backgroundColor: 'red',
            '&:hover': {
                backgroundColor: 'darkred'
            }
        }
    }
    const history = useNavigate()


    const [song, setSong] = useState({})
    const [lyrics, setLyrics] = useState([])
    const [lyric, setLyric] = useState('')


    const { loading, error, data, refetch } = useQuery(
        fetchASong, {
        variables: { id: id },
        onCompleted: (data) => {
            data.song ? setSong(data.song) : history("/")
            data.song && setLyrics(data.song.lyrics)
        }
    }
    )
    const [AddLyricToSong] = useMutation(addLyricToSong);
    const [LikeLyric] = useMutation(likeLyric);

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const added = await AddLyricToSong({ variables: { id: data.song.id, content: lyric } })
            setLyrics(added.data.addLyricToSong.lyrics)
            setLyric('')
        } catch (error) {
            console.log(error)
        }

    }

    return <Grid container item>
        <Grid item xs={12}>
            <Button onClick={() => history("/")}>Back</Button>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="h3">{song.title}</Typography>
        </Grid>
        {lyrics.map((ly, i) => {
            return <Grid item container xs={12} key={i} marginTop={"10px"}>
                <Grid item xs={4}>
                    <Typography variant="h5">{ly.content}</Typography>
                </Grid>

                <Grid item xs={4}>
                    <Typography display="inline" marginRight={"10px"}>{ly.likes}</Typography>
                    <IconButton sx={styles.buttons} onClick={async () => {
                        const likes = await LikeLyric({
                            variables: { id: ly.id },
                            // optimisticResponse: {
                            //     likeLyric: {
                            //         id: ly.id,
                            //         content: ly.content,
                            //         likes: likes + 15,
                            //         __typeName: 'LyricType',
                            //     }
                            // }
                        })
                        ly.likes = likes.data.likeLyric.likes
                    }}>
                        <ThumbUpIcon />
                    </IconButton>
                </Grid>
            </Grid>
        })}
        <Grid item xs={12}>

            <form onSubmit={onSubmit}>
                <CustomTextField title='Lyric:' value={lyric} setValue={setLyric} />
            </form>
        </Grid>
    </Grid>
}

export default SongDetails