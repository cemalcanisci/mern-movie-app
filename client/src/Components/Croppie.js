import React, { Component } from 'react';
import {
  Modal, Button, Col, Row,
} from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default class Croppie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      src: null,
      crop: {
        unit: '%',
        width: 50,
        height: 50,
      },
      croppedImage: undefined,
      fileName: null,
    };
  }

    onSelectFile = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        this.setState({ fileName: e.target.files[0].name });
        const reader = new FileReader();
        reader.addEventListener('load', () => this.setState({ src: reader.result, show: true }));
        reader.readAsDataURL(e.target.files[0]);
      }
    };

    onImageLoaded = (image) => {
      this.imageRef = image;
    };

    onCropComplete = (crop) => {
      this.makeClientCrop(crop);
    };

    onCropChange = (crop) => {
      this.setState({ crop });
    };

    getCroppedImg(image, crop, fileName) {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;

      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#fff';

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
        crop.height,
      );

      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }

          blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          let newFileName = '';
          const date = new Date();
          const name = date.getTime().toString();
          const mimeType = this.state.fileName.split('.')[1];
          newFileName += `${this.state.fileName.split('.')[0] + name}.${mimeType}`;
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            this.dataUrlToFile(reader.result, newFileName);
          };
          this.refs.file.value = null;

          resolve(this.fileUrl);
        }, 'image/jpeg');
      });
    }

    dataUrlToFile = (dataurl, filename) => {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      const croppedImage = new File([u8arr], filename, { type: mime });
      this.setState({ croppedImage });
    }

    hideModal = () => {
      this.refs.file.value = null;
      this.setState({ show: false });
    }

    addImage = () => {
      const { setFile, setNewImage } = this.props;
      const { croppedImage, croppedImageUrl } = this.state;
      setFile(croppedImage);
      setNewImage(croppedImageUrl);
      this.setState({ show: false });
    }

    async makeClientCrop(crop) {
      if (this.imageRef && crop.width && crop.height) {
        const croppedImageUrl = await this.getCroppedImg(
          this.imageRef,
          crop,
          'newFile.jpeg',
        );
        this.setState({ croppedImageUrl });
      }
    }

    render() {
      const {
        crop, croppedImageUrl, src, show,
      } = this.state;
      return (
        <div>
          <div>
            <input name="imageUpload" className="d-none" id="imageUpload" ref="file" type="file" accept="image/*" onChange={this.onSelectFile} />
            <label htmlFor="imageUpload" className="btn btn-warning m-0">Resim Seç</label>

          </div>
          <Modal
            show={show}
            onHide={() => this.setState({ show: false })}
            dialogClassName="modal-90w"
            aria-labelledby="crop-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="crop-modal">
                Lütfen Resim Seçiniz
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column justify-content-center align-items-center mb-3">
                <div className="d-flex flex-row justify-content-around w-100">
                  <Button variant="success" onClick={this.addImage}>Ekle</Button>
                  <Button variant="danger" onClick={this.hideModal}>Vazgeç</Button>
                </div>

              </div>
              <Row>
                <Col>
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
                </Col>
                <Col>
                  {croppedImageUrl && (
                  <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                  )}
                </Col>

              </Row>

            </Modal.Body>
          </Modal>

        </div>
      );
    }
}
