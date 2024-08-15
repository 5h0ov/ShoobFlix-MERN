import React from 'react'
import axios from 'axios'
import {useState, useEffect, useRef} from 'react'
import { useHomeContent } from '../store/homeContent.js'


const getTrending = () => {
  const [trending, setTrending] = useState(null)
  const [detailsTrending, setDetailsTrending] = useState(null)
  const {content} = useHomeContent()
  
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`/api/${content}/trending`)
        setTrending(res.data.content)
        setDetailsTrending(res.data.details)
        
        // console.log(res.data.content)
        // console.log(res.data.details)
      } catch (error) {
        // console.log(error)
      }
    }
    fetchTrending()
  }, [content])

  return {trending, detailsTrending};

}

export default getTrending