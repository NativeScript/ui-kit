import { Application, Http, ImageSource } from '@nativescript/core';
import { registerWidgetListener, LinearLayout, ImageView, Image, Button, VStack, List, Text, updateWidget, Root, HStack, ButtonView, Flipper, Chronometer, Clock, Grid, ProgressBar, Stack, Spacer, Switch, CheckBox, RadioButton } from '@nativescript/widgets';
// uncomment to test Flutter
// import { init } from '@nativescript/flutter';
// init();

// uncomment to test Ionic Portals
// import { IonicPortalManager } from '@nativescript/ionic-portals';
// IonicPortalManager.configureLiveUpdates('ionicWebPortalSample', {
//     appId: 'e29e2c2e',
//     channel: 'production',
//     syncOnAdd: true
// })

// Application.on(Application.launchEvent, () => {
// 	// Register IonicPortals
// 	IonicPortalManager.register('<portal-api-key>');
// });

// 1. Countdown timer widget
function countdownWidget(provider: string, ids: number[]) {
  const targetTime = Date.now() + 3600000; // 1 hour from now
  const root = Root(() =>
    VStack(() => [
      Text('⏱️ Countdown').setColor('#1a1a2e').setTextSize(18),
      Spacer(12),
      Chronometer({
        targetTime: targetTime, // Use targetTime for Unix timestamps
        countDown: true,
        started: true,
      })
        .setColor('#e74c3c')
        .setTextSize(32),
      Spacer(8),
      Text('until deadline').setColor('#6c757d').setTextSize(12),
    ]),
  )
    .setBackgroundColor('#ffffff')
    .setPadding(16);
  for (const id of ids) updateWidget(provider, root, id);
}

// 2. Clock widget
function clockWidget(provider: string, ids: number[]) {
  const root = Root(() => VStack(() => [Text('🕐 Current Time').setColor('#ecf0f1').setTextSize(14), Spacer(12), Clock({ color: '#3498db' }).setTextSize(42), Spacer(8), Text('Local timezone').setColor('#7f8c8d').setTextSize(11)]))
    .setBackgroundColor('#1a1a2e')
    .setPadding(16);
  for (const id of ids) updateWidget(provider, root, id);
}

// 3. Progress indicator
function progressWidget(provider: string, ids: number[]) {
  const root = Root(() => VStack(() => [HStack(() => [Text('⬇️ Downloading').setColor('#2c3e50').setTextSize(16), Spacer(), Text('65%').setColor('#27ae60').setTextSize(16)]), Spacer(12), ProgressBar({ progress: 65, max: 100 }), Spacer(8), Text('file_backup.zip • 650 MB / 1 GB').setColor('#7f8c8d').setTextSize(11)]))
    .setBackgroundColor('#ffffff')
    .setPadding(16);
  for (const id of ids) updateWidget(provider, root, id);
}

// 4. List with click handlers
function listWidget(provider: string, ids: number[]) {
  const items = [
    { icon: '📥', name: 'Inbox', count: 12 },
    { icon: '⭐', name: 'Starred', count: 3 },
    { icon: '📤', name: 'Sent', count: 0 },
    { icon: '📝', name: 'Drafts', count: 2 },
    { icon: '🗑️', name: 'Trash', count: 0 },
  ];
  const root = Root(() =>
    VStack(() => [
      Text('📧 Mail').setColor('#2c3e50').setTextSize(18),
      Spacer(8),
      List(
        items.length,
        (index) => HStack(() => [Text(`${items[index].icon} ${items[index].name}`).setColor('#34495e').setTextSize(14), Spacer(), items[index].count > 0 ? Text(`${items[index].count}`).setColor('#3498db').setTextSize(12) : Text('').setTextSize(12)]).setMargin(4, 8, 4, 8),
        () => Text('No folders').setColor('#95a5a6'),
      ),
    ]),
  )
    .setBackgroundColor('#ffffff')
    .setPadding(12);
  for (const id of ids) updateWidget(provider, root, id);
}

