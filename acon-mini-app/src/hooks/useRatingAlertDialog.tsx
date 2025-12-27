import { useOverlay } from '@apps-in-toss/framework';

import { ConfirmRatingDialog } from '../components/ratingConfirmDialog';

export function useConfirmRatingDialog() {
  const overlay = useOverlay();

  const open = () => {
    return new Promise<number | null>((resolve) => {
      overlay.open(({ isOpen, close, exit }) => (
        <ConfirmRatingDialog
          open={isOpen}
          onConfirm={(value) => {
            resolve(value);
            close();
          }}
          onCancel={() => {
            resolve(null);
            close();
          }}
          onExited={exit}
        />
      ));
    });
  };

  return { open };
}
