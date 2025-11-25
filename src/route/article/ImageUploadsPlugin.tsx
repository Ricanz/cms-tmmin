import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class ImageUploadsPlugin extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('imageUploads', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Hello World',
                icon: 'path-to-your-icon.svg', // Pastikan Anda memiliki ikon SVG yang siap digunakan
                tooltip: true
            });

            // Callback yang akan dieksekusi saat button diklik
            view.on('execute', () => {
                editor.model.change(writer => {
                    editor.model.insertContent(writer.createText('Hello World'), editor.model.document.selection);
                });
            });

            return view;
        });
    }
}