// 5. Image flipper/slideshow
async function slideshowWidget(provider: string, ids: number[], loadImages = false) {
  const imageUrls = ['https://picsum.photos/seed/1/400/300', 'https://picsum.photos/seed/2/400/300', 'https://picsum.photos/seed/3/400/300', 'https://picsum.photos/seed/4/400/300'];

  const images = loadImages ? await Promise.all(imageUrls.map((url) => ImageSource.fromUrl(url))) : imageUrls;

  const root = Root(() => VStack(() => [Text('📷 Gallery').setColor('#ffffff').setTextSize(16), Spacer(8), Flipper(images as never[], 3000, (src) => Image(src)), Spacer(8), Text('Auto-advances every 3s').setColor('#adb5bd').setTextSize(11)]))
    .setBackgroundColor('#2c3e50')
    .setPadding(12);

  for (const id of ids) updateWidget(provider, root, id);
}

// 6. Grid layout
function gridWidget(provider: string, ids: number[]) {
  const actions = [
    { icon: '📞', label: 'Call', color: '#3498db', bg: '#ebf5fb' },
    { icon: '💬', label: 'Message', color: '#9b59b6', bg: '#f5eef8' },
    { icon: '📧', label: 'Email', color: '#e74c3c', bg: '#fdedec' },
    { icon: '📅', label: 'Calendar', color: '#27ae60', bg: '#eafaf1' },
    { icon: '📷', label: 'Camera', color: '#f39c12', bg: '#fef9e7' },
    { icon: '🎵', label: 'Music', color: '#e91e63', bg: '#fce4ec' },
  ];

  const root = Root(() =>
    VStack(() => [
      HStack(() => [Text('⚡ Quick Actions').setColor('#1a1a2e').setTextSize(18), Spacer(), Text('6 apps').setColor('#95a5a6').setTextSize(12)]),
      Spacer(16),
      Grid(3, 12, () =>
        actions.map((action) =>
          VStack(() => [
            VStack(() => [Text(action.icon).setTextSize(28), Spacer(6), Text(action.label).setColor(action.color).setTextSize(11)])
              .setBackgroundColor(action.bg)
              .setPadding(12),
            Spacer(4),
          ]),
        ),
      ),
    ]),
  )
    .setBackgroundColor('#ffffff')
    .setPadding(16);
  for (const id of ids) updateWidget(provider, root, id);
}

// 6b. Toggle widget (single Switch)
function toggleWidget(provider: string, ids: number[]) {
  const root = Root(() => VStack(() => [HStack(() => [Text('🔔 Notifications').setTextSize(16), Spacer(), Text('On').setTextSize(12)]), Spacer(12), HStack(() => [Text('Push alerts').setTextSize(14), Spacer(), Switch(true)]), Spacer(8), Text('Tap the switch to toggle').setColor('#95a5a6').setTextSize(11)]))
    .setBackgroundColor('#ffffff')
    .setPadding(12);

  for (const id of ids) updateWidget(provider, root, id);
}

// 6c. Checklist widget (multiple checkboxes)
function checklistWidget(provider: string, ids: number[]) {
  const items = [
    { label: 'Buy groceries', checked: true },
    { label: 'Send invoices', checked: false },
    { label: 'Workout', checked: false },
  ];

  const root = Root(() => VStack(() => [Text('🗒️ Today').setTextSize(18), Spacer(8), ...items.map((it) => HStack(() => [CheckBox(it.checked).onCheck('toggle', { label: it.label }), Spacer(8), Text(it.label).setTextSize(14)]).setMargin(6, 8, 6, 8))]))
    .setBackgroundColor('#ffffff')
    .setPadding(12);

  for (const id of ids) updateWidget(provider, root, id);
}

// 6d. Radio group widget (select one)
function radioWidget(provider: string, ids: number[]) {
  const options = [
    { label: 'Home', checked: true },
    { label: 'Work', checked: false },
    { label: 'Travel', checked: false },
  ];

  const root = Root(() => VStack(() => [Text('📍 Mode').setTextSize(18), Spacer(8), ...options.map((opt) => HStack(() => [RadioButton(opt.checked), Spacer(8), Text(opt.label).setTextSize(14)]).setMargin(6, 6, 6, 6))]))
    .setBackgroundColor('#ffffff')
    .setPadding(12);

  for (const id of ids) updateWidget(provider, root, id);
}

