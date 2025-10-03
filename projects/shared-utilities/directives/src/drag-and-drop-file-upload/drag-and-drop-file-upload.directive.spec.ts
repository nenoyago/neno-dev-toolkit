import { DragDropFileUploadDirective } from './drag-and-drop-file-upload.directive';

describe('DragAndDropFileUploadDirective', () => {
  it('create an instance', () => {
    const pipe = new DragDropFileUploadDirective();
    expect(pipe).toBeTruthy();
  });
});
