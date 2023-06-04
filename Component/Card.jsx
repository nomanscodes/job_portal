import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { green, red, white } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';

export default function JobCard({ post, giveMeID }) {

    return (
        <Card sx={{ maxWidth: 545, marginTop: 2, }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                        {post.posted_by.first_name[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.company_name}
                subheader={new Date(post.created_at).toString("yyyy-MM-dd")}
            />
            <CardContent>
                <Typography sx={{ fontSize: 20, color: "black" }}>
                    {post.title}
                </Typography>

                <Typography sx={{ fontSize: 14, color: "black", marginTop: 1 }}>
                    {post.overview}
                </Typography>
            </CardContent>
            <Link href="">
                <Button onClick={(e) => giveMeID(post.id)} sx={{ bgcolor:"gold",color:"black", marginRight: 2, marginBottom: 1,float:"right" }}>Details
                </Button>
            </Link>
        </Card>

    );
}