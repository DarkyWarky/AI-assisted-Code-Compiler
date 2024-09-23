import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import { LanguageContext } from "../utils/LanguageContext";

const Compiler = ({ code }) => {
  const [output, setOutput] = useState("");
  const { language } = useContext(LanguageContext);

  const handleCompile = async () => {
    const languageMap = {
      javascript: "nodejs",
      python: "python3",
      cpp: "cpp17",
      java: "java",
    };

    try {
      const response = await axios.post("http://localhost:5000/execute", {
        script: code,
        language: languageMap[language],
        versionIndex: "0",
      });

      console.log('Response from server:', response.data);

      const { output, statusCode, memory, cpuTime, isCompiled, isExecutionSuccess } = response.data;
      if (statusCode === 200 && isExecutionSuccess && isCompiled) {
        setOutput(`Output:\n${output}\nMemory: ${memory}\nCPU Time: ${cpuTime}`);
      } else {
        setOutput(`Error compiling code: ${response.data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setOutput(`Error compiling code: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCompile}>
        Compile & Run
      </Button>
      <Typography variant="h6">Output:</Typography>
      <TextField
        multiline
        rows={10}
        variant="outlined"
        fullWidth
        value={output}
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
};

export default Compiler;
