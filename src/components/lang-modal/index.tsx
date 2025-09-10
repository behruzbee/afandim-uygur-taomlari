import { Modal, Grid, Card, Text, Image } from "@mantine/core";

type LanguageModalProps = {
  opened: boolean;
  onSelect: (lang: string) => void;
};

const LANGUAGES = [
  { code: "ru", label: "Русский", flag: "https://flagcdn.com/w40/ru.png" },
  { code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "uz", label: "O‘zbek", flag: "https://flagcdn.com/w40/uz.png" },
  { code: "zh", label: "中文", flag: "https://flagcdn.com/w40/cn.png" },
];

export const LanguageModal = ({ opened, onSelect }: LanguageModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={() => {}}
      withCloseButton={false}
      closeOnEscape={false}
      closeOnClickOutside={false}
      centered
      size="lg"
      radius="lg"
      title="🌍 Выберите язык"
    >
      <Grid gutter="md">
        {LANGUAGES.map((lang) => (
          <Grid.Col span={6} key={lang.code}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ cursor: "pointer", textAlign: "center" }}
              onClick={() => onSelect(lang.code)}
            >
              <Image src={lang.flag} alt={lang.label} width={40} height={30} fit="contain" mx="auto" />
              <Text mt="sm" fw={600}>
                {lang.label}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Modal>
  );
};
