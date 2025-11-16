import React, { useState } from 'react';
import { View } from 'react-native';
import { ConfirmDialog, Rating } from '@toss/tds-react-native';

interface ConfirmRatingDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onExited: () => void;
}

export function ConfirmRatingDialog({ open, onConfirm, onCancel, onExited }: ConfirmRatingDialogProps) {
  const [value, setValue] = useState(5);

  return (
    <ConfirmDialog
      open={open}
      title="추천 받은 장소는 어떠신가요?"
      content={
        <View style={{ alignItems: 'center' }}>
          <Rating readonly={false} value={value} max={5} size="large" onValueChange={setValue} />
        </View>
      }
      leftButton={
        <ConfirmDialog.Button style="weak" type="dark" onPress={onCancel}>
          닫기
        </ConfirmDialog.Button>
      }
      rightButton={
        <ConfirmDialog.Button type="primary" onPress={onConfirm}>
          제출
        </ConfirmDialog.Button>
      }
      onClose={onCancel}
      onExited={onExited}
    />
  );
}
