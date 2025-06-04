"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Typography, Box, Button, Fade, Grow, Stack } from "@mui/material";

const vagasDestaque = [
	{
		id: 1,
		titulo: "Auxiliar Administrativo",
		empresa: "Empresa XYZ",
		cidade: "São Luís/MA",
		salario: "R$ 1.500,00",
		tipo: "CLT",
	},
	{
		id: 2,
		titulo: "Desenvolvedor Front-end",
		empresa: "Tech Maranhão",
		cidade: "Imperatriz/MA",
		salario: "R$ 3.200,00",
		tipo: "CLT",
	},
	{
		id: 3,
		titulo: "Estágio em RH",
		empresa: "RH Mais",
		cidade: "Caxias/MA",
		salario: "R$ 900,00",
		tipo: "Estágio",
	},
];

export default function HomePage() {
	return (
		<div className={styles.pageBg}>
			<NavBar mode="light" setMode={() => {}} />
			<Box
				sx={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
				}}
			>
				{/* Banner e chamada */}
				<Box
					textAlign="center"
					sx={{
						mx: "auto",
						width: "100%",
						maxWidth: 700,
						background: "#fff",
						borderRadius: { xs: 3, sm: 5 },
						boxShadow: "0 4px 24px rgba(25, 118, 210, 0.12)",
						p: { xs: 2.5, sm: 5 },
						mt: { xs: 2, sm: 6 },
						mb: { xs: 2, sm: 4 },
					}}
				>
					<Typography
						variant="h3"
						fontWeight={900}
						gutterBottom
						sx={{
							color: "#1976d2",
							letterSpacing: "-1px",
							mb: 1,
							fontSize: { xs: "1.7rem", sm: "2.5rem" },
							textShadow: "0 2px 8px rgba(25,118,210,0.08)",
						}}
					>
						Encontre o emprego dos seus sonhos no Maranhão!
					</Typography>
					<Fade in timeout={800}>
						<Typography
							variant="body1"
							color="text.secondary"
							mb={3}
							sx={{
								fontSize: { xs: "1.08rem", sm: "1.18rem" },
								maxWidth: 500,
								mx: "auto",
							}}
						>
							Mais de{" "}
							<b style={{ color: "#1976d2" }}>500 vagas</b> abertas esperando
							por você. Cadastre seu currículo e conquiste sua próxima
							oportunidade!
						</Typography>
					</Fade>
					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={2}
						justifyContent="center"
						alignItems="center"
						sx={{ mb: 2 }}
					>
						<Grow in timeout={1000}>
							<Button
								component={Link}
								href="/vagas"
								variant="contained"
								color="primary"
								size="large"
								sx={{
									fontWeight: 700,
									fontSize: { xs: "1rem", sm: "1.1rem" },
									px: { xs: 3, sm: 4 },
									py: { xs: 1.2, sm: 1.5 },
									borderRadius: 99,
									boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
									background:
										"linear-gradient(90deg, #1976d2 60%, #00eaff 100%)",
									transition: "all 0.3s",
									":hover": {
										background:
											"linear-gradient(90deg, #ff4081 0%, #1976d2 100%)",
										color: "#fff",
										transform: "scale(1.04)",
									},
								}}
							>
								Ver vagas disponíveis
							</Button>
						</Grow>
						<Grow in timeout={1200}>
							<Button
								component={Link}
								href="/cadastrar"
								variant="outlined"
								color="primary"
								size="large"
								sx={{
									fontWeight: 700,
									fontSize: { xs: "1rem", sm: "1.1rem" },
									px: { xs: 3, sm: 4 },
									py: { xs: 1.2, sm: 1.5 },
									borderRadius: 99,
									borderWidth: 2,
									":hover": {
										borderColor: "#ff4081",
										color: "#ff4081",
									},
								}}
							>
								Quero cadastrar meu currículo
							</Button>
						</Grow>
					</Stack>
				</Box>

				{/* Vagas em destaque */}
				<Box
					sx={{
						mx: "auto",
						width: "100%",
						maxWidth: 700,
						mb: { xs: 2, sm: 4 },
						px: { xs: 0.5, sm: 1 },
					}}
				>
					<Typography
						variant="h5"
						fontWeight={800}
						color="#1976d2"
						mb={2}
						sx={{ fontSize: { xs: "1.15rem", sm: "1.35rem" } }}
					>
						Vagas em Destaque
					</Typography>
					<Stack
						direction="column"
						spacing={2}
						justifyContent="center"
						alignItems="stretch"
					>
						{vagasDestaque.map((vaga) => (
							<Fade in timeout={700 + vaga.id * 200} key={vaga.id}>
								<Box
									sx={{
										background: "#f5faff",
										borderRadius: 3,
										boxShadow: "0 1px 8px rgba(25, 118, 210, 0.10)",
										p: { xs: 1.5, sm: 2 },
										minWidth: 120,
										textAlign: "left",
										borderLeft: "4px solid #1976d2",
									}}
								>
									<Typography
										fontWeight={700}
										fontSize={{ xs: "1.05rem", sm: "1.15rem" }}
									>
										{vaga.titulo}
									</Typography>
									<Typography
										fontSize={{ xs: "0.97rem", sm: "1rem" }}
										color="text.secondary"
									>
										{vaga.empresa}
									</Typography>
									<Typography
										fontSize={{ xs: "0.93rem", sm: "0.98rem" }}
										color="primary"
									>
										{vaga.cidade}
									</Typography>
									<Typography
										fontSize="0.93rem"
										color="success.main"
										sx={{ mb: 1 }}
									>
										{vaga.salario} | {vaga.tipo}
									</Typography>
									<Button
										component={Link}
										href={`/vagas/${vaga.id}`}
										variant="contained"
										color="primary"
										size="small"
										fullWidth
										sx={{
											mt: 1,
											borderRadius: 99,
											fontWeight: 600,
											px: 2,
											fontSize: { xs: "0.95rem", sm: "1rem" },
										}}
										aria-label={`Ver detalhes da vaga de ${vaga.titulo}`}
									>
										Ver vaga
									</Button>
								</Box>
							</Fade>
						))}
					</Stack>
					<Button
						component={Link}
						href="/vagas"
						variant="outlined"
						color="primary"
						size="medium"
						fullWidth
						sx={{
							mt: 3,
							borderRadius: 99,
							fontWeight: 600,
							px: 2,
							fontSize: { xs: "1rem", sm: "1.05rem" },
							borderWidth: 2,
							":hover": {
								borderColor: "#ff4081",
								color: "#ff4081",
							},
						}}
					>
						Ver todas as vagas
					</Button>
				</Box>

				<Box sx={{ mt: "auto" }}>
					<Footer />
				</Box>
			</Box>
		</div>
	);
}
