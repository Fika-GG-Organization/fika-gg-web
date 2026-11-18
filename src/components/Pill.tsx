import { Box } from "@mui/material";
export default function Pill({ text }: { text: string }) {
    return (
      <Box
        sx={{
          ml: "auto",
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          px: 1.5,
          py: 0.5,
          border: "1px solid #d0d5dd",
          borderRadius: 999,
          bgcolor: "#f2f4f7",
          color: "#344054",
          fontSize: "0.875rem",
          fontWeight: 600,
          lineHeight: 1.4,
          whiteSpace: "nowrap",
        }}
      >
        {text.trim()}
      </Box>
    );
}