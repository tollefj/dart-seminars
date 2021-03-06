import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import { Edit } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

const NTNU_COLORS = [
  "#bcd025",  // lime
  "#6096d0",  // light blue
  "#ef8114",  // orange
  "#b01b81",  // pink
  "#f7d019",  // gold
  "#482776",  // purple
  "#3cbfbe",  // teal
]

function randomNtnuColor() {
  const random_idx = Math.floor(Math.random() * 100) % NTNU_COLORS.length
  return NTNU_COLORS[random_idx]
}

export default function SeminarCard({data, editable, onEdit}) {
  const defaultImg = "https://en.uit.no/Content/534983/cache=1505474594000/grid-AI.jpg"
  const image = data.image || defaultImg


  const formattedDate = new Date(data.date)
    .toLocaleDateString("NO", { day: "numeric", month: "short", year: "numeric" });

  return (
    <Card id="seminar-card" elevation={15}>
      <CardHeader
        avatar={
          <Tooltip title={data.presenter}>
            <Avatar alt={data.presenter} sx={{ bgcolor: randomNtnuColor() }} aria-label="recipe">
              {data.presenter[0]}
            </Avatar>
          </Tooltip>
        }
        action={ editable && (
          <Tooltip title="Edit seminar">
            <IconButton aria-label="settings" onClick={onEdit}>
              <Edit />
            </IconButton>
          </Tooltip>
        )}
        title={
          <Typography variant="button">
            {data.time ? ( `${formattedDate}, ${data.time}`) : formattedDate}
          </Typography>
        }
        subheader={data.presenter}
      />
      <CardMedia component="img" height="150" image={image} alt="Seminar image"/>
      <CardContent>
        <Typography variant="h5" fontSize={20} color="text.secondary">
          {data.topic}
        </Typography>
        {data.description && (
          <Typography paragraph color="text.secondary">
            {data.description}
          </Typography>
        )}
        {data.link && (
          <Typography paddingTop={2} variant="body2" color="text.secondary">
            See more <a href={data.link}>here</a>
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share" onClick={() => alert("This should copy the url of the presentation notes")}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
