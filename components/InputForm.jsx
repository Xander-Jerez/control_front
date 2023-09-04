import React from "react"
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

const InputForm = ({ label, handleChange, placeholder, type, name, value }) => {
    return (
        <FormControl id={name}>
            <FormLabel>{label}</FormLabel>
            <Input placeholder={placeholder} type={type} onChange={handleChange} name={name} value={value} />
        </FormControl>
    )
}

export default InputForm