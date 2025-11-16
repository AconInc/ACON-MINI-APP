import { useOverlay } from '@apps-in-toss/framework';

import { ConfirmRatingDialog } from '../components/ratingConfirmDialog';

export function useConfirmRatingDialog() {
  const overlay = useOverlay();

  const open = () => {
    return new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close, exit }) => (
        <ConfirmRatingDialog
          open={isOpen}
          onConfirm={() => {
            resolve(true);
            close();
          }}
          onCancel={() => {
            resolve(false);
            close();
          }}
          onExited={exit}
        />
      ));
    });
  };

  return { open };
}
