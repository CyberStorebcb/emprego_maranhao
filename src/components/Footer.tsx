import { Box, Typography, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: 3,
        mt: 4,
        borderTop: "1px solid #eee",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Empregos Maranhão. Feito com Next.js e Material UI.
      </Typography>
      <Box mt={1}>
        <IconButton color="primary" href="#" aria-label="E-mail">
          <EmailIcon />
        </IconButton>
        <IconButton color="primary" href="#" aria-label="Instagram">
          <InstagramIcon />
        </IconButton>
        <IconButton color="primary" href="#" aria-label="LinkedIn">
          <LinkedInIcon />
        </IconButton>
      </Box>
    </Box>
  );
}