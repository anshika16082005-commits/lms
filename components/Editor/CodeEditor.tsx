"use client";
import Editor from "@monaco-editor/react";
import { useState } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState("");

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };
  return (
    <div>
      <Editor
        height="90vh"
        language="python"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        defaultValue="// write your code here"
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 16,
          autoIndent: "full",
          formatOnType: true,
          formatOnPaste: true,
          automaticLayout: true,
        }}
      />
    </div>
  );
};
export default CodeEditor;
