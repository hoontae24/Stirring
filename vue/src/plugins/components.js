import VueLink from '@/components/_globals/VueLink';
import VueInput from '@/components/_globals/VueInput';

const parts = [VueLink, VueInput];

export default ({ Vue, vueOptions }) => {
  parts.forEach(part => Vue.component(part.name, part));
};
