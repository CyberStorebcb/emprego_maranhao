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
import Link from "next/link";
import Box from "@mui/material/Box";

interface NavBarProps {
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

const NavBar: React.FC<NavBarProps> = ({ mode, setMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: "Início", icon: <HomeIcon />, href: "/" },
    { text: "Vagas", icon: <WorkIcon />, href: "/vagas" },
    { text: "Sobre", icon: <InfoIcon />, href: "/sobre" },
    { text: "Contato", icon: <ContactMailIcon />, href: "/contato" },
  ];

  return (
    <AppBar position="sticky" color="primary" elevation={2} sx={{ mb: 2 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setDrawerOpen(true)}
          sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 800,
            letterSpacing: "-1px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          🚀 Empregos Maranhão
        </Typography>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 1,
            alignItems: "center",
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              component={Link}
              href={item.href}
              startIcon={item.icon}
              sx={{
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: 99,
                px: 2,
                textTransform: "none",
                ":hover": {
                  background: "rgba(255,255,255,0.08)",
                  color: "#ff4081",
                },
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0, ml: 2 }}>
          <Button
            color="inherit"
            startIcon={mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            sx={{
              borderRadius: 99,
              px: 2,
              fontWeight: 700,
              textTransform: "none",
              fontSize: "1rem",
              ":hover": {
                background: "rgba(255,255,255,0.08)",
                color: "#ff4081",
              },
            }}
            aria-label={mode === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {mode === "dark" ? "Modo Claro" : "Modo Escuro"}
          </Button>
        </Box>
      </Toolbar>
      {/* Drawer mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;