export function config ($logProvider, toastrConfig, uiGmapGoogleMapApiProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;

  // uiGmapGoogleMapApiProvider.configure({
  //   key: 'AIzaSyAgLTVCMB8hXpBR4yTo7MgGkifmnggiJA0',
  //   v: '3', //defaults to latest 3.X anyhow
  //   libraries: ''
  // });

}
