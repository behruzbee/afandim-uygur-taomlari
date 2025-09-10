import {
  Card,
  Image,
  Text,
  Group,
  Button,
  Flex,
  Modal,
  Box,
} from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type FoodCardProps = {
  image: string;
  title: string;
  description: string;
  price: string;
  time: string;
  onAdd?: () => void;
};

export const FoodCard = ({
  image,
  title,
  description,
  price,
  onAdd,
}: FoodCardProps) => {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        size="lg"
        radius="md"
        withCloseButton={false}
      >
        <Image src={image} alt={title} radius="md" fit="contain" />
        <Text mt="sm" fw={700} size="lg">
          {title}
        </Text>
        <Text c="dimmed" size="sm">
          {description}
        </Text>
      </Modal>

      <Card
        p="0px"
        shadow="sm"
        radius="lg"
        withBorder
        style={{ display: "flex", alignItems: "center", gap: 16 }}
        onClick={() => setOpened(true)}
      >
        <Flex h="115px" w="100%" justify="space-between">
          <Box h="115px" w="96px">
            <Image
              src={image}
              alt={title}
              h="100%"
              fit="cover"
              style={{ cursor: "pointer" }}
            />
          </Box>

          {/* Right: Details */}
          <Flex p="16px" direction="column" style={{ flex: 1 }} gap={4}>
            <Text size="16px" lh="24px" fw={700} c="#1F2937">
              {title}
            </Text>
            <Text size="12px" c="#6B7280">
              {description}
            </Text>

            <Group justify="space-between" mt="15px" align="center">
              <Text size="16px" fw="bold" ff="monospace" c="#DC143C">
                {price}
              </Text>

              <Button
                bdrs="8px"
                color="#DC143C"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd && onAdd();
                }}
                style={{ minWidth: 70 }}
              >
                {t("add")}
              </Button>
            </Group>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};
