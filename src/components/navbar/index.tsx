import { AppShell, Flex, Image, Text, ThemeIcon } from "@mantine/core";
import { IconMapPinFilled } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <AppShell.Header w="100%">
      <Flex justify="space-between" align="center" p="18px">
        <Flex justify="center" align="center">
          <ThemeIcon bg="none">
            <IconMapPinFilled color="#DC143C" />
          </ThemeIcon>
          <Flex ml="12px" direction="column">
            <Text fw="600" size="18px" c="#1F2937">
              {t("restaurantName")}
            </Text>
            <Text mt="5px" size="14px" c="#6B7280">
              {t("restaurantAddress")}
            </Text>
          </Flex>
        </Flex>
        <Flex w="55px" h="55px" styles={{ root: { borderRadius: "100%" } }}>
          <Image
            src="/logo.jpg"
            styles={{ root: { borderRadius: "100%" } }}
          />
        </Flex>
      </Flex>
    </AppShell.Header>
  );
};
