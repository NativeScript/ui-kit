import { Injectable } from '@angular/core';
import { DemoSharedRive } from '@demo/shared';

@Injectable({
  providedIn: 'root',
})
export class RiveService {
  demoShared = new DemoSharedRive();
}
