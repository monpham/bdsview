export class UploadAdapter {
    private loader;

    constructor(loader: any) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(
            file => new Promise((resolve, reject) => {
                let myReader = new FileReader();
                myReader.onload = (e) => {
                    resolve({default: myReader.result});
                };
                myReader.readAsDataURL(file);
            })
        );
    }

}
