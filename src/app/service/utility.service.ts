import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  public getFile(file: string): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', file + '?v=' + Math.random(), true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          if (xhr.readyState === 4) {
            resolve();
          }
        }
      };
      xhr.send();
    });
    return promise
  }

  constructor() {
  }
}
