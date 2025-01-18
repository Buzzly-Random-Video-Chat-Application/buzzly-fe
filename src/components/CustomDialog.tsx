import React from 'react';
import { Dialog, DialogContent, Box, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  actions?: React.ReactNode;
}

const CustomDialog: React.FC<DialogProps> = ({ open, onClose, children, maxWidth = 'xs', actions }) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          overflowY: 'hidden',
        },
      }}
    >
      <DialogContent sx={{ p: 4, overflowY: 'auto' }}>{children}</DialogContent>
      {actions && <Box sx={{ p: 2 }}>{actions}</Box>}
    </Dialog>
  );
};

export default CustomDialog;
