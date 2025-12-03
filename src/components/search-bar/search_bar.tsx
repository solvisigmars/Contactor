import React from "react";
import { TextInput } from "react-native";
import styles from "./styles";

type Props = {
  search: string;
  setSearch: (text: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <TextInput
      placeholder="Search..."
      value={search}
      onChangeText={setSearch}
      style={styles.search}
      placeholderTextColor="#888"
    />
  );
}
