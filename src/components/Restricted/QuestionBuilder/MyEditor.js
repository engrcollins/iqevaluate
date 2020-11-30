import React, { useState, useEffect } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import image from "suneditor/src/plugins/dialog/link";
import plugins from "suneditor/src/plugins";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const MyEditor = ({ setQuestion }) => {
  const handleChange = (content) => {
    setQuestion(content);
  };
  return (
    <div style={{ height: "100%" }}>
      <SunEditor
        height={200}
        maxHeight={200}
        placeholder="Please type here..."
        onChange={handleChange}
        setOptions={{
          plugins: plugins,
          buttonList: [
            ["undo", "redo"],
            ["formatBlock"],
            ["blockquote"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["hiliteColor"],
            "/", // Line break
            ["outdent", "indent"],
            ["align", "list"],
            ["table", "image" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin. // You must add the "imageGalleryUrl".
            /** ['imageGallery'] */ ["fullScreen", "showBlocks", "codeView"],
            ["preview", "print"],
            ["save", "template"],
            ["removeFormat"],
          ],
        }}
      />
    </div>
  );
};

export default MyEditor;
