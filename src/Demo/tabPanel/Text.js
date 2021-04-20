// import React from "react";
// // import { render } from "react-dom";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// // import Display from './Display';




// class Editor extends React.Component {

//   constructor (props) {
//     super(props)

//     console.log(props);
//     this.modules = {
//             toolbar: [
//               [{ 'font': [] }],
//               [{ 'size': ['small', false, 'large', 'huge'] }],
//               ['bold', 'italic', 'underline'],
//               [{'list': 'ordered'}, {'list': 'bullet'}],
//               [{ 'align': [] }],
//               [{ 'color': [] }, { 'background': [] }],
//               ['clean']
//             ]
//         };

//         this.formats = [
//             'font',
//             'size',
//             'bold', 'italic', 'underline',
//             'list', 'bullet',
//             'align',
//             'color', 'background'
//       ];

//     this.state = { editorHtml: '' ,
//       content:'', comments:''
//       } 
//       this.rteChange = this.rteChange.bind(this);
//       this.onChange = this.onChange.bind(this);


//   }

//   handleChange = (text) =>{

//     this.setState({editorHtml: text})
//     this.props.onTextSubmit(text);

//   }
//     // onChange(content, delta, source, editor,comments) {
//     //   const text = editor.getText(content);
//     //   this.setState ({ content: text });
//     //   console.log(text);
//     //   console.log(editor.getContents())
//     //   const con = editor.getContents();
//     //   //const test = editor.setContents(delta);
//     //   //this.setState({comments: con})
//     //   // console.log(editor.getFormat());  
//     // }

//     onChange(html) {
//       this.setState ({ content: html });
//         console.log(html)
//       }

//     on= ('text-change', function(delta, oldDelta, source) {
//       if (source == 'api') {
//         console.log(delta);
//       // } else if (source == 'user') {
//       //   console.log("A user action triggered this change.");
//       //}
//     }});

//   render () {
//     return (
//       <div>

//         <ReactQuill 
//           ref='editor'
//           theme="snow"  modules={this.modules}
//           formats={this.formats} 
//           test={this.test}
//           onChangeSelection={this.onChangeSelection}
//           onChange={this.onChange}
//           //value={this.state.comments || ''}
//           placeholder={this.props.placeholder}
//           test2={this.test2}

//          />
//   {/* <div  ><input type="text" name="name"  onChange={(e) => this.handleChange(e.target.value)}
//             value={this.state.editorHtml}/>{this.state.comments} </div> */}

//            <div dangerouslySetInnerHTML={{__html: this.state.content}}></div>
//        </div>

//      )
//   }

// }


// export default Editor;  