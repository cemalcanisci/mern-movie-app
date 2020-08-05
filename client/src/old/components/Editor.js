import React, { Component } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default class Editor extends Component {
    render() {
        return (
            <div>
                <h2>İçerik</h2>
                <CKEditor
                    editor={ ClassicEditor }
                    data={this.props.data}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.props.setDescrpition(data);
                    } }
                />
            </div>
        );
    }
}
