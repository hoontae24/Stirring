import VueLink from '@/components/_globals/VueLink';
import VueInput from '@/components/_globals/VueInput';
import VueButton from '@/components/_globals/VueButton';

const parts = [VueLink, VueInput, VueButton];

export default ({ Vue, vueOptions }) => {
  parts.forEach(part => Vue.component(part.name, part));
};
