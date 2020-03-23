import VueLink from '@/components/parts/VueLink';

const parts = [VueLink];

export default ({ Vue }) => {
  parts.forEach(part => Vue.component(part.name, part));
};
