import React, { Component } from 'react'
import {Modal} from 'react-bootstrap';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
export default class Croppie extends Component {
    state = {
        show:false,
        setShow:false,
        src: null,
        // crop: {
        //     unit: "%",
        //     width: 100,
        //     aspect: 30 / 30
        // },
        crop: {
            unit: "%",
            width: 50,
            height:50
        },
        croppedImage : undefined,
        fileName : null
    };
    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            this.setState({fileName:e.target.files[0].name})
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({ src: reader.result,show:true })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
        // const width = image.width > image.height ? (image.height / image.width) * 100 : 100;
        // const height = image.height > image.width ? (image.width / image.height) * 100 : 100;
        // const x = width === 100 ? 0 : (100 - width) / 2;
        // const y = height === 100 ? 0 : (100 - height) / 2;
       
        // this.setState({
        //   crop: {
        //     unit: '%',
        //     width:50,
        //     height:50,
        //   },
        //   crop: {
        //     unit: '%',
        //     aspect: 1,
        //     width,
        //     height,
        //     x,
        //     y,
        //   },
        // });
       
        // return false; // Return false if you set crop state in here.
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);

        
    };

    onCropChange = (crop, percentCrop) => {

        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop});
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                "newFile.jpeg"
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;

        const ctx = canvas.getContext("2d");

        ctx.fillStyle = 'white';

        ctx.fillRect(0, 0, crop.width, crop.height);
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error("Canvas is empty");
                    return;
                }

                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                let newFileName = '';
                const date = new Date();
                const name = date.getTime().toString();
                  let mimeType = this.state.fileName.split('.')[1];
                  newFileName += this.state.fileName.split('.')[0] + name+'.'+mimeType;
                reader.readAsDataURL(blob)
                reader.onloadend = ()=>{
                    this.dataUrlToFile(reader.result,newFileName)
                }
                this.refs.file.value = null;

                resolve(this.fileUrl);
            }, "image/jpeg");
        });

    }
    dataUrlToFile = (dataurl, filename) => {

        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
                
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        let croppedImage = new File([u8arr], filename, {type:mime});
        this.setState({croppedImage: croppedImage }) 
    }
    hideModal = ()=>{
        this.refs.file.value = null;
        this.setState({show:false})
    }
    addImage = ()=>{
        this.props.setFile(this.state.croppedImage);
        this.props.setNewImage(this.state.croppedImageUrl);
        this.setState({show:false})
    }
    render() {
        const { crop, croppedImageUrl, src } = this.state;
        return (
            <div >
                <div>
                    <input name="imageUpload" className="d-none" id="imageUpload" ref="file" type="file" accept="image/*" onChange={this.onSelectFile} />
                    <label htmlFor="imageUpload" className="btn btn-warning m-0">Resim Seç</label>

                </div>
                <Modal
                show={this.state.show}
                onHide={() =>this.setState({show:false})}
                dialogClassName="modal-90w"
                aria-labelledby="crop-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="crop-modal">
                    Lütfen Resim Seçiniz
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {src && (
                        <ReactCrop
                            src={src}
                            crop={crop}
                            ruleOfThirds
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                        />
                    )}
                    <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex flex-row justify-content-around w-100">
                    <button className="btn btn-success" onClick={this.addImage}>Ekle</button>
                    <button className="btn btn-danger" onClick={this.hideModal}>Vazgeç</button>
                    </div>
                    {croppedImageUrl && (
                        <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
                    )}
                    </div>
                </Modal.Body>
              </Modal>

            </div>
        );
    }
}