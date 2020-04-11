import VueLink from '@/components/_globals/VueLink';
import VueInput from '@/components/_globals/VueInput';
import VueButton from '@/components/_globals/VueButton';
import VueDivider from '@/components/_globals/VueDivider';

const parts = [VueLink, VueInput, VueButton, VueDivider];

export default ({ app }) => {
  parts.forEach(part => app.component(part.name, part));
};
