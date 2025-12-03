import { router } from 'expo-router';
import React from 'react';
import { Button } from 'react-native';

type Props = {
  filename: string; 
};

export default function EditContactButton({ filename }: Props) {
  return (
    <Button
      title="Edit"
      onPress={() => router.push(`/contact/${filename}/edit`)}
    />
  );
}
