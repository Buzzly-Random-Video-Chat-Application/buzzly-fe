import { useState, useEffect } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { RemoveRedEyeRounded } from "@mui/icons-material";
import { flags, images } from "../../../assets";

const lives = [
    {
        src: images.live1,
        viewers: 1000,
        username: "John Doe",
        country: flags.us,
    },
    {
        src: images.live2,
        viewers: 2000,
        username: "Jane Smith",
        country: flags.jp,
    },
    {
        src: images.live3,
        viewers: 1500,
        username: "Alice Johnson",
        country: flags.uk,
    },
    {
        src: images.live4,
        viewers: 2500,
        username: "Bob Brown",
        country: flags.kr,
    },
    {
        src: images.live5,
        viewers: 3000,
        username: "Charlie Green",
        country: flags.de,
    },
];

export default function InfinityCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % lives.length);
    };

    useEffect(() => {
        const interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ width: '660px', position: "relative", height: "100%" }}>
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {lives.map((image, index) => {
                    const position = (index - currentIndex + lives.length) % lives.length;
                    let zIndex = 10;
                    let opacity = 1;
                    let scale = 1;
                    let translateX = "0%";

                    if (position === 0) {
                        zIndex = 30;
                        scale = 1;
                        translateX = "0%";
                    } else if (position === 1 || position === lives.length - 1) {
                        zIndex = 20;
                        scale = 0.85;
                        translateX = position === 1 ? "75%" : "-75%";
                        opacity = 0.9;
                    } else if (position === 2 || position === lives.length - 2) {
                        zIndex = 10;
                        scale = 0.7;
                        translateX = position === 2 ? "130%" : "-130%";
                        opacity = 0.7;
                    } else {
                        opacity = 0;
                    }

                    return (
                        <Box
                            key={index}
                            sx={{
                                position: "absolute",
                                transition: "all 0.5s ease-in-out",
                                zIndex,
                                opacity,
                                transform: `translateX(${translateX}) scale(${scale})`,
                                width: "200px",
                                height: "300px",
                            }}
                        >
                            <Box
                                component="img"
                                src={image.src || "/placeholder.svg"}
                                alt={image.username}
                                sx={{
                                    borderRadius: "1.5rem",
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                            <Box sx={{
                                position: "absolute",
                                top: "10px",
                                left: "10px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "4px",
                                color: "white.50",
                                bgcolor: "black.100",
                                padding: "0px 8px",
                                borderRadius: "30px",
                            }}>
                                <RemoveRedEyeRounded sx={{ color: "white", fontSize: "15px" }} />
                                <Box sx={{ fontSize: "15px" }}>{image.viewers}</Box>
                            </Box>
                            <Box sx={{
                                position: "absolute",
                                bottom: "10px",
                                left: "10px",
                                display: "flex",
                                flexDirection: "column",
                                color: "white.50",
                            }}>
                                <Typography sx={{ fontSize: "10px !important", fontWeight: 600 }}>
                                    Live of {image.username}
                                </Typography>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "5px",
                                    alignItems: "center",
                                }}>
                                    <Avatar
                                        src={image.src}
                                        sx={{ width: "20px", height: "20px", objectFit: "cover" }}
                                    />
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "2px",
                                        alignItems: "flex-start",
                                    }}>
                                        <Typography sx={{ fontSize: "10px !important", fontWeight: 600 }}>
                                            {image.username}
                                        </Typography>
                                        <img
                                            src={image.country}
                                            alt="country flag"
                                            style={{ width: "10px", height: "10px" }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}