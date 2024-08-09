import { Component, inject, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DemoSharedRive } from '@demo/shared';
import { RouterExtensions } from '@nativescript/angular';
import { RiveView } from '@nativescript/rive';
import { ObservableArray, Switch } from '@nativescript/core';
import { RiveService } from './rive.service';

@Component({
  selector: 'demo-rive-demos',
  templateUrl: 'rive-demos.component.html',
})
export class RiveDemosComponent {
  router = inject(RouterExtensions);
  activeRoute = inject(ActivatedRoute);
  riveService = inject(RiveService);
  demoShared: DemoSharedRive;

  constructor(private _ngZone: NgZone) {
    this.demoShared = this.riveService.demoShared;
    this.activeRoute.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
      const options = params;
      console.log('options:', options);
      if (options.id.startsWith('http') || options.id.startsWith('res:')) {
        this.filename = options.id;
      } else {
        this.filename = `~/assets/rive/${options.id}.riv`;
      }
      this.artboard = options.artboard;
      this.stateMachine = options.stateMachine;
      this.inputs = this.demoShared.currentInputs;
      console.log('this.inputs:', this.inputs);
      if (this.inputs) {
        this.inputs.splice(
          0,
          this.inputs.length,
          ...(this.inputs || []).map((i) => {
            console.log('i:', i);
            console.log('typeof i:', typeof i);
            return {
              ...i,
              inputChanged: this.inputChanged.bind(this),
            };
          })
        );
      }
      if (this.inputs?.length) {
        const startingInput = this.inputs[0];
        this.input = startingInput.name;
        this.inputValue = startingInput.value;
      }
      this.backgroundColor = options.backgroundColor;
      if (options.scale) {
        this.scaleX = this.scaleY = Number(options.scale);
      }
    });
  }

  riveView: RiveView;
  filename: string;
  artboard: string;
  stateMachine: string;
  inputs: ObservableArray<{ name: string; value: boolean | number | string }> = new ObservableArray([]);
  input: string;
  inputValue: boolean | number | string;
  backgroundColor: string;
  scaleX = 1;
  scaleY = 1;

  onStateChanged(args) {
    console.log('onStateChanged');
  }

  ready = false;
  // toggleInput() {
  //   if (typeof this.inputValue === 'boolean') {
  //     this.inputValue = !this.inputValue;
  //   } else {
  //     this.riveView.triggerInput(this.input)
  //   }
  //   this.notifyPropertyChange('inputValue', this.inputValue);
  // }

  inputChanged(args) {
    console.log(args.object.id);
    this.input = args.object.id;
    if (this.riveView) {
      console.log('(args.object as Switch).checked:', (args.object as Switch).checked);
      this.riveView.triggerInputValue(this.input, (args.object as Switch).checked);
    }
  }

  loadedPlayer(args) {
    this.riveView = args.object;
  }
}
