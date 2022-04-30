import React, { useEffect, useState } from "react"
import {
    useQuery,
    gql
} from "@apollo/client";

const SongList = () => {


    const { loading, error, data } = useQuery(query)
    const [songList, setSongList] = useState([])

    useEffect(() => {
        if (data) {
            setSongList(data.songs)
        }
    }, [loading])



    return (
        <>

            {songList.map((song, i) => {
                return <div key={i}>{song.title}</div>
            })}

            <button onClick={() => {
                console.log(songList)
            }}> asda</button>
        </>

    )


}

const query = gql`
{
    songs{
        title
    }
}
`
export default (SongList)