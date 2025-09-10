// components/Search.tsx
import { Input, Stack, ScrollArea, Button, Flex } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

type SearchProps = {
  categories: { label: string; value: string }[];
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
};

export const Search = ({
  categories,
  onSearchChange,
  onCategoryChange,
}: SearchProps) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]?.value || "");

  return (
    <Stack gap="md">
      {/* Search input */}
      <Input
        radius="md"
        styles={{ input: { padding: "10px 16px 10px 32px " } }}
        placeholder="Search food by name"
        leftSection={<IconSearch size={18} />}
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value);
          onSearchChange?.(e.currentTarget.value);
        }}
      />

      {/* Scrollable categories */}
      <ScrollArea type="auto" scrollbarSize={6}>
        <Flex gap="sm" wrap="nowrap">
          {categories.map((c) => (
            <Button
              key={c.value}
              radius="xl"
              miw="max-content"
              variant={category === c.value ? "filled" : "light"}
              color={category === c.value ? "red" : "gray"}
              onClick={() => {
                setCategory(c.value);
                onCategoryChange?.(c.value);
              }}
            >
              {c.label}
            </Button>
          ))}
        </Flex>
      </ScrollArea>
    </Stack>
  );
};
