"use client";
import { useEffect, useRef, useState } from "react";
import { IconButton, Fade, Slide, Paper } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const showFooter = () => {
      setVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(false), 3000); // 10 seconds
    };

    window.addEventListener("mousemove", showFooter);
    window.addEventListener("scroll", showFooter);
    window.addEventListener("keydown", showFooter);

    return () => {
      window.removeEventListener("mousemove", showFooter);
      window.removeEventListener("scroll", showFooter);
      window.removeEventListener("keydown", showFooter);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Fade in={visible}>
      <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            left: "47%",
            bottom: 20,
            transform: "translateX(-50%)",
            bgcolor: "background.paper",
            px: 2,
            py: 0.5,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 1,
            zIndex: 1400,
            boxShadow: 4,
            opacity: 0.95,
            transition: "all 0.4s cubic-bezier(.4,2,.6,1)",
          }}
        >
          <IconButton color="primary" href="#" size="small" aria-label="E-mail">
            <EmailIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="primary"
            href="#"
            size="small"
            aria-label="Instagram"
          >
            <InstagramIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="primary"
            href="#"
            size="small"
            aria-label="LinkedIn"
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
        </Paper>
      </Slide>
    </Fade>
  );
}