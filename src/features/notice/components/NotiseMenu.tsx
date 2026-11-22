import { useCallback, useEffect, useState, type MouseEvent } from "react";
import{
    Badge,
    Box,
    Button,
    Collapse,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Popover,
    Tooltip,
    Typography
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteIcon from "@mui/icons-material/Delete";
import { DoneAll } from "@mui/icons-material";
import{
    deleteNotice,
    getNotices,
    markAllNoticesAsViewed,
    markNoticeAsViewed,
}from "../api/noticeApi"
import type { NoticeResponse } from "../types/Notice";


const POLL_INTERVAL_MS = 60_000;

export default function NoticeMenu(){
    const [notices, setNotices] = useState<NoticeResponse[]>([]);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const unreadCount = notices.filter((n) => !n.viewed).length;

    const load = useCallback(async () => {
        try
        {
            setNotices(await getNotices());
        } 
        catch 
        {
            // Displays old data until next poll attempt.
        }
    }, []);

    useEffect(() => {
        load();
        const timer = setInterval(load, POLL_INTERVAL_MS);
        return() => clearInterval(timer); 
    },[load]);

    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        load();
    }

    const handleClose = () => {
        setAnchorEl(null);
        setExpandedId(null)
    }

    const handleToggle = async(notice: NoticeResponse) =>{
        const opening = expandedId !== notice.id;
        setExpandedId(opening ? notice.id : null)

        //When expanding a selected undread notice, it will be marked as viewed.
        if(opening && !notice.viewed){
            setNotices((prev) => 
            prev.map((n) => (n.id === notice.id ? {...n, viewed: true} : n)));

            try
            {
                await markNoticeAsViewed(notice.id)
            } 
            catch 
            {
                load();
            }
        }
    }

    const handleMarkAllAsViewed = async () => {
        setNotices((prev) => prev.map((n) => ({...n, viewed: true})));
        try
        {
            await markAllNoticesAsViewed();
        } 
        catch 
        {
            load();
        }
    }

    const handleDelete = async(event: MouseEvent, id: number) => {
        event.stopPropagation();
        setNotices((prev) => prev.filter((n) => n.id !== id));
        if(expandedId === id) setExpandedId(null);
        try
        {
            await deleteNotice(id)
        }
        catch
        {
            load();
        }
    }

    return(
        <>
        <Tooltip title="Notiser">
            <IconButton color="inherit" onClick={handleOpen} aria-label="Visa notiser">
                <Badge badgeContent={unreadCount} color="error" max={99}>
                    <NotificationsIcon/>
                </Badge>
            </IconButton>
        </Tooltip>

        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{vertical: "bottom", horizontal:"right"}}
            transformOrigin={{vertical:"top", horizontal:"right"}}
            slotProps={{paper:{sx:{width: 360, maxWidth:"95vw", maxHeight:440}}}}    
        >
            {notices.length === 0 ? (
                <Typography sx={{p: 3}} color="textSecondary" align="center">
                    Inga notiser
                </Typography>
            ):(
                <>
                    <Box
                        sx={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between",
                            px: 2,
                            py: 1,
                            position:"sticky",
                            top: 0,
                            zIndex: 1,
                            bgcolor: "Background.paper",
                            borderBottom: 1,
                            borderColor: "divider"
                        }}
                    >
                        <Typography variant="subtitle2">Notiser</Typography>
                        <Button 
                            size="small"
                            startIcon={<DoneAll/>}
                            onClick={handleMarkAllAsViewed}
                            disabled={unreadCount === 0} 
                        >
                            Markera alla notiser som lästa.
                        </Button>
                    </Box>

                    <List disablePadding>
                        {notices.map((notice) => (
                            <Box key={notice.id}>
                                <Box sx={{display: "flex", alignItems:"flex-start"}}>
                                    <ListItemButton onClick={() => handleToggle(notice)} sx={{flex: 1}}>
                                        <ListItemText
                                            primary={notice.title}
                                            secondary={new Date(notice.createdAt).toLocaleString()}
                                            slotProps={{
                                                primary:{
                                                    sx:{fontWeight: notice.viewed ? 400 : 700}
                                                }
                                            }}>
                                        </ListItemText>
                                    </ListItemButton>
                                    <Tooltip title="Ta bort">
                                            <IconButton
                                                size="small"
                                                aria-label={`Ta bort ${notice.title}`}
                                                onClick={(e) => handleDelete(e, notice.id)}
                                                sx={{mt: 1, mr:1}}
                                            >
                                                <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                    </Tooltip>
                                </Box>

                                <Collapse in={expandedId === notice.id} unmountOnExit>
                                    <Typography sx={{px: 2, pb: 2}} variant="body2">
                                        {notice.message}
                                    </Typography>
                                </Collapse>

                                <Divider/>

                            </Box>
                        ))}
                    </List>
                
                </>
            )}

        </Popover>

        </>
    )
}
