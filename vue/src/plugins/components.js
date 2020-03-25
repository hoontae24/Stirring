import VueLink from '@/components/_globals/VueLink';

const parts = [VueLink];

export default ({ Vue }) => {
  parts.forEach(part => Vue.component(part.name, part));
};
