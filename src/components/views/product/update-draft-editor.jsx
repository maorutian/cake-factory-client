import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import _ from 'lodash';

export default class UpdateDraftEditor extends Component {

  static propTypes = {
    detail: PropTypes.string
  };

  state = {
    editorState: EditorState.createEmpty(),

  };

  //add-update passes detail
  componentWillMount() {
    const detail = this.props.detail;
    if (detail) {
      let editorState = this.createEditorState(detail);
      this.setState({editorState})
    }
  }

  //no detail to pass from add-update
  componentWillReceiveProps(nextProps) {
    //console.log(this.props.detail, nextProps.detail);
    if (nextProps.detail !== this.props.detail) {
      const detail = nextProps.detail;
      if (detail) {
        let editorState = this.createEditorState(detail);
        this.setState({editorState});
      }
    }

  }

  //create editorState
  createEditorState = (detail) => {
    let contentBlock = htmlToDraft(detail);
    let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  //pass to parent compont
  getDetail = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

  onEditorStateChange = _.debounce((editorState) => {
    this.setState({
      editorState,
    })
  }, 100);

  render() {
    const {editorState} = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{height: 200, border: '1px solid black', paddingLeft: 10}}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

