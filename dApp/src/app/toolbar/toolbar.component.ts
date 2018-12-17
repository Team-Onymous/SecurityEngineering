/**
 * Created by bryan on 4-12-2018.
 */
import { Component, Input } from '@angular/core';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'rg-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})


export class ToolbarComponent {

  @Input('navbar') navbar: any;

}
