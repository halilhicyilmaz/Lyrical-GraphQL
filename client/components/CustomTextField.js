import React from "react"
import { FormControl, InputLabel, OutlinedInput } from "@mui/material"


const CustomTextField = (props) => {

    const { value, setValue, title, type = 'text' } = props

    return <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel >{title}</InputLabel>
        <OutlinedInput
            type={type}
            value={value}
            onChange={(e) => {
                setValue(e.target.value)
            }}
            label={title}
        />
    </FormControl>
}

export default CustomTextField