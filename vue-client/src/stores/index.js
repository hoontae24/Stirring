import viewerStore from './viewer';

export default ({ app }) => {
  app.provide('viewerStore', viewerStore);
};
