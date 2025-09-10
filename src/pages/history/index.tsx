import {
  Container,
  Stack,
  Card,
  Text,
  Flex,
  Group,
  AppShell,
} from "@mantine/core";
import { useCartStore } from "../../store";
import { useTranslation } from "react-i18next";
import { Navbar } from "../../components/navbar";
import { MobileNavigation } from "../../components/mobile-navigation";

export const HistoryPage = () => {
  const { history } = useCartStore();
  const { i18n, t } = useTranslation();

  const HOURS_RECENT = 12;

  if (!history || history.length === 0) {
    return (
      <Container mt="100px">
        <AppShell>
          <Navbar />
        </AppShell>
        <Text size="20px" ta="center" c="dimmed">
          {t("history_empty") || "История заказов пуста"}
        </Text>
        <MobileNavigation />
      </Container>
    );
  }

  return (
    <>
      <AppShell>
        <Navbar />
      </AppShell>

      <Container mt="100px">
        <Text size="24px" fw={700} mb="md">
          {t("order_history") || "История заказов"}
        </Text>

        <Stack>
          {history.map((order) => {
            const orderTime = order.timestamp;
            const isRecent =
              Date.now() - orderTime < HOURS_RECENT * 60 * 60 * 1000;

            const bgColor = isRecent ? "#E6FFFA" : "#F5F5F5";

            const totalPrice = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <Card
                key={orderTime}
                shadow="sm"
                radius="md"
                withBorder
                style={{ backgroundColor: bgColor }}
              >
                <Stack>
                  {order.items.map((item) => (
                    <Flex key={item.id} justify="space-between" align="center">
                      <Text>
                        {item.title[i18n.language as keyof typeof item.title] ||
                          item.title.en}{" "}
                        x {item.quantity}
                      </Text>
                      <Text>${(item.price * item.quantity).toFixed(2)}</Text>
                    </Flex>
                  ))}
                </Stack>
                <Group mt="sm">
                  <Text fw={700}>
                    {t("total") || "Итого"}: ${totalPrice.toFixed(2)}
                  </Text>
                </Group>
              </Card>
            );
          })}
        </Stack>
      </Container>

      <MobileNavigation />
    </>
  );
};
