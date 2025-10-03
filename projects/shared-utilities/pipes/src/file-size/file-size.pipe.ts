import { Pipe, PipeTransform } from '@angular/core';

import { formatBytes } from '@nenoyago/common-utilities';

@Pipe({
  name: 'fileSize',
  standalone: true
})
export class FileSizePipe implements PipeTransform {
  transform(file: File): string {
    if (!file) {
      return '';
    }

    return formatBytes(file.size);
  }
}
