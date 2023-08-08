import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil";
import {courseState,Coursetype} from "../store/course"
import ErrorBoundary from "../util/ErrorBoundary"


export function Course(){
    const {courseid} =useParams()
    const {course,setCourse} = useRecoilState(courseState)
    return(
        <div>
            <h1>course page {courseid}</h1>
        </div>
    )
}