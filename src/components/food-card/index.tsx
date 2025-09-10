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
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          minHeight: 115,
          width: "100%",
          cursor: "pointer",
        }}
        onClick={() => setOpened(true)}
      >
        {/* Image */}
        <Box
          style={{
            flex: "0 0 96px",
            height: 115,
            overflow: "hidden",
            borderRadius: 8,
            flexShrink: 0,
          }}
        >
          <Image
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Right: Details */}
        <Flex
          direction="column"
          style={{ flex: 1, minWidth: 120, maxWidth: "calc(100% - 110px)" }}
          gap={4}
        >
          <Text
            size="16px"
            fw={700}
            c="#1F2937"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </Text>
          <Text
            size="12px"
            c="#6B7280"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Text>

          <Group justify="space-between" mt="auto" align="center" wrap="wrap">
            <Text
              size="16px"
              fw="bold"
              ff="monospace"
              c="#DC143C"
              style={{ flexShrink: 0 }}
            >
              {price}
            </Text>

            <Button
              bdrs="8px"
              color="#DC143C"
              style={{ minWidth: 70 }}
              onClick={(e) => {
                e.stopPropagation();
                onAdd && onAdd();
              }}
            >
              {t("add")}
            </Button>
          </Group>
        </Flex>
      </Card>
    </>
  );
};
