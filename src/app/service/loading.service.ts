import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() {
  }

  createNode(nodeName: string, scriptName: string) {
    if (document.getElementById(nodeName) != null) {
      document.getElementById(nodeName).remove();
    }
    const node = document.createElement('script');
    node.src = 'assets/js/' + scriptName;
    node.type = 'text/javascript';
    node.async = false;
    node.id = nodeName;
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  reloadJs() {
    this.createNode('node1', 'jquery-3.3.1.min.js');
    this.createNode('node2', 'bootstrap.min.js');
    this.createNode('node3', 'jquery.magnific-popup.min.js');
    this.createNode('node4', 'mixitup.min.js');
    this.createNode('node5', 'jquery-ui.min.js');
    this.createNode('node6', 'jquery.nice-select.min.js');
    this.createNode('node7', 'jquery.slicknav.js');
    this.createNode('node8', 'owl.carousel.min.js');
    this.createNode('node9', 'jquery.richtext.min.js');
    this.createNode('node10', 'image-uploader.min.js');
    this.createNode('node11', 'main.js');
    this.createNode('node12', 'jquery.min.js');
    this.createNode('node13', 'three/three.min.js');
  }
}
