import { ActionIcon, Group, Paper, Badge, Box } from "@mantine/core";
import { IconHistory, IconHome, IconShoppingCart } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store";

export const MobileNavigation = () => {
  const navigate = useNavigate();
  const selectedTableId = useCartStore((s) => s.selectedTableId);
  const items = useCartStore((s) => s.items);

  const totalQuantity = items
    .filter((i) => i.tableId === selectedTableId)
    .reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Paper
      shadow="md"
      radius={0}
      withBorder
      style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 5 }}
    >
      <Group justify="space-around">
        <ActionIcon
          p="20px 10px"
          w="30%"
          variant="subtle"
          size="lg"
          color="red"
          onClick={() => navigate("/" + selectedTableId)}
        >
          <IconHome size={24} />
        </ActionIcon>

        <Box style={{ position: "relative", width: "30%" }}>
          <ActionIcon
            p="20px 10px"
            w="100%"
            variant="subtle"
            size="lg"
            color="red"
            onClick={() => navigate("/basket")}
          >
            <IconShoppingCart size={24} />
          </ActionIcon>

          {totalQuantity > 0 && (
            <Badge
              size="sm"
              variant="filled"
              color="red"
              px={6} // горизонтальные отступы
              style={{
                position: "absolute",
                top: 4,
                right: 10,
                minWidth: 20, // минимальная ширина
                height: 20, // фиксированная высота
                borderRadius: "999px", // всегда скруглённый (круг/овал)
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
              }}
            >
              {totalQuantity}
            </Badge>
          )}
        </Box>
        <ActionIcon
          p="20px 10px"
          w="30%"
          variant="subtle"
          size="lg"
          color="red"
          onClick={() => navigate("/history")}
        >
          <IconHistory size={24} />
        </ActionIcon>
      </Group>
    </Paper>
  );
};