// 7. StackView (swipeable cards)
function stackWidget(provider: string, ids: number[]) {
  const cards = [
    { title: 'Meeting Notes', subtitle: 'Project sync @ 2pm', color: '#3498db' },
    { title: 'Shopping List', subtitle: '5 items remaining', color: '#e74c3c' },
    { title: 'Workout Plan', subtitle: 'Leg day tomorrow', color: '#27ae60' },
  ];
  const root = Root(() =>
    VStack(() => [
      Text('📚 Cards').setColor('#ffffff').setTextSize(16),
      Spacer(8),
      Stack(cards.length, (index) =>
        VStack(() => [Text(cards[index].title).setColor('#2c3e50').setTextSize(16), Spacer(4), Text(cards[index].subtitle).setColor('#7f8c8d').setTextSize(12)])
          .setBackgroundColor('#ffffff')
          .setPadding(12),
      ),
      Spacer(8),
      Text('Swipe to browse').setColor('#adb5bd').setTextSize(11),
    ]),
  )
    .setBackgroundColor('#34495e')
    .setPadding(12);
  for (const id of ids) updateWidget(provider, root, id);
}

// 8. Complex combined layout
function dashboardWidget(provider: string, ids: number[]) {
  const tasks = [
    { name: 'Review PR #142', done: true },
    { name: 'Update documentation', done: true },
    { name: 'Fix login bug', done: false },
    { name: 'Deploy to staging', done: false },
    { name: 'Team standup', done: false },
  ];
  const completed = tasks.filter((t) => t.done).length;
  const progress = Math.round((completed / tasks.length) * 100);

  const root = Root(() =>
    VStack(() => [
      // Header row
      HStack(() => [Text('📊 Dashboard').setColor('#1a1a2e').setTextSize(18), Spacer(), Clock({ color: '#6c757d' }).setTextSize(14)]),

      Spacer(12),

      // Progress section
      Text('Sprint Progress').setColor('#495057').setTextSize(12),
      Spacer(4),
      HStack(() => [ProgressBar({ progress, max: 100, flex: true }), Spacer(8), Text(`${progress}%`).setColor('#27ae60').setTextSize(14)]),

      Spacer(16),

      // Tasks section
      HStack(() => [Text('Tasks').setColor('#495057').setTextSize(12), Spacer(), Text(`${completed}/${tasks.length}`).setColor('#6c757d').setTextSize(11)]),
      Spacer(4),
      List(tasks.length, (i) =>
        HStack(() => [
          CheckBox(tasks[i].done).onCheck('toggleTask', { name: tasks[i].name }),
          Spacer(8),
          Text(tasks[i].name)
            .setColor(tasks[i].done ? '#27ae60' : '#212529')
            .setTextSize(13),
        ]),
      ),
    ]),
  )
    .setBackgroundColor('#ffffff')
    .setPadding(16);
  for (const id of ids) updateWidget(provider, root, id);
}

registerWidgetListener('org.nativescript.plugindemo.PluginDemoWidgetProvider', {
  onClick(event) {
    console.log('Widget clicked', event);
  },
  onCheck(event) {
    console.log('Check toggled', event);
  },
  onUpdate: (event) => {
    dashboardWidget(event.provider, event.appWidgetIds);
    //countdownWidget(event.provider, event.appWidgetIds);
    // clockWidget(event.provider, event.appWidgetIds);
    // progressWidget(event.provider, event.appWidgetIds);
    // listWidget(event.provider, event.appWidgetIds);
    // slideshowWidget(event.provider, event.appWidgetIds);
    //gridWidget(event.provider, event.appWidgetIds);
    //stackWidget(event.provider, event.appWidgetIds);
    //toggleWidget(event.provider, event.appWidgetIds);
    // checklistWidget(event.provider, event.appWidgetIds);
    // radioWidget(event.provider, event.appWidgetIds);
    /* const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const list = List(
      data.length,
      (index) =>
        VStack(() =>
          HStack(() => {
            const img = Image('').setSize(20, 20) as ImageView;
            const ret = [img, Text(`Item ${index}`), Button('Click', () => console.log(`Clicked item ${index}`))];
            rows.push({ row: ret as never, src: `https://picsum.photos/seed/${data[index]}/300/300` });
            return ret;
          }),
        ),
      () => Text('No content'),
    ).setBackgroundColor('white');

    const root = Root(() => list)
      .setBackgroundColor('lightgray')
      .setPadding(20);

    rootView = root;
    for (const id of event.appWidgetIds) {
      updateWidget(event.provider, root, id);
    }
    */
  },
  async onUpdateAsync(event) {
    //  slideshowWidget(event.provider, event.appWidgetIds, true);
  },
});

Application.run({ moduleName: 'app-root' });
