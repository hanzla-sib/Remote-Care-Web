import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

function StepCard(){
    return( <Card style={{ color: '#ffff', backgroundColor: '#E73E3B' }} sx={{ maxWidth: 180, border: "0px solid black", borderRadius: "30px", boxShadow: 20 }} elevation={2}>
    <CardMedia
      component="img"
      height="auto"
      image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAeFBMVEX///8AAAD8/PwhISH09PQ4ODiysrLu7u6Xl5cGBga5ubnFxcUwMDD5+fno6OhkZGQpKSkaGhqOjo6fn59tbW2enp4PDw/e3t6Dg4PU1NR7e3utra1mZmZHR0ePj4/Dw8NSUlLW1tZcXFxBQUFMTEw0NDRzc3MXFxfvYD01AAAEx0lEQVR4nO2caXPiMAyG64QAoVDOJtznFv7/P1xa2mInskToTOTMvM/XNVMJW7fYlxcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADURKs3Hx6Hy3ZLW5C/sTim5kY6PGgL8zyttbFIz029lXxkXPq5tkhPkY9NkfFCW6gn6MQlPYy5NNBQ/hF6XO/kTVuuqnRJPYw5aQtWkU7mUcRstUWrxtKnh8ka9bha3gsxZq0tXBV8FvJJ2qQr+WAUMUtt6R4n5/Qwl0hbvoeZsIqYnrZ8D0MHw1+aY+6Mz/ok1pbvl3y6XM/mK5/74U3kShhZcDT99UmnFWm3K0mRVd0yU7w6VUZCpbNzSZF57VKXKTqkdFo+syaltxjWL3eBaFaWqls6JTgtYzYKorsQehjTLp5KJEU+NGS32ZJiZUUnVKzVS4xUpL/z6pErKfguqsh1UA4kLa+ABTMJXZGzV7DxwDkoKqL7tPLUL5l7JaKNJEoq3CA9FvkVs9XIJ6rut8NciDGv9tGNpIhqQOSqV2Nm9tGjpIhqjchHOccPcY/wi3ctJa68CbLZQVEoEAsPsWamFb5kMY3vqKkhZ7R2+erLAH4Yq2lxpS8IZ4cG6Rlqet+Idb5XMvu0cFjTaYlluPPuhdBeyvtrZCcqYg+jhIioaettUZGddXrInlRNGSXv674XvvugmqDIitgtHj6dIdoV9VFNEf606lhBDNaOIuxp3apKNvb2o6dn3j9SB1LW4XotVhHdoYIcEO04wj2tbOD9I3UwEBWx83jO2PdKGvxQXiwpYK/+cAWJdif+JOjhJI3+xpFJtXedpPLVaefu/eeOWgr8wAfrwtNnsl/NzPcLyf+erbMDfz1y0fVZV1qCInavcfGYvkoIta79ZA5H71g3gBU6ofvgShjtzqSd6DZ9bwj5b9mr5t1NyVZUM/hv+CQlIz/Tag+dQKpv6p+wUw//6GYxvzfnQxhLC4V4n/vk2/v+y/oD2dRijUSy4kFvFoeyTMP2Dx9ZHj2EcSH8IMpRZL7Szgx5uCaP/bSu2Uy6n2p24QSYzMMx9pvC6aYbylMqwTjgi3Xs3jA9BaqLfyvZGCvUOYlWMgljy8yBe1t3cUverT8P7jcKDxVMVOUyWgaQ9lowfmvye6hHH4hDMhcmJt5rcV9TKyRF/Ltxyb1C9CiivzVnQ/ZCs/27/W17npZ2P8slKoWSeNYrFBl0myIObCHe7SEmE8Kx0oakubVBcd8Ryo6+dIrqPPQDu5CfjuPovPNXrdRMV3P7hCY36WnLZx1ECzuAdlaJnZifl9sUSRBNh4fIt1YOUuxhN+ZXlId53wl4C7ef1ZDftS6Wt1TSHnw4OVncBD1ez/cI6dnh2ARc896IdjOnjTix/3HyHUziEJqkHFFvfSmYtDuL6mz3yebcCy4OOgza1NwghE57NSb09EN1U/EpPHNRuiEfMr5xorZc1fH0ILTFqg49qk61xarOgNznuMgfDA7ySthZT6BE1Kx6ry3VM1COK4wBYVWIfvZO/lSARKW1p3HYaZWXt2KHq0H/JYXLwc1+s+DLDi8H505Ca8BVoWM1sHSXef/M9DvEp810vRaD1XEUJ8sAx4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoMh/hZMyoukaivgAAAAASUVORK5CYII="
      alt="Steps"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Step Counts
      </Typography>
      <Typography variant="h5" >
        count
      </Typography>
    </CardContent>
  </Card>)
}
export default StepCard;