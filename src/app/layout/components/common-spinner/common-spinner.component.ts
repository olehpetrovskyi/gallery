import { Component, Input } from '@angular/core';

export interface SpinnerConfigInterface {
  diameter?: number;
  containerHeight?: number;
  containerWidth?: number;
  showProcessingMessage?: boolean;
}

@Component({
  selector: 'gl-common-spinner',
  templateUrl: './common-spinner.component.html',
  styleUrls: ['./common-spinner.component.scss']
})
export class CommonSpinnerComponent {
  @Input() config?: SpinnerConfigInterface;
  constructor() { }
}
