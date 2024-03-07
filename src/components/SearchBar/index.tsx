"use client";
// Material UI
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { Search } from "@mui/icons-material";

// Interfaces
import { SearchBarProps } from "./interfaces";

/**
 * Exibe uma barra de busca.
 * @param placeHolder texto para ser exibido quando o conteúdo da barra de pesquisa é vazio.
 * @param value Valor do campo da barra de busca.
 * @param setValue Setter do valor do campo da barra de busca.
 * @returns Componente de barra de pesquisa.
 */
const SearchBar = ({ placeHolder, value, setValue }: SearchBarProps) => {
  return (
    <TextField
      InputLabelProps={{
        style: {
          fontSize: "1rem",
          fontFamily: "'Helvetica','Arial',sans-serif",
        },
      }}
      InputProps={{
        style: {
          display: "flex",
          borderRadius: "10px",
          height: "2.8rem",
          alignItems: "center",
        },
      }}
      label={placeHolder}
      variant="outlined"
      fullWidth
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      id="search"
      name="search"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .MuiInputLabel-outlined": {
          transform: "translate(14px, 10px) scale(1)",
        },
        "& .MuiInputLabel-shrink": {
          transform: "translate(14px, -8px) scale(0.75)",
        },
      }}
    />
  );
};

export default SearchBar;
