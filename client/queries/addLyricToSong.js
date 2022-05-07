
import { gql } from "@apollo/client";

export default gql`
mutation AddLyricToSong($id: ID!, $content: String! ){
    addLyricToSong(songId: $id, content: $content){
      id
      title
      lyrics{
        id
        content
        likes
      }
    }
  }
`
