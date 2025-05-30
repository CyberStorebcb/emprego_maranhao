"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useState } from "react";

export default function NavBar({ mode, setMode, isMobile }: { mode: "light" | "dark"; setMode: (m: "light" | "dark") => void; isMobile: boolean }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: "Início", icon: <HomeIcon />, href: "/" },
    { text: "Vagas", icon: <WorkIcon />, href: "/vagas" },
    { text: "Sobre", icon: <InfoIcon />, href: "/sobre" },
    { text: "Contato", icon: <ContactMailIcon />, href: "/contato" },
  ];

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={2}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🚀 Empregos Maranhão
          </Typography>
          {!isMobile &&
            menuItems.map((item) => (
              <Button key={item.text} color="inherit" href={item.href} startIcon={item.icon}>
                {item.text}
              </Button>
            ))}
          <IconButton
            sx={{ ml: 1 }}
            color="inherit"
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            aria-label="Alternar tema"
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 220 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton href={item.href}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}