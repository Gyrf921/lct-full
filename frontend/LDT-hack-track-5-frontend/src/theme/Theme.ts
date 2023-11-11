import {
  ActionIcon,
  Autocomplete,
  Button,
  Modal,
  TextInput,
  createTheme,
} from '@mantine/core';
import textInput from './TextInput.module.css';
import button from './Button.module.css';
import actionIcon from './ActionIcon.module.css';
import modal from './Modal.module.css';

export const theme = createTheme({
  primaryColor: 'indigo',
  fontFamily: 'Liberation',
  fontSizes: {
    md: '18px',
  },
  headings: {
    fontWeight: '400',
  },
  components: {
    Button: Button.extend({
      defaultProps: { fw: '400', fz: 'md', radius: 'xl' },
      classNames: button,
    }),
    TextInput: TextInput.extend({ classNames: textInput }),
    Autocomplete: Autocomplete.extend({ classNames: textInput }),
    ActionIcon: ActionIcon.extend({ classNames: actionIcon }),
    Modal: Modal.extend({ defaultProps: { radius: 'lg' }, classNames: modal }),
  },
});
