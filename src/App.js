import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Copyright from "./components/Copyright";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";

export default function App() {
  return (
    <Container maxWidth="md">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Copyright />
    </Container>
  );
}
