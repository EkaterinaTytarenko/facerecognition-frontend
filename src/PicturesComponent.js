import React from 'react';
import PicturesService from "./PicturesService";
import first_picture from "./first.jpg";

class PicturesComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            selectedFile:null
        }

    }

    handleFileRead = (event) => {

        event.preventDefault();


        this.state.selectedFile=event.target.files[0];

        event.target.value = null;

        if(this.state.selectedFile==null){
            alert("Couldn`t open the file.Please,upload again");
            return;
        }

        if(!this.checkPicture(this.state.selectedFile)){
            alert("Wrong format!Please,upload .jpg, .pgm or .png")
            return;
        }

        const formData = new FormData();
        formData.append('file', this.state.selectedFile);

        PicturesService.uploadPhoto(formData)
            .then(res => {
                alert(res.data.message);
                document.getElementById("imageResult").src = "data:image/img;base64," + res.data.picture;
            })

    }

    checkPicture(file){
        var ext = this.getExtension(file.name);
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'pgm':
            case 'png':
                return true;
        }
        return false;
    }

    getExtension(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }


    render (){
        return (
            <div className="container py-5">

                <header className="text-white text-center">
                    <h1 className="display-4">Добро пожаловать, друг!</h1>
                    <p className="lead mb-0">Давай посмотрим,какая тусовка собралась у нас сегодня</p>
                </header>
                <div className="image-area mt-4"><img id="imageResult" src={first_picture} alt=""
                                                      className="img-fluid rounded shadow-sm mx-auto d-block"/>
                </div>


                <div className="row py-4">
                    <div className="col-lg-6 mx-auto">

                        <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                            <input id="upload" type="file" onChange={this.handleFileRead} className="form-control border-0"/>
                            <label id="upload-label" htmlFor="upload" className="font-weight-light text-muted">Нажми,чтоб закинуть фотку</label>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}
export default PicturesComponent