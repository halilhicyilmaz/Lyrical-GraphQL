import React, { useEffect, useState } from "react"
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom'
import { Button, Grid } from "@mui/material";
import CustomTextField from "../components/CustomTextField";

const SongCreate = () => {
    const history = useNavigate()

    const [title, setTitle] = useState('')
    const [AddSong, { data, loading, error }] = useMutation(mutation);

    const onSubmit = async (e) => {
        e.preventDefault()
        try {

            await AddSong({ variables: { text: title } })

            history("/")

        } catch (error) {
            console.log(error)
        }

    }

    return (<Grid container>
        <Grid item xs={12}>
            <Button onClick={() => history("/")}>Back</Button>
        </Grid>
        <Grid item xs={12}>

            <form onSubmit={onSubmit}>

                <CustomTextField title='Song Title:' value={title} setValue={setTitle} />
            </form>
        </Grid>

    </Grid>

    )



}
const mutation = gql`
    mutation AddSong($text: String!){
        addSong(title: $text){
            id,title
        }
      }
`

export default (SongCreate)