import { Observable, ObservableArray, Switch } from '@nativescript/core';
import { NavigatedData, Page } from '@nativescript/core/ui/page';
import { RiveView } from '@nativescript/rive';

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  page.bindingContext = new ViewModel(args.context);
}

export class ViewModel extends Observable {
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
  constructor(options: { id: string; artboard: string; stateMachine: string; inputs: Array<{ name: string; value: boolean | number | string }>; inputValue: string; backgroundColor: string; scale: number }) {
    super();
    if (options.id.startsWith('http') || options.id.startsWith('res:')) {
      this.filename = options.id;
    } else {
      this.filename = `~/assets/rive/${options.id}.riv`;
    }
    this.artboard = options.artboard;
    this.stateMachine = options.stateMachine;
    this.inputs.splice(
      0,
      this.inputs.length,
      ...(options.inputs || []).map((i) => {
        return {
          ...i,
          inputChanged: this.inputChanged.bind(this),
        };
      })
    );
    if (options.inputs?.length) {
      const startingInput = options.inputs[0];
      this.input = startingInput.name;
      this.inputValue = startingInput.value;
    }
    this.backgroundColor = options.backgroundColor;
    if (options.scale) {
      this.scaleX = this.scaleY = options.scale;
    }
  }

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
