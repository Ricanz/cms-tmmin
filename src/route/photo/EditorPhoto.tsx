import { Button, DialogActions, DialogContent, Dialog } from '@mui/material';
import { Component } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


interface PropsMain {
    dispatch: any;
    navigate: any;
    file: any;
    onFinish: any;
}
interface StateMain {
    instance: any;
}

class EditorPhoto extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            instance: null,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            // @ts-ignore
            const instance = new tui.ImageEditor(document.querySelector('#editor'), {
                includeUI: {
                    loadImage: {
                        path: this.props.file.src,
                        name: 'SampleImage',
                    },
                    // initMenu: 'filter',
                    menuBarPosition: 'left',
                },
                cssMaxWidth: 700,
                cssMaxHeight: 500,
                selectionStyle: {
                    cornerSize: 20,
                    rotatingPointOffset: 70,
                },
            });
            this.setState({ instance: instance });
        }, 1000);
    }

    render() {
        return (
            <>
                <Dialog open={true} onClose={() => true} maxWidth={false} fullScreen>
                    <DialogContent>
                        <div
                            id="editor"
                            style={{ width: "100vw", height: "100vh" }}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => {
                            const editedImage = this.state.instance.toDataURL();
                            const image = new Image();
                            image.onload = () => {
                                const canvas = document.createElement('canvas');
                                const context = canvas.getContext('2d');
                                const { width, height } = image;
                                // // console.log(width, height);

                                canvas.width = width;
                                canvas.height = height;

                                // Menggambar gambar asli ke elemen canvas
                                //@ts-ignore
                                context.drawImage(image, 0, 0, width, height);

                                // Mendapatkan data gambar dalam format JPEG dengan kualitas yang ditentukan
                                const reducedImageData = canvas.toDataURL('image/jpeg', 0.5); // Ganti 0.7 dengan nilai kualitas yang Anda inginkan (0-1)

                                this.props.onFinish(reducedImageData);
                                // const link = document.createElement('a');
                                // link.href = reducedImageData;
                                // link.download = "sample.jpg";
                                // link.click();
                                // Mengubah data gambar menjadi File baru dengan MIME type yang sesuai
                                // const reducedImageFile = this.dataURLtoFile(reducedImageData, "sample.jpg");
                            }
                            image.src = editedImage;


                        }}>SAVE</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }

    dataURLtoFile(dataURL: any, fileName: string) {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], fileName, { type: mime });
    }
}

export default (props: any): any => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <EditorPhoto
        dispatch={dispatch} navigate={navigate}
        file={props.file}
        onFinish={props.onFinish}
    />;
};



// const editedImage = this.state.instance.toDataURL().split(",")[1];
// const byteCharacters = window.atob(editedImage);
// const byteArrays = [];

// for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//     const slice = byteCharacters.slice(offset, offset + 512);

//     const byteNumbers = new Array(slice.length);
//     for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//     }

//     const byteArray = new Uint8Array(byteNumbers);
//     byteArrays.push(byteArray);
// }
// const file = new Blob(byteArrays, { type: 'image/jpeg' });

// const url = URL.createObjectURL(file);
// const link = document.createElement('a');
// link.href = url;
// link.download = "sample.jpg";
// link.click();
// URL.revokeObjectURL(url);