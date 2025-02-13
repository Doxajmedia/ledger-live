import React from "react";
import { Icons } from "@ledgerhq/native-ui";
import { Buffer } from "buffer";
import { useNavigation } from "@react-navigation/native";
import { NavigatorName, ScreenName } from "../../../../const";
import SettingsRow from "../../../../components/SettingsRow";

type Props = {
  title: string;
  dataStr: Parameters<typeof Buffer.from>[0];
};
export default function ImportBridgeStreamData({ title, dataStr }: Props) {
  const navigation = useNavigation();
  return (
    <SettingsRow
      title={title}
      desc={dataStr ? "Import string detected" : "No import string detected"}
      iconLeft={<Icons.ImportMedium size={24} color="black" />}
      onPress={() => {
        if (!dataStr) return;

        const data = JSON.parse(
          Buffer.from(dataStr, "base64").toString("utf8"),
        );

        navigation.navigate(NavigatorName.ImportAccounts, {
          screen: ScreenName.ScanAccounts,
          params: {
            data,
          },
        });
      }}
    />
  );
}
