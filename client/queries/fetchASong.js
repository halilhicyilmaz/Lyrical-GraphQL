import { gql } from "@apollo/client";

export default gql`
    query FetchASong($id: ID!){
        song(id: $id){
            id
            title
            lyrics{
                id
                likes
                content
            }
        }
    }
`