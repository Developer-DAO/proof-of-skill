import type { NextPage } from "next"
import dynamic from 'next/dynamic';
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "react-i18next"
import { Box, Text } from '@chakra-ui/react';

const CeramicComponent = dynamic (
  () => import('../components/CeramicComponent'),
  {ssr: false}
);

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Text>{t("title")}</Text>
      <CeramicComponent/>  
    </Box>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
})

export default Home
