import { router } from 'expo-router';
import React from 'react';
import { Button } from 'react-native';

type Props = {
  filename: string; // example: "Anna-81b2b1.json"
};

export default function EditContactButton({ filename }: Props) {
  return (
    <Button
      title="Edit"
      onPress={() => router.push(`/contact/${filename}/edit`)}
    />
  );
}
