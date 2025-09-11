import {
  AppShell,
  Container,
  Stack,
  Text,
  Modal,
  Flex,
  Button,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCartStore } from "../../store";
import { Navbar } from "../../components/navbar";
import { Search } from "../../components/search";
import { FoodCard } from "../../components/food-card";
import { MobileNavigation } from "../../components/mobile-navigation";
import { FOODS } from "../../constants/foods";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
  const { id: tableId } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();

  const lang = i18n.language as "ru" | "uz" | "en" | "zh";

  const addItem = useCartStore((s) => s.addItem);
  const selectedTableId = useCartStore((s) => s.selectedTableId);
  const setTableId = useCartStore((s) => s.setTableId);

  // 🔥 State для модалки выбора языка
  const [languageModalOpen, setLanguageModalOpen] = useState(false);

  useEffect(() => {
    if (tableId && tableId !== selectedTableId) {
      setTableId(tableId);
    }
  }, [tableId, selectedTableId, setTableId]);

  useEffect(() => {
    const savedLang = sessionStorage.getItem("lang");
    if (!savedLang) {
      setLanguageModalOpen(true);
    } else {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const selectLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    sessionStorage.setItem("lang", lang);
    setLanguageModalOpen(false);
  };

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filteredFoods = FOODS.filter((food) => {
    const matchesCategory = category === "all" || food.category === category;
    const matchesQuery = food.title[lang]
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  if (!tableId) {
    return <h1>{t("selectTable")}</h1>;
  }

  return (
    <>
      {/* 🔥 Модалка выбора языка */}
      <Modal
        opened={languageModalOpen}
        onClose={() => {}}
        withCloseButton={false}
        closeOnEscape={false}
        closeOnClickOutside={false}
        centered
        radius="lg"
        overlayProps={{
          backgroundOpacity: 0.6,
          blur: 8,
        }}
      >
        <Text ta="center" fw={700} size="20px" mb="lg">
          {t("selectLanguage")}
        </Text>

        <Flex justify="center" gap="lg" wrap="wrap">
          <Button
            onClick={() => selectLanguage("ru")}
            radius="50%"
            w={80}
            h={80}
            variant="light"
            color="red"
          >
            <Text size="50px">🇷🇺</Text>
          </Button>
          <Button
            onClick={() => selectLanguage("en")}
            radius="50%"
            w={80}
            h={80}
            variant="light"
            color="blue"
          >
            <Text size="50px">🇬🇧</Text>
          </Button>
          <Button
            onClick={() => selectLanguage("uz")}
            radius="50%"
            w={80}
            h={80}
            variant="light"
            color="green"
          >
            <Text size="50px">🇺🇿</Text>
          </Button>
          <Button
            onClick={() => selectLanguage("zh")}
            radius="50%"
            w={80}
            h={80}
            variant="light"
            color="yellow"
          >
            <Text size="50px">🇨🇳</Text>
          </Button>
        </Flex>
      </Modal>

      <AppShell>
        <Navbar />
      </AppShell>

      <Container mt="100px" mb="100px">
        <Text size="20px" fw={600} mb="md">
          {t("table")}: {tableId}
        </Text>

        <Search
          categories={[
            { label: t("all"), value: "all" },
            { label: t("lagman"), value: "lagman" },
            { label: t("hot_dishes"), value: "hot_dishes" },
            { label: t("seafood"), value: "seafood" },
            { label: t("shashlik"), value: "shashlik" },
            { label: t("salad"), value: "salad" },
            { label: t("soups"), value: "soups" },
            { label: t("drinks"), value: "drinks" },
          ]}
          onSearchChange={(q) => setQuery(q)}
          onCategoryChange={(c) => setCategory(c)}
        />

        <Text mt="22px" size="18px" fw="600" c="#1F2937">
          {t("popularDishes")}
        </Text>

        <Stack mt="md" gap="md">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                image={food.image}
                title={food.title[lang]}
                description={food.description[lang]}
                price={`${food.price.toLocaleString()} ${t("currency")}`}
                time={food.time}
                onAdd={() =>
                  addItem({
                    id: food.id,
                    title: food.title,
                    price: food.price,
                    image: food.image,
                  })
                }
              />
            ))
          ) : (
            <Text c="dimmed" ta="center" mt="lg">
              {t("nothingFound")}
            </Text>
          )}
        </Stack>
      </Container>

      <MobileNavigation />
    </>
  );
};
