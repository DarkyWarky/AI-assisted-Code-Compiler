import React, { useContext } from "react";
import MonacoEditor from "@monaco-editor/react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LanguageContext } from "../utils/LanguageContext";

const Editor = ({ code, setCode }) => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "4px", marginBottom: "20px" }}>
      <FormControl fullWidth>
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          value={language}
          label="Language"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="cpp">C++</MenuItem>
          <MenuItem value="java">Java</MenuItem>
        </Select>
      </FormControl>
      <MonacoEditor
        height="500px"
        defaultLanguage={language}
        defaultValue={code}
        theme="vs-dark"
        onChange={(value) => setCode(value)}
      />
    </div>
  );
};

export default Editor;
