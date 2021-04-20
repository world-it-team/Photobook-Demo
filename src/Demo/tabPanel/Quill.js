import React,{ useRef, useEffect} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@material-ui/core/Button";
import html2canvas from "html2canvas"
import {Image} from "react-konva"

export default function Quill({onChangeText}) {
  const [editText, setEditText] = React.useState("");
  const qref = useRef()
  

  const saveText = () => {
    let content = document.querySelector('.ql-editor')
    html2canvas(content, {
      backgroundColor: 'rgba(0,0,0,0)'
    }).then((canvas) => {
     const image = canvas.toDataURL("image/png");
     onChangeText(image)
  })
  
  }

 // onChange(content, delta, source, editor,comments) {
        //   const text = editor.getText(content);
        //   this.setState ({ content: text });
        //   console.log(text);
        //   console.log(editor.getContents())
        //   const con = editor.getContents();
        //   //const test = editor.setContents(delta);
        //   //this.setState({comments: con})
        //   // console.log(editor.getFormat());  
        // }
  
        // onChange(html) {
        //   this.setState ({ content: html });
        //     console.log(html)
        //   }

        // on= ('text-change', function(delta, oldDelta, source) {
        //   if (source == 'api') {
        //     console.log(delta);
        //   // } else if (source == 'user') {
        //   //   console.log("A user action triggered this change.");
        //   //}
        // }});
    
  useEffect(() =>{
   
  
  },[])

  return (
    <div id="edit-text">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={setEditText}
        value={editText}
        bound ={'#edit-text'}
        ref = {qref}
      />
      <Button variant="contained" color="primary" style={{ marginTop: 10 }} onClick={saveText}>
        Add Text
      </Button>
    </div>
  );
}

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", "normal", "large", "huge"] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "color",
  "background",
  "clean",
];