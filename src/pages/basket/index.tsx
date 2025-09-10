import {
  AppShell,
  Container,
  Stack,
  Text,
  Card,
  Image,
  Group,
  Button,
  Flex,
  Box,
  Modal,
} from "@mantine/core";
import { Navbar } from "../../components/navbar";
import { MobileNavigation } from "../../components/mobile-navigation";
import { useCartStore } from "../../store";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BOT_TOKEN = import.meta.env.VITE_APP_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_APP_CHAT_ID;

export const BasketPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    selectedTableId,
  } = useCartStore();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const [openedId, setOpenedId] = useState<number | null>(null);
  const [scanMode, setScanMode] = useState(false);
  const [scanned, setScanned] = useState(false);

  const sendTelegramMessage = async (message: string) => {
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      });
    } catch (err) {
      console.error("Ошибка отправки в Telegram:", err);
    }
  };

  const handleScan = (result: string | null) => {
    if (!result || scanned) return;

    try {
      const url = new URL(result);
      const scannedId = url.pathname.split("/").pop();

      if (scannedId === selectedTableId) {
        const orderText = items
          .map(
            (i) =>
              `🍽 <b>${i.title}</b> — ${i.quantity} x $${i.price.toFixed(2)}`
          )
          .join("\n");

        const message = `
✅ Новый заказ!
Стол: ${selectedTableId}
Сумма: $${total.toFixed(2)}

${orderText}
        `;

        sendTelegramMessage(message);

        alert(
          `✅ Заказ для стола ${selectedTableId} подтвержден на сумму $${total.toFixed(
            2
          )}!`
        );
        clearCart();
        setScanMode(false);
        navigate("/" + selectedTableId);
      } else {
        alert("❌ QR-код не совпадает с выбранным столом!");
      }

      setScanned(true);
      setTimeout(() => setScanned(false), 2000);
    } catch {
      alert("Некорректный QR-код!");
    }
  };

  return (
    <>
      <AppShell>
        <Navbar />
      </AppShell>

      <Container mt="100px">
        <Text size="24px" fw={700} mb="md">
          {t("basket")}
        </Text>

        {scanMode ? (
          <Flex
            mt="50px"
            direction="column"
            style={{ width: "100%", height: "400px", position: "relative" }}
          >
            <Text
              size="16px"
              fw={600}
              ta="center"
              style={{
                position: "absolute",
                top: -40,
                left: 0,
                right: 0,
                color: "#1F2937",
              }}
            >
              {t("scan_instruction")}
            </Text>

            <Scanner
              onScan={(results) => {
                if (results.length > 0) {
                  handleScan(results[0].rawValue);
                }
              }}
              onError={(err) => console.error(err)}
              styles={{ container: { width: "100%", height: "100%" } }}
            />

            <Button
              fullWidth
              mt="md"
              color="red"
              onClick={() => setScanMode(false)}
            >
              {t("cancel")}
            </Button>
          </Flex>
        ) : items.length === 0 ? (
          <Text c="dimmed" ta="center">
            {t("basket_empty")}
          </Text>
        ) : (
          <Stack>
            {items.map((item) => (
              <div key={item.id}>
                <Modal
                  opened={openedId === item.id}
                  onClose={() => setOpenedId(null)}
                  centered
                  size="lg"
                  radius="md"
                  withCloseButton={false}
                >
                  <Image
                    src={item.image}
                    alt={
                      item.title[i18n.language as keyof typeof item.title] ??
                      item.title.en
                    }
                    radius="md"
                    fit="contain"
                  />
                  <Text size="16px" lh="24px" fw={700} c="#1F2937">
                    {item.title[i18n.language as keyof typeof item.title] ??
                      item.title.en}
                  </Text>
                </Modal>

                <Card
                  p="0px"
                  shadow="sm"
                  radius="lg"
                  withBorder
                  style={{ display: "flex", alignItems: "center", gap: 16 }}
                  onClick={() => setOpenedId(item.id)}
                >
                  <Flex h="115px" w="100%" justify="space-between">
                    <Box h="115px" w="96px">
                      <Image
                        src={item.image}
                        alt={
                          item.title[
                            i18n.language as keyof typeof item.title
                          ] ?? item.title.en
                        }
                        h="100%"
                        fit="cover"
                        style={{ cursor: "pointer" }}
                      />
                    </Box>

                    <Flex
                      p="16px"
                      direction="column"
                      style={{ flex: 1 }}
                      gap={4}
                    >
                      <Text mt="sm" fw={700} size="lg">
                        {item.title[i18n.language as keyof typeof item.title] ??
                          item.title.en}
                      </Text>

                      <Group justify="space-between" mt="5px" align="center">
                        <Text size="16px" fw="bold" ff="monospace" c="#DC143C">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </Text>

                        <Group>
                          <Button
                            size="xs"
                            bg="#DC143C"
                            onClick={(e) => {
                              e.stopPropagation();
                              decreaseQuantity(item.id);
                            }}
                          >
                            -
                          </Button>
                          <Button
                            size="xs"
                            bg="#DC143C"
                            onClick={(e) => {
                              e.stopPropagation();
                              increaseQuantity(item.id);
                            }}
                          >
                            +
                          </Button>
                          <Button
                            size="xs"
                            color="red"
                            variant="light"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(item.id);
                            }}
                          >
                            {t("remove")}
                          </Button>
                        </Group>
                      </Group>
                    </Flex>
                  </Flex>
                </Card>
              </div>
            ))}

            <Flex justify="space-between" align="center" mt="lg">
              <Text size="18px" fw={700}>
                {t("total")}: ${total.toFixed(2)}
              </Text>
              <Button color="green" onClick={() => setScanMode(true)}>
                {t("checkout")}
              </Button>
            </Flex>
          </Stack>
        )}
      </Container>

      <MobileNavigation />
    </>
  );
};
