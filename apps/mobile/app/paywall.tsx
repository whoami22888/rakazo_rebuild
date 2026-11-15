import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  Alert,
  AppState,
  BackHandler,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccountDeletion } from "../components/account-deletion";
import { BotAvatar } from "../components/bot-avatar";
import { GlassIconButton } from "../components/glass-icon-button";
import { NativeActionButton } from "../components/native-action-button";
import { NativeSegmentedControl } from "../components/native-segmented-control";
import { NativeSymbol } from "../components/native-symbol";
import { useOrganizationMenuAction } from "../components/organization-menu";
import { FORM_COLUMN_WIDTH } from "../lib/adaptive-layout";
import { rpc } from "../lib/api";
import { signOut } from "../lib/api-auth";
import { replaceWithSignIn } from "../lib/auth-routing";
import type { Plan } from "../lib/billing";
import {
  currentPlan,
  openBillingPage,
  ownKeyOffer,
  planEndsAt,
  purchaseCompleted,
  setPaywallShown,
  subscribedPlan,
} from "../lib/billing";
import { endCallBeforeSessionEnd } from "../lib/call-session";
import { translucentColor } from "../lib/color";
import { useContentBottomInset } from "../lib/content-bottom-inset";
import { dateLocaleForUi } from "../lib/i18n";
import { useMobileTokens } from "../lib/native";
import {
  activeOrganization,
  organizationSwitchActions,
  useOrganizations,
} from "../lib/organizations";
import { confirmUnsentSendLoss } from "../lib/unsent-send-warning";
import { errorText } from "../lib/user-error";

type Amount = (typeof MODEL_CREDIT_AMOUNTS)[number];
type SymbolName = ComponentProps<typeof NativeSymbol>["android"];

const TERMS_URL = "https://rakazo.com/terms/";

// Bots carry the app's only colour, so the paywall's colour is a small crew of them.
const CREW = [
  { color: botColors[4], shape: 1, size: 40 },
  { color: botColors[0], shape: 3, size: 52 },
  { color: botColors[1], shape: 0, size: 64 },
  { color: botColors[3], shape: 2, size: 52 },
  { color: botColors[6], shape: 4, size: 40 },
];

/** Paywall removed: if this route is opened, return to the app immediately. */
export default function Paywall() {
  const router = useRouter();
  useEffect(() => {
    if (router.canDismiss()) router.dismiss();
    else if (router.canGoBack()) router.back();
    else router.replace("/");
  }, [router]);
  return <View />;
}
