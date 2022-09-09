import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './handler';

/**
 * Initialization data for the wooty_woot extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'wooty_woot:plugin',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension wooty_woot is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('wooty_woot settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for wooty_woot.', reason);
        });
    }

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The wooty_woot server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
