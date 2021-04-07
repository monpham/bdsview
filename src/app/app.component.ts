import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo';

  constructor(
    private router: Router,
  ) {
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

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
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
        // this.createNode('node14', 'view360.panoviewer.pkgd.min.js');
        // this.createNode('node15', 'pano2vr_player.js');
        // this.createNode('node16', 'skin.js');
      }
    });
  }
}
