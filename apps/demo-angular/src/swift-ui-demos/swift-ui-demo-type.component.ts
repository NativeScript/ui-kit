import { Component, computed, inject, NgZone, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoSharedSwiftUi } from '@demo/shared';
import { Page } from '@nativescript/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'demo-swift-ui-demo-type',
  templateUrl: 'swift-ui-demo-type.component.html',
})
export class SwiftUiDemoTypeComponent {
  page = inject(Page);
  activeRoute = inject(ActivatedRoute);
  demoShared: DemoSharedSwiftUi;
  title = signal<string>('');
  titleDisplay = computed(() => {
    const title = this.title();
    return title.charAt(0).toUpperCase() + title.slice(1);
  });
  textSections = [
    {
      header: 'System Fonts',
    },
    {
      header: 'Markdown',
    },
    {
      header: 'Labels',
    },
  ];
  textItems = [
    {
      section: 0,
      label: 'Body',
      modifiers: [{ font: 'body' }],
    },
    {
      section: 0,
      label: 'Callout',
      modifiers: [{ font: 'callout' }],
    },
    {
      section: 0,
      label: 'Caption',
      modifiers: [{ font: 'caption' }],
    },
    {
      section: 0,
      label: 'Caption 2',
      modifiers: [{ font: 'caption2' }],
    },
    {
      section: 0,
      label: 'Footnote',
      modifiers: [{ font: 'footnote' }],
    },
    {
      section: 0,
      label: 'Headline',
      modifiers: [{ font: 'headline' }],
    },
    {
      section: 0,
      label: 'Large Title',
      modifiers: [{ font: 'largeTitle' }],
    },
    {
      section: 0,
      label: 'Subheadline',
      modifiers: [{ font: 'subheadline' }],
    },
    {
      section: 0,
      label: 'Title',
      modifiers: [{ font: 'title' }],
    },
    {
      section: 0,
      label: 'Title 2',
      modifiers: [{ font: 'title2' }],
    },
    {
      section: 0,
      label: 'Title 3',
      modifiers: [{ font: 'title3' }],
    },
    {
      section: 1,
      label: '**Bold**',
    },
    {
      section: 1,
      label: '*Italic*',
    },
    {
      section: 1,
      label: '[Link](https://www.google.com)',
    },
    {
      section: 1,
      label: '`Code`',
    },
    {
      section: 1,
      label: '~~Strikethrough~~',
    },
  ];
  listSectionsInset = [
    {
      header: 'Section One',
      footer: 'This is a footer',
      children: [
        {
          title: 'Some Content',
        },
      ],
    },
    {
      header: 'Section Two',
      footer: 'This is a footer',
      children: [
        {
          title: 'Some Content',
        },
      ],
    },
    {
      header: 'Section Three',
      footer: 'This is a footer',
      children: [
        {
          title: 'Some Content',
        },
      ],
    },
  ];
  colorSection = [
    {
      header: 'Colors',
    },
  ];
  colorItems = [
    {
      label: 'Blue',
      color: 'blue',
    },
    {
      label: 'Green',
      color: 'green',
    },
    {
      label: 'Indigo',
      color: 'indigo',
    },
    {
      label: 'Orange',
      color: 'orange',
    },
    {
      label: 'Pink',
      color: 'pink',
    },
    {
      label: 'Purple',
      color: 'purple',
    },
    {
      label: 'Red',
      color: 'red',
    },
    {
      label: 'Teal',
      color: 'teal',
    },
    {
      label: 'Yellow',
      color: 'yellow',
    },
    {
      label: 'AccentColor',
      color: 'accentColor',
    },
    {
      label: 'Primary',
      color: 'primary',
    },
    {
      label: 'Secondary',
      color: 'secondary',
    },
    {
      label: 'Brown',
      color: 'brown',
    },
    {
      label: 'White',
      color: 'white',
    },
    {
      label: 'Black',
      color: 'black',
    },
    {
      label: 'Cyan',
      color: 'cyan',
    },
    {
      label: 'Mint',
      color: 'mint',
    },
    {
      label: 'Clear',
      color: 'clear',
    },
  ];
  buttonSection = [
    {
      header: 'Button',
    },
  ];
  buttonItems = [
    {
      labelTitle: 'hello world',
      systemImage: 'moon.circle',
      buttonModifiers: [
        {
          buttonStyle: 'bordered',
        },
        { padding: 8 },
      ],
      labelModifiers: [
        {
          bold: true,
        },
        {
          padding: true,
        },
      ],
    },
    {
      buttonTitle: 'Bordered',
      buttonModifiers: [
        {
          buttonStyle: 'bordered',
        },
        { padding: 8 },
      ],
    },
    {
      buttonTitle: 'Borderless',
      buttonModifiers: [
        {
          buttonStyle: 'borderless',
        },
        { padding: 8 },
      ],
    },
    {
      buttonTitle: 'Bordered Prominent',
      buttonModifiers: [
        {
          buttonStyle: 'borderedProminent',
        },
        { padding: 8 },
      ],
    },
    {
      buttonTitle: 'Plain',
      buttonModifiers: [
        {
          buttonStyle: 'plain',
        },
        { padding: 8 },
      ],
    },
    {
      buttonTitle: 'List Row',
      buttonModifiers: [{ padding: 8 }],
    },
  ];
  shapeSection = [
    {
      header: 'Shapes',
    },
  ];
  shapeItems = [
    {
      type: 'Rectangle',
      label: 'Rectangle',
      fill: 'pink',
    },
    {
      type: 'RoundedRectangle',
      label: 'Rounded Rectangle',
      fill: 'blue',
      cornerRadius: 10,
    },
    {
      type: 'Circle',
      label: 'Circle',
      fill: 'yellow',
      stroke: {
        color: 'orange',
        lineWidth: 5,
      },
    },
    {
      type: 'Capsule',
      label: 'Capsule',
      fill: 'indigo',
      frame: {
        width: 50,
        height: 30,
      },
    },
    {
      type: 'Ellipse',
      label: 'Ellipse',
      fill: 'mint',
      frame: {
        width: 50,
        height: 30,
      },
    },
    {
      type: 'UnevenRoundedRectangle',
      label: 'Uneven Rounded Rectangle',
      fill: 'green',
      cornerRadii: {
        topLeading: 10,
        topTrailing: 20,
        bottomLeading: 5,
        bottomTrailing: 0,
      },
      frame: {
        width: 30,
        height: 30,
      },
    },
  ];

  constructor() {
    this.activeRoute.params.pipe(takeUntilDestroyed()).subscribe((params) => {
      console.log('params:', params);
      if (params.id) {
        this.title.set(params.id);
      }
    });
    this.page.on('loaded', (args) => {
      if (__IOS__) {
        const navigationController: UINavigationController = this.page.frame.ios.controller;
        navigationController.navigationBar.prefersLargeTitles = true;
      }
    });
    this.colorItems = this.colorItems.map((i) => {
      return {
        ...i,
        modifiers: [
          { frame: { width: 25, height: 25 } },
          {
            clipShape: 'circle',
          },
          {
            shadow: {
              color: i.color === 'white' ? 'gray' : i.color,
              radius: 3,
              x: 0,
              y: 1,
            },
          },
        ],
      };
    });
  }

  ngOnInit() {
    this.demoShared = new DemoSharedSwiftUi();
  }

  buttonTap() {
    console.log('buttonTap');
  }
}
